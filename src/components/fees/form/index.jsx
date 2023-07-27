import 'styles/user-form.scss';
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from 'components/common/header';
import Loading from 'components/common/loading';
import SideNav from 'components/common/sideNav';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import FeeallocationForm from 'components/fees/form/form-allocation';
import FeecollectionForm from 'components/fees/form/form-collection';

import {subDirectory} from '../../../config.json'

export default class FeesForm extends Component {
  state = {
    cType: "", cId: "",
    user: {},
    parentData: [],
    prefixUrl: "",
    isPageLoading: true,
    isLoading: true,
    clientid: '',
    entityid: '',

  }

  async componentDidMount() {

    await this.init(this.props, true)
  }

  async componentWillReceiveProps(props) {
    await this.init(props, false)
  }

  async init(props, isPageLoading = false) {
    const { uid, formType, clientid, entityid } = props.match.params

    let user = {}
    if (uid !== "new") {
      if (user.email === undefined) {
        user = this.state.user
      } else {
        user = this.state.user
      }
    }
    this.setState({ user: user, uid, clientid, entityid, formType, isPageLoading: false, isLoading: false })
  }

  renderFeesForm(actiontype, feesform) {

    switch (feesform) {
      case 'feeallocation':
        return <FeeallocationForm formType={feesform} actiontype={actiontype} props={this.props} />
      case 'feecollection':
        return <FeecollectionForm formType={feesform} actiontype={actiontype} props={this.props} />


      default:
        return <FeeallocationForm formType={feesform} actiontype={actiontype} props={this.props} />
    }
  }

  render() {
    const { isPageLoading, isLoading } = this.state;

    const { actiontype, feesform } = this.props.match.params;
    const { session } = this.props;
    return (

      <div className="">
        {isPageLoading && <Loading />}
        {!isPageLoading && !isLoading &&
          <Fragment>
            <Breadcrumb>
              <BreadcrumbItem><NavLink to={`${subDirectory}/dashboard`}>Dashboard</NavLink></BreadcrumbItem>
              <BreadcrumbItem><NavLink to={`${subDirectory}/fees/feeallocation`}>Fees</NavLink></BreadcrumbItem>
              <BreadcrumbItem active>{actiontype}</BreadcrumbItem>
              <BreadcrumbItem active>{feesform}</BreadcrumbItem>
            </Breadcrumb>
            <Container fluid>

              {this.renderFeesForm(actiontype, feesform)}
            </Container>
          </Fragment>
        }
      </div>

    );
  }
}




import 'styles/user-form.scss';
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Container } from 'reactstrap';

import Header from 'components/common/header';
import Loading from 'components/common/loading';
import SideNav from 'components/common/sideNav';
import ClassForm from 'components/timetable/form/form-class';

import {subDirectory} from '../../../config.json'

export default class Timetable extends Component {
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

    await this.init(this.props, true);

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



  renderUserForm(actiontype, scheduleform) {

    switch (scheduleform) {
      case 'exam':
        return <ClassForm formType={scheduleform} actiontype={actiontype} props={this.props} />

      default:
        return <ClassForm formType={scheduleform} actiontype={actiontype} props={this.props} />
    }
  }

  render() {
    const { isPageLoading, isLoading } = this.state;
    const { action, form, } = this.props.match.params
    const { session } = this.props
    return (

      <div className="">
        {isPageLoading && <Loading />}
        {!isPageLoading && !isLoading &&
          <Fragment>
            <Container fluid>
              <Breadcrumb>
                <BreadcrumbItem><NavLink to={`${subDirectory}/dashboard`}>Dashboard</NavLink></BreadcrumbItem>
                <BreadcrumbItem><NavLink to={`${subDirectory}/timetable/exam`}>TimeTable</NavLink> </BreadcrumbItem>
                <BreadcrumbItem active>  Class</BreadcrumbItem>
              </Breadcrumb>
              {this.renderUserForm(action, form)}
            </Container>
          </Fragment>
        }
      </div>

    );
  }
}




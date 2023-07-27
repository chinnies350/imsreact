import 'styles/user-form.scss';
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Breadcrumb, BreadcrumbItem, } from 'reactstrap';
import Header from 'components/common/header';
import Loading from 'components/common/loading';
import SideNav from 'components/common/sideNav';

import AddStaffAllocation from 'components/staffallocation/form/staffallocationform'

import {subDirectory} from '../../../config.json'

export default class StaffAllocationForm extends Component {
  state = {
    isPageLoading: false,
    isLoading: false,
  }

  async componentDidMount() {
    await this.init(this.props, true)
  }

  async componentWillReceiveProps(props) {
    await this.init(props, false)
  }

  async init(props, isPageLoading = false) {
  }

  renderUserForm(actiontype) {
    return <AddStaffAllocation actiontype={actiontype} props={this.props} />
  }

  render() {
    const { isPageLoading, isLoading } = this.state;
    const { session } = this.props;
    const { actiontype } = this.props.match.params

    return (

      <div className="">
        {isPageLoading && <Loading />}
        {!isPageLoading && !isLoading &&
          <Fragment>
            <Container fluid>
              <Breadcrumb>
                <BreadcrumbItem><NavLink to={`${subDirectory}/dashboard`}>Dashboard</NavLink></BreadcrumbItem>
                <BreadcrumbItem><NavLink to={`${subDirectory}/timetable/WorkAllocation`}>TimeTable</NavLink> </BreadcrumbItem>
                <BreadcrumbItem active> Staff Allocation</BreadcrumbItem>
              </Breadcrumb>
              {this.renderUserForm(actiontype)}
            </Container>
          </Fragment>
        }
      </div>

    );
  }
}




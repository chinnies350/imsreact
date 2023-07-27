
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import Header from 'components/common/header';
import Loading from 'components/common/loading';
import SideNav from 'components/common/sideNav';
import AddAssignment from 'components/assignment/form/assignmentform'
import AddHomework from 'components/assignment/form/homeworkform'
import 'styles/user-form.scss';

import {subDirectory} from '../../../config.json'

export default class AssignmentForm extends Component {
  state = {
    isPageLoading: false,
    isLoading: false
  }

  async componentDidMount() {
    await this.init(this.props, true)
  }

  async componentWillReceiveProps(props) {
    await this.init(props, false)
  }

  async init(props, isPageLoading = false) {
    //  const { uid, formType, action } = props.match.params  
  }

  renderUserForm(type, action) {
    switch (type) {
      case 'homework':
        return <AddHomework type={type} action={action} props={this.props} />
      case 'assignment':
        return <AddAssignment type={type} action={action} props={this.props} />
      default:
        return <AddAssignment type={type} action={action} props={this.props} />
    }
  }

  render() {
    const { isPageLoading, isLoading } = this.state;
    const { action, type } = this.props.match.params;
    const { session } = this.props;

    return (

      <div className="">
        {isPageLoading && <Loading />}
        {!isPageLoading && !isLoading &&
          <Fragment>
            <Breadcrumb>
              <BreadcrumbItem><NavLink to={`${subDirectory}/dashboard`}>Dashboard</NavLink></BreadcrumbItem>
              <BreadcrumbItem><NavLink to={`${subDirectory}/assignments/assignment`}>assignments</NavLink></BreadcrumbItem>
              <BreadcrumbItem active>{action}</BreadcrumbItem>
              <BreadcrumbItem active>{type}</BreadcrumbItem>
            </Breadcrumb>
            <Container fluid>
              {this.renderUserForm(type, action)}
            </Container>
          </Fragment>
        }
      </div>

    );
  }
}
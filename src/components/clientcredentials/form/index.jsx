import 'styles/user-form.scss';
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Breadcrumb, BreadcrumbItem, } from 'reactstrap';
import Static from 'services/static';
import Header from 'components/common/header';
import Loading from 'components/common/loading';
import SideNav from 'components/common/sideNav';

import MailCredentialsForm from 'components/clientcredentials/form/mailcredentialsform';
import SmsCredentialsForm from 'components/clientcredentials/form/smscredentialsform'

import {subDirectory} from '../../../config.json'

var classNames = require('classnames');

export default class CredentialsForm extends Component {
  state = {

    isPageLoading: true,
    isLoading: true,

  }

  async componentDidMount() {
    await this.init(this.props, true)
  }

  async componentWillReceiveProps(props) {
    await this.init(props, false)
  }

  async init(props, isPageLoading = false) {
    const { uid, form, action } = props.match.params
    let user = {}

    this.setState({ user: user, uid, form, action, isPageLoading: false, isLoading: false })
  }

  renderCredentialsForm(form, action) {
    if (form === 'mail') return <MailCredentialsForm form={form} action={action} props={this.props} />
    if (form === 'sms') return <SmsCredentialsForm form={form} action={action} props={this.props} />
  }

  render() {
    const { isPageLoading, isLoading, form, action, } = this.state;
    const { keys: formTypeKeys, order: formTypeOrder } = Static.crendentialsFormTypes();
    const { session } = this.props;
    return (
     
            <div className="">
              {isPageLoading && <Loading />}
              {!isPageLoading && !isLoading &&
                <Fragment>
                  <Breadcrumb>
                    <BreadcrumbItem><NavLink to={`${subDirectory}/dashboard`}>Dashboard</NavLink></BreadcrumbItem>
                    <BreadcrumbItem><NavLink to={`${subDirectory}/credentials/sms`}>{form}</NavLink></BreadcrumbItem>
                    <BreadcrumbItem active>{action}  </BreadcrumbItem>
                  </Breadcrumb>
                  <Container fluid>
                    <div className="mb-4">
                      {formTypeOrder.map((form) =>
                        <NavLink key={form}
                        //  onClick={redirectTo} 
                         to={{ pathname: `${subDirectory}/credentials/${form}/add`, query: this.props.location.query }} className={classNames('btn btn-link')} activeClassName="btn-primary" exact={true} >{formTypeKeys[form]['label']}</NavLink>
                      )}
                    </div>
                    {this.renderCredentialsForm(form, action)}
                  </Container>
                </Fragment>
              }
            </div>
         
    );
  }
}



function redirectTo() {
  // return window.location.reload()
}


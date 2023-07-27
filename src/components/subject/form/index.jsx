import 'styles/user-form.scss';
import React, { Component, Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem, Container } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import Header from 'components/common/header';
import Loading from 'components/common/loading';
import SideNav from 'components/common/sideNav';
import Subjects from 'components/subject/form/SubjectForm'

import {subDirectory} from '../../../config.json'

export default class SubjectForm extends Component {
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
        const { uid, formTypes, clientid, entityid } = props.match.params
        let user = {}
        if (uid !== "new") {
            if (user.email === undefined) {
                user = this.state.user
            } else {
                user = this.state.user
            }
        }
        this.setState({ user: user, uid, clientid, entityid, formTypes, isPageLoading: false, isLoading: false })
    }

    renderSubjectForm(actionTypes) {
        return <Subjects actionTypes={actionTypes} props={this.props} />;
    }

    render() {
        const { isPageLoading, isLoading, } = this.state;
        const { actionTypes } = this.props.match.params

        const { session } = this.props;
        return (

            <div className="">
                {isPageLoading && <Loading />}
                {!isPageLoading && !isLoading &&
                    <Fragment>
                        <Breadcrumb>
                            <BreadcrumbItem><NavLink to={`${subDirectory}/dashboard`}>Dashboard</NavLink></BreadcrumbItem>
                            <BreadcrumbItem ><NavLink to={`${subDirectory}/course/subject-list`} active>Subject</NavLink>  </BreadcrumbItem>
                            <BreadcrumbItem active>{actionTypes}</BreadcrumbItem>
                        </Breadcrumb>
                        <Container fluid>
                            {this.renderSubjectForm(actionTypes)}
                        </Container>
                    </Fragment>
                }
            </div>

        );
    }
}




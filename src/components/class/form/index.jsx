import 'styles/user-form.scss';
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Breadcrumb, BreadcrumbItem, } from 'reactstrap';
import Header from 'components/common/header';
import Loading from 'components/common/loading';
import SideNav from 'components/common/sideNav';

import Reschedule from 'components/class/form/form-reschedule';
import {subDirectory} from '../../../config.json'

export default class ResheduleRoot extends Component {
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

    renderUserForm() {
        return <Reschedule props={this.props} />;
    }

    render() {
        const { isPageLoading, isLoading, } = this.state;

        return (

            <div className="">
                {isPageLoading && <Loading />}
                {!isPageLoading && !isLoading &&
                    <Fragment>
                        <Container fluid>
                            <Breadcrumb>
                                <BreadcrumbItem><NavLink to={`${subDirectory}/dashboard`}>Dashboard</NavLink></BreadcrumbItem>
                                <BreadcrumbItem><NavLink to={`${subDirectory}/timetable/Exam`}>TimeTable</NavLink> </BreadcrumbItem>
                                <BreadcrumbItem active> Reschedule timeTable</BreadcrumbItem>
                            </Breadcrumb>
                            {this.renderUserForm()}
                        </Container>
                    </Fragment>
                }
            </div>

        );
    }
}




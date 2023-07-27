import React, { Component, Fragment } from 'react';
import Joi from 'joi-browser';
import { Form } from 'informed';
import _ from 'lodash';
import { Breadcrumb, BreadcrumbItem, Container, Row, Col, } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Static from 'services/static';
import SyllabusList from './list';
import Header from 'components/common/header';
import SideNav from 'components/common/sideNav';
import Loading from 'components/common/loading';
import { CustomSelect, } from 'components/common/forms';
import { getselectData } from 'services/userService';
import { getSyllabus } from 'services/syllabusService';
import { rightsData } from 'services/rolesService';

import {subDirectory} from '../../config.json'

var classNames = require('classnames');

export default class SyllabusRoot extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: {},
            parentData: [],
            prefixUrl: "",
            isPageLoading: false,
            isLoading: false,
            type: '',
            client: '',
            entity: '',
            department: '',
            branch: '',
            batch: '',
            uid: '',
            clientIds: [], entityIds: [], branchIds: [],
            EventTypes: [],
            isTableLoading: true,
            modal: false,
            isClient: true, isEntity: true, isBranch: true, isDepartment: true, isBatch: true
        }



    }

    async componentWillMount() {
        await this.props.isPageLoadingTrue();
    }

    async componentDidMount() {
        const { session } = this.props;
        console.log(this.props)
        await this.rightsData(session);
        this.selectoptGet(`clients`, "clientIds");
        await this.feildCheck();
        await this.props.isPageLoadingFalse();
    }

    rightsData = async (session) => {
        let res = await rightsData("academics", session);
        console.log(res)
        let excludeModules = [];
        await _.map(_.keys(res), async v => {
            await _.map(_.keys(res[v]), k => {
                if (res[v][k]["value"])
                    return excludeModules.push(v.toLowerCase())
            })
        })
        await this.setState({ excludeModules, rightsData: res || {} })
    }

    feildCheck = async () => {

        let { session: { data: sessionData } } = this.props;
        const { data } = this.state
        const { userType, userLevel, client, entity, branch, code, branchId } = sessionData;
        let switchType = '';
        if (userType === 'staff')
            switchType = userLevel;
        else
            switchType = userType;

        switch (switchType) {
            case 'sadmin':
                break;
            case 'client':
                data['client'] = client;
                await this.setState({ data, isClient: false })
                await this.clientDatas('client');
                await this.formApi.setValues(data);
                break;
            case 'entity':
            case 'branch':
                data['client'] = client || code;
                data['entity'] = entity || code;
                data['branch'] = branch || branchId;
                await this.setState({ data, isClient: false, isEntity: false, isBranch: false })
                await this.clientDatas('client');
                await this.clientDatas('entity');
                await this.clientDatas('branch');
                await this.formApi.setValues(data);
                await this.onSubmit();
                break;
            case 'department':
                data['client'] = client || code;
                data['entity'] = entity || code;
                data['branch'] = branch || branchId;

                await this.setState({ data, isClient: false, isEntity: false, isBranch: false, isDepartment: false })
                await this.clientDatas('client');
                await this.clientDatas('entity');
                await this.clientDatas('branch');

                await this.formApi.setValues(data);
                await this.onSubmit();
                break;
            default:
                data['client'] = client || code;
                data['entity'] = entity || code;
                data['branch'] = branch || branchId;

                await this.setState({ data, isClient: false, isEntity: false, isBranch: false, isDepartment: false, isBatch: false })
                await this.formApi.setValues(data);
                await this.onSubmit();
                break;
        }
    }

    setFormApi = (formApi) => {
        this.formApi = formApi;
    }


    async selectoptGet(url, type) {
        const data = await getselectData(url)
        if (data.data.statusCode === 1) {
            const Datas = data.data.data
            this.setState({ [type]: Datas });
        }
    }

    validateProperty = (name, value) => {
        const schema = Joi.reach(Joi.object(this.schema), name)
        const { error } = Joi.validate(value, schema);
        return error ? error.details[0].message : null;
    };

    schema = {
        client: Joi.string().required().label('Client'),
        entity: Joi.string().required().label('Entity'),
        branch: Joi.string().required().label('Branch'),
    };

    handleChange = async ({ currentTarget: Input }) => {
        const { name, value } = Input;
        const { data } = this.state;
        data[name] = value;
        await this.setState({
            [name]: value
        })
        await this.clientDatas(name);

    }

    clientDatas = async (name) => {
        const { data } = this.state;
        switch (name) {
            case "client":
                this.selectoptGet(`namelist?client=${data.client}&type=client`, "entityIds")
                await this.setState({ entity: "", branch: "", department: "", batch: "", branchIds: [], departmentIds: [], batchIds: [], scheduleTable: false })
                break;
            case "entity":
                this.selectoptGet(`namelist?client=${data.client}&type=entity&entity=${data.entity}`, "branchIds")
                await this.setState({ branch: "", department: "", batch: "", departmentIds: [], batchIds: [], scheduleTable: false })
                break;
            default:
                break;

        }
    }

    onSubmit = async () => {
        console.log(' submit')
        this.tableHide();
        let response,params = '';
        const { data: { client, entity, branch,department, batch } } = this.state
        // const  { client, entity, branch }= this.state
        console.log(this.state)
        if (batch) {
            params = `client=${client}&entity=${entity}&branch=${branch}&type=syllabus&departmentId=${department}&batchId=${batch}`
        } else {
            params = `client=${client}&entity=${entity}&branch=${branch}&type=syllabus`
        }
        // let params = `client=${client}&entity=${entity}&branch=${branch}`
        console.log(params)
        response = await getSyllabus(params)
        if (response.data.statusCode === 1) {
            let data = response.data.data
            await this.setState({
                tableData: data,
                isTableLoading: false
            })
           
        } else {
            let data = [];
            await this.setState({
                tableData: data,
                isTableLoading: false
            })
            this.renderSyllabusListForm(data)
            
        }
    
    }

   

    renderSyllabusListForm(data) {//Pass the datas to the SubjectList
        const { client, entity, branch, rightsData, prefixUrl } = this.state;
        console.log(this.state,data)
        return <SyllabusList
            data={data}
            prefixUrl={prefixUrl}
            props={this.props}
            client={this.state.data.client}
            entity={this.state.data.entity}
            branch={this.state.data.branch}
            rightsData={rightsData}
            onSubmit={this.onSubmit}
            refreshTable={this.onSubmit}
        />
    }


    tableHide() {
        this.setState({
            isTableLoading: true
        })
    }





    addcourseNavigation() { // navidate to Add Attendees Page        
        return <NavLink className="btn btn-primary btn-sm btn-right" to={`${subDirectory}/course/syllabus/add`}>+Add Syllabus</NavLink>
    }

    render() {

        const { isPageLoading, isLoading, tableData, clientIds, entityIds, branchIds, rightsData, excludeModules,
            isClient, isEntity, isBranch, isTableLoading } = this.state;
        let { keys: formTypeKeys, order: formTypeOrder } = Static.courseFormTypes();
        const { session } = this.props;
        let _form = "Syllabus";
        formTypeOrder = _.filter(formTypeOrder, v => _.includes(excludeModules, v))
        return (

            <div className="">
                {isPageLoading && <Loading />}
                {!isPageLoading && !isLoading &&
                    <Fragment>
                        <Breadcrumb>
                            <BreadcrumbItem ><NavLink to={`${subDirectory}/dashboard`}>Dashboard</NavLink>  </BreadcrumbItem>
                            <BreadcrumbItem active> Syllabus</BreadcrumbItem>
                        </Breadcrumb>
                        <Container fluid>
                            {/* <div className="mb-4 subnav-div">
                                            {formTypeOrder.map((courseform) =>
                                                <NavLink key={courseform} to={{ pathname: `/course/${courseform}-list`, query: this.props.location.query }} className={classNames('subnav')} activeClassName="subnav-active" exact={true} >{formTypeKeys[courseform]['label']}</NavLink>
                                            )
                                            }
                                        </div> */}
                            <div className="d-md-flex align-items-md-center justify-content-md-between maincontentheader">
                                <h5 className="pg-title">{_form}</h5>
                                <div style={{ textAlign: "right" }}>
                                    {rightsData && rightsData[_form] && rightsData[_form].create.value &&
                                        this.addcourseNavigation()
                                    }
                                </div>
                            </div>
                            <Form getApi={this.setFormApi} onSubmit={this.onSubmit} >
                                {({ formApi, formState }) => (
                                    <div>
                                        {isBranch &&
                                            <section>
                                                <Row>
                  {/* Client as Group  and Entity as Institution*/}

                                                    {isClient && <Col sm={6} md={3}>
                                                        <CustomSelect field="client" label="Group*" name="client" getOptionValue={option => option.code} getOptionLabel={option => option.name} validateOnBlur validate={e => this.validateProperty('client', e)} onChange={this.handleChange} options={clientIds} />
                                                    </Col>
                                                    }
                                                    {isEntity &&
                                                        <Col sm={6} md={3}>
                                                            <CustomSelect field="entity" label="Institution*" name="entity" getOptionValue={option => option.code} getOptionLabel={option => option.name} validateOnBlur validate={e => this.validateProperty('entity', e)} onChange={this.handleChange} options={entityIds} />
                                                        </Col>
                                                    }
                                                    {isBranch &&
                                                        <Col sm={6} md={3}>
                                                            <CustomSelect field="branch" label="Branch*" name="branch" getOptionValue={option => option.code} getOptionLabel={option => option.name} validateOnBlur validate={e => this.validateProperty('branch', e)} onChange={this.handleChange} options={branchIds} />
                                                        </Col>
                                                    }
                                                    <Col sm={6} md={3} style={{
                                                        marginTop: "24px",
                                                    }}>
                                                        <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                                                    </Col>
                                                </Row>
                                            </section>
                                        }
                                    </div>
                                )}
                            </Form>
                            <br />
                            {!isTableLoading && rightsData &&
                                this.renderSyllabusListForm(tableData)
                            }
                        </Container>
                    </Fragment>
                }
            </div>

        );
    }
}


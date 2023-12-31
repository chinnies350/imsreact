import Joi from 'joi-browser';
import React, { Fragment, Component } from 'react';
import { Col, Row } from 'reactstrap';
import { Form } from 'informed';

import { Input, CustomSelect } from 'components/common/forms';
import { getselectData } from 'services/userService' 
import ToastService from 'services/toastService'
import { addCredentials, editcredentialsDetails } from 'services/clientCredentialService'

import {subDirectory} from '../../../config.json'

export default class SmsCredentialsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: '',
            data: {
                code: '',
                internalcode: '',
                department: '',
                batch: '',
                modules: '',
                name: '',
                shortname: ''
            },
            data1:'',
            clientDetails: '',
            clientnames: [],
            clientIds: [], entityIds: [], branchIds: [], departmentIds: [], batchIds: [],
            isClient: true, isEntity: true, isBranch: true, isDepartment: true, isBatch: true
        }
    }

    schema = { //validation using Schema
        client: Joi.string().required().label("Client"),
        entity: Joi.string().required().label("Entity"),
        branch: Joi.string().required().label("Branch"),
        username: Joi.string().required().label("User Name"),
        userName: Joi.string().required().label("User Name"),
        senderId: Joi.string().required().label("SenderId"),
        url: Joi.string().required().label("URL"),
        accessKey: Joi.string().required().label("AccessKey")
    };

    async componentDidMount() {
        const { action } = this.props
        await this.selectoptGet(`clients`, "clientIds");
        await this.feildCheck();
        if (action === "edit") {
            this.setState({ isEditForm: true });
            const { location: { state: { data } } } = this.props.props;
            if (data !== undefined) { }
            return this.formStateCheck(data);
        }
    }
    
    feildCheck = async () => {
      
        let { session: { data: sessionData } } = this.props.props;
        const { data } = this.state
        const { userType, userLevel, client, entity, branch, department, batch, code, branchId, departmentId, batchId } = sessionData;
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
                break;
            case 'department':
                data['client'] = client || code;
                data['entity'] = entity || code;
                data['branch'] = branch || branchId;
                data['department'] = department || departmentId;
                await this.setState({ data, isClient: false, isEntity: false, isBranch: false, isDepartment: false })
                await this.clientDatas('client');
                await this.clientDatas('entity');
                await this.clientDatas('branch');
                await this.clientDatas('department');
                await this.formApi.setValues(data);
                break;
            default:
                data['client'] = client || code;
                data['entity'] = entity || code;
                data['branch'] = branch || branchId;
                data['department'] = department || departmentId;
                data['batch'] = batch || batchId;
                await this.setState({ data, isClient: false, isEntity: false, isBranch: false, isDepartment: false, isBatch: false })
                await this.formApi.setValues(data);
                break;
        }
    }


    formStateCheck = async (data) => {
        data.url = data.sms[0].url
        data.username = data.sms[0].userName
        data.senderId = data.sms[0].senderId
        data.accessKey = data.sms[0].accessKey
        await this.setState({ data });
        try {
            await this.clientDatas('client');
            await this.clientDatas('entity');
            await this.clientDatas('branch');
            await this.clientDatas('department');
            await this.clientDatas('batch');
            await this.formApi.setValues(data);
        } catch (err) {
            this.handleError(err);
        }
    }

    handleError(...err) {
      
        return ToastService.Toast("Something went wrong.Please try again later",'default');
    }

    validateProperty = (name, value) => {
        const schema = Joi.reach(Joi.object(this.schema), name)
        const { error } = Joi.validate(value, schema);
        return error ? error.details[0].message : null;
    };

    resetForm = () => {
        const { action } = this.props
        this.formApi.reset()
        if (action === 'edit') {
            let path = `${subDirectory}/credentials/sms` //Redirect the page after updated the datas
            this.props.props.history.push({
                pathname: path,
                state: {
                }
            })
        }
    }

    setFormApi = (formApi) => {
        this.formApi = formApi;
    }

    handleChange = async ({ currentTarget: Input }) => {
        const { name, value } = Input;
        const { data } = this.state;
        data[name] = value;
        this.setState({
            [name]: value
        }, () => {

        })
        await this.clientDatas(name);
    }

    clientDatas = async (name) => { // Get the Client,Entity,Branch,Department,Batch, 
        const { data } = this.state;
        switch (name) {
            case "client":
                this.selectoptGet(`namelist?client=${data.client}&type=client`, "entityIds")
                await this.setState({ entity: "", branch: "", department: "", batch: "", branchIds: [], departmentIds: [], batchIds: [] })
                break;
            case "entity":
                this.selectoptGet(`namelist?client=${data.client}&type=entity&entity=${data.entity}`, "branchIds")
                await this.setState({ branch: "", department: "", batch: "", departmentIds: [], batchIds: [] })
                break;
            case "branch":
                this.selectoptGet(`namelist?client=${data.client}&type=branch&entity=${data.entity}&branch=${data.branch}`, "departmentIds")
                await this.setState({ department: "", batch: "", batchIds: [] })
                break;
            case "department":
                this.selectoptGet(`namelist?client=${data.client}&type=department&entity=${data.entity}&branch=${data.branch}&department=${data.department}`, "batchIds")
                await this.setState({ batch: "" })
                break;
            case "batch":
                break;
            default:
                break;
        }
    }

    async selectoptGet(url, type) {
        const data = await getselectData(url)
        if (data.data.statusCode === 1) {
            const Datas = data.data.data
            this.setState({ [type]: Datas });
        }
    }

    setFormApi = (formApi) => {
        this.formApi = formApi;
    }

    onSubmit = async () => {
        console.log(' credentialDetails sms')
        var credentialDetails;
        const{data1} = this.state
        const { action } = this.props
        console.log(this.props)
        const data = this.formApi.getState().values
        console.log(data)
        const { client, entity, username, branch, senderId, url, accessKey } = data
        console.log(data)
        let temp = {
            "client": client,
            "entity": entity,
            "branch": branch,
            "type": "sms",
            "userName": username,
            "senderId": senderId,
            "accessKey": accessKey,
            "url": url,
        }




        if (action === 'edit') {
            credentialDetails = await editcredentialsDetails(temp)

        } else if (action === 'add') {
            credentialDetails = await addCredentials(temp)
            console.log(credentialDetails,temp)
                
        }
        if (credentialDetails.data.statusCode !== 1) return ToastService.Toast(credentialDetails.data.message,  'default');
        if (credentialDetails.data.statusCode === 1) {
            
            console.log(data1)
            ToastService.Toast(credentialDetails.data.message, '', 'default');
            this.resetForm();
            this.props.props.history.push(`${subDirectory}/credentials/sms`)

        }
    }


    render() {
        const { action, form } = this.props
        const { clientIds, entityIds, branchIds,isClient, isEntity, isBranch,  } = this.state;
        return (
            <Fragment>
                <h6>{action} {form}  Details</h6>
                <Form getApi={this.setFormApi} onSubmit={this.onSubmit} >
                    {({ formApi, formState }) => (
                        <div>
                            <section>
                                <Row>
                                    {isClient &&
                                    <Col sm={6} md={3}>
                                          {/* Client as Group */}
                                        <CustomSelect field="client" label="Group*" name="client" getOptionValue={option => option.code} getOptionLabel={option => option.name} validateOnBlur validate={e => this.validateProperty('client', e)} onChange={this.handleChange} options={clientIds} />
                                    </Col>}
                                    {isEntity &&
                                    <Col sm={6} md={3}>
                                          {/* Entity as Institution */}
                                        <CustomSelect field="entity" label="Institution*" name="entity" getOptionValue={option => option.code} getOptionLabel={option => option.name} validateOnBlur validate={e => this.validateProperty('entity', e)} onChange={this.handleChange} options={entityIds} />
                                    </Col>
                                    }
                                     {isBranch &&
                                    <Col sm={6} md={3}>
                                        <CustomSelect field="branch" label="Branch*" name="branch" getOptionValue={option => option.code} getOptionLabel={option => option.name} validateOnBlur validate={e => this.validateProperty('branch', e)} onChange={this.handleChange} options={branchIds} />
                                    </Col>
                                     }
                                    {
                                        action === 'add' &&
                                        <Col sm={6} md={3}>
                                            <Input field="username" label="User Name*" name="username" validate={e => this.validateProperty('username', e)} />
                                        </Col>
                                    }

{/* {
                                        action === 'add' &&
                                        <Col sm={6} md={3}>
                                            <Input field="userName" label="User Name*" name="userName" validate={e => this.validateProperty('userName', e)} />
                                        </Col>
                                    } */}
                                    {
                                        action === 'edit' &&
                                        < Col sm={6} md={3}>
                                            <Input field="username" label="User Name*" name="username" validate={e => this.validateProperty('username', e)} disabled />
                                        </Col>
                                    }
                                </Row>
                                <Row>
                                    <Col sm={6} md={3}>
                                        <Input field="senderId" label="SenderId*" name="senderId" validate={e => this.validateProperty('senderId', e)} />
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <Input field="url" label="URL*" name="url" validate={e => this.validateProperty('url', e)} />
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <Input field="accessKey" label="AccessKey*" name="accessKey" validate={e => this.validateProperty('accessKey', e)} />
                                    </Col>
                                </Row>
                            </section>
                            <div className="text-right">
                              <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                          </div>

                        </div>
                    )}
                </Form>
            </Fragment >
        )
    }
}
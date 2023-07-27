import DRP1 from 'components/common/forms/date-range-picker';
import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Form } from 'informed';
import moment from 'moment';
import Joi from 'joi-browser';
import { rightsData } from 'services/rolesService';

import { addCircularInfo, updateCircularInfo } from 'services/circularService';
import { CustomSelect, Input, Textarea } from 'components/common/forms';
import ToastService from 'services/toastService';
import { getselectData } from 'services/userService';
import _ from 'lodash';

import {subDirectory} from '../../../config.json'

export default class Circular extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {},
      isEditForm: false,
      formActionType: false,
      isTableLoading: true,
      isClient: true, isEntity: true, isBranch: true, isDepartment: true, isBatch: true,
      clientIds: [], entityIds: [], branchIds: [], departmentIds: [], batchIds: [],
    }
  }

  async componentDidMount() {
    const { session } = this.props.props;
    this.init()
    await this.rightsData(session);
    await this.feildCheck();
  }

  validateProperty = (name, value) => {
    const schema = Joi.reach(Joi.object(this.schema), name)
    const { error } = Joi.validate(value, schema);
    return error ? error.details[0].message : null;
  };

  schema = {
    client: Joi.string().required().label("Client"),
    entity: Joi.string().required().label("Entity"),
    branch: Joi.string().required().label("Branch"),
    department: Joi.string().required().label("Department"),
    batch: Joi.string().required().label("Batch"),
    title: Joi.string().required().label("Title"),
    date: Joi.string().required().label("Date"),
    description: Joi.string().required().label("Description"),
  };

  init = async () => {
    const { data } = this.state
    await this.selectoptGet(`clients`, "clientIds")
    await this.formApi.setValues(data);
    const { actionType, } = this.props
    this.setState({ isEditForm: false });
    if (actionType === 'edit')
      this.setState({ isEditForm: true });
    await this.setState({ formActionType: (actionType === 'view') })
    const { location: { state } } = this.props.props;
    if (state !== undefined && state.isFromView)
      return this.getSampleData(state);
  }

  rightsData = async (session) => {
  
    var moduleName = "communication";
  
    let res = await rightsData(moduleName, session);
    let excludeModules = [];
    await _.map(_.keys(res), async v => {
        await _.map(_.keys(res[v]), k => {
            if (res[v][k]["value"])
                return excludeModules.push(v.toLowerCase())
        })
    })
    excludeModules = await _.uniq(excludeModules)

    await this.setState({ excludeModules, rightsData: res || {} })
}

feildCheck = async () => {
  
    let { session: { data: sessionData } } = this.props.props;
  
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
            break;
        default:
            data['client'] = client || code;
            data['entity'] = entity || code;
            data['branch'] = branch || branchId;
            await this.setState({ data, isClient: false, isEntity: false, isBranch: false, isDepartment: false, isBatch: false })
            await this.formApi.setValues(data);           
            break;
    }
}

  getSampleData = async (data) => {    
    data['id'] = data._id
    data.startDate = data.from
    data.endDate = data.to
    await this.setState({ data });
    try {
      await this.clientDatas('client');
      await this.clientDatas('entity');
      await this.clientDatas('branch');
      await this.clientDatas('department');
      await this.formApi.setValues(data);
    } catch (err) {
      this.handleError(err);
    }
  }

  setFormApi = (formApi) => {
    this.formApi = formApi;
  }

  handleChange = async ({ currentTarget: Input }) => {
    const { name, value } = Input;
    const { data } = this.state;
    data[name] = value;
    this.setState({ [name]: value })
    this.clientDatas(name);
  }

  clientDatas = async (name) => {
    const { data } = this.state;
    switch (name) {
      case "client":
        await this.selectoptGet(`namelist?client=${data.client}&type=client`, "entityIds")
        await this.setState({ entity: "", branch: "", department: "", batch: "", branchIds: [], departmentIds: [], batchIds: [] })
        break;
      case "entity":
        await this.selectoptGet(`namelist?client=${data.client}&type=entity&entity=${data.entity}`, "branchIds")
        await this.setState({ branch: "", department: "", batch: "", departmentIds: [], batchIds: [] })
        break;
      case "branch":
        await this.selectoptGet(`namelist?client=${data.client}&type=branch&entity=${data.entity}&branch=${data.branch}`, "departmentIds")
        await this.setState({ department: "", batch: "", })
        break;
      case "department":
        this.selectoptGet(`namelist?client=${data.client}&type=department&entity=${data.entity}&branch=${data.branch}&department=${data.department}`, "batchIds")
        await this.setState({ batch: "", batchIds: [] })
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
    } else {
      ToastService.Toast(`${type} data Not Found!!!`, "default")
    }
  }

  dateValue = async (date, field) => { // Get dates from the data range picker
    const data = this.formApi.getState().values;
    const { from, to } = date;
    data[field] = { from: new Date(from).toLocaleDateString(), to: new Date(to).toLocaleDateString() };
    data.startDate = data.date.from;
    data.endDate = data.date.to;
    this.formApi.setValues(data);
  }

  redirectTo = async () => {
    const { props } = this.props;
    await props.history.push({
      pathname: `${subDirectory}/notification/circular`,
    });
  }

  handleError(...err) {
    return ToastService.Toast("Something went wrong.Please try again later", "default");
  }

  onSubmit = async () => {
    const { isEditForm } = this.state;
    let data = this.formApi.getState().values;   
    var res = '';
    const { client, entity, branch, description, department, batch, startDate, endDate, title } = data
    let temp = {
      'client': client,
      'to': endDate,
      'entity': entity,
      'branch': branch,
      'description': description,
      'batch': batch,
      'from': startDate,
      'department': department,
      'title': title,
      'id':data._id
    }    
    try {
      if (!isEditForm) {
        res = await addCircularInfo(temp);
        console.log(res,temp) 
      } else {
        res = await updateCircularInfo(temp);    
        console.log(res,temp,this.state)    
      }
      const { data: { statusCode } } = res;
      if (statusCode === 1) {
        await ToastService.Toast(res.data.message, 'default')
        return this.redirectTo();
      } else {
        return ToastService.Toast("Something went wrong.Please try again later", "default");
      }
    } catch (err) {
      this.handleError(err)
    }
  }

  render() {
    const { clientIds, entityIds, branchIds, departmentIds, batchIds, formActionType,isClient, isEntity, isBranch,isDepartment,isBatch,rightsData } = this.state
    const { actionType } = this.props
    return (
      <Fragment>
        <Container fluid>
          <div className="mb-4">
            <h6>{actionType} Circular</h6>
          </div>
          <Form getApi={this.setFormApi} onSubmit={this.onSubmit} >
            {({ formApi, formState }) => (
              <div>
                <section>
                  <Row>
                  {isClient && <Col sm={6} md={3}>
                      {/* Client as Group */}
                      <CustomSelect field="client" label="Group*" name="client" getOptionValue={option => option.code} getOptionLabel={option => option.name} validateOnBlur validate={e => this.validateProperty('client', e)} onChange={this.handleChange} options={clientIds} disabled={formActionType} />
                    </Col>}
                     {isEntity && <Col sm={6} md={3}>
                         {/* Entity  as Institution */}
                      <CustomSelect field="entity" label="Institution*" name="entity" getOptionValue={option => option.code} getOptionLabel={option => option.name} validateOnBlur validate={e => this.validateProperty('entity', e)} onChange={this.handleChange} options={entityIds} disabled={formActionType} />
                    </Col>}
                    {isBranch &&  <Col sm={6} md={3}>
                      <CustomSelect field="branch" label="Branch*" name="branch" getOptionValue={option => option.code} getOptionLabel={option => option.name} validateOnBlur validate={e => this.validateProperty('branch', e)} onChange={this.handleChange} options={branchIds} disabled={formActionType} />
                    </Col>}
                    {isDepartment &&  <Col sm={6} md={3}>
                      <CustomSelect field="department" label="Department*" getOptionValue={option => option.code} getOptionLabel={option => option.name} validateOnBlur validate={e => this.validateProperty('department', e)} onChange={this.handleChange} options={departmentIds} disabled={formActionType} />
                    </Col>}
                    {isBatch &&  <Col sm={6} md={3}>
                      <CustomSelect field="batch" label="Batch*" getOptionValue={option => option.code} getOptionLabel={option => option.name} validateOnBlur validate={e => this.validateProperty('batch', e)} onChange={this.handleChange} options={batchIds} disabled={formActionType} />
                    </Col>}
                  </Row>
                </section>
                <section>
                  <Row>
                    <Col sm={6} md={3}>
                      <Input field="title" label="Title*" validateOnBlur validate={e => this.validateProperty('title', e)} disabled={formActionType} />
                    </Col>
                    <Col sm={12} md={4}>
                      <label>Date*</label>                    
                      <DRP1 field="date" label="Date*" id="date" startDate={moment(formState.values.startDate)} endDate={moment(formState.values.endDate)} onChange={(data) => this.dateValue(data, "date")} validate={e => this.validateProperty('date', e)} />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12}>
                      <Textarea field="description" label="Description*" validateOnBlur validate={e => this.validateProperty('description', e)} disabled={formActionType} />
                    </Col>
                  </Row>
                </section>
                {!formActionType &&
                  <div className="text-right">
                    <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                  </div>
                }
              </div>
            )}
          </Form>
        </Container>
      </Fragment>
    )
  }
}
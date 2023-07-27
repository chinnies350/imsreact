import React, { Component, Fragment } from 'react';
import { Form } from 'informed';
import Joi from 'joi-browser';
import { Col, Row } from 'reactstrap';

import moment from 'moment';
import ToastService from 'services/toastService'
import { getselectData } from 'services/userService';
import { scheduleInsert, updateScheduleDetails, academicDateRange } from 'services/scheduleService';
import { Input, CustomSelect, Textarea, RTimePicker } from 'components/common/forms';
import DRP1 from 'components/common/forms/date-range-picker';

import {subDirectory} from '../../../config.json'

const dayList = [];
const weekList = [];

dayList.push("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
weekList.push("1st Week", "2nd Week", "3rd Week", "4th Week")


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!

var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}
if (mm < 10) {
  mm = '0' + mm;
}
var todayDate = mm + '/' + dd + '/' + yyyy;


export default class CourseForm extends Component {
  state = {
    data: {
      client: "", entity: "", branch: "", department: "", batch: "",
    },
    clientIds: [], entityIds: [], branchIds: [], departmentIds: [], batchIds: [],
    EventTypes: [{ id: "Monthly", name: "Monthly" }, { id: "Daily", name: "Daily" }, { id: "Weekly", name: "Weekly" }],
    isLoading: true,
    isClient: true, isEntity: true, isBranch: true, isDepartment: true, isBatch: true,
    todayDate: todayDate,
    toRange: {}
  };

  async componentDidMount() {
    const { actiontype } = this.props
    const { data } = this.state
    this.selectoptGet(`clients`, "clientIds")
    console.log(data)
    await this.feildCheck()
    this.formApi.setValues(data);
    if (actiontype === "edit") {
      this.setState({ isEditForm: true });
      const { location: { state: { scheduledata } } } = this.props.props;

      if (scheduledata !== undefined) { }
      return this.formStateCheck(scheduledata);
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

    data.description = data.desc
    data.startTime = data.from.time
    data.endTime = data.to.time
    data.code = data.course[0].code
    data.department = data.clients[0].departmentId;
    data.batch = data.clients[0].batchId;
    data.startDate = data.from.date
    data.endDate = data.to.date
    data.bannerimageurl = data.course[0].website.url
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

  schema = {
    client: Joi.string().required().label("Client"),
    entity: Joi.string().required().label("Entity"),
    branch: Joi.string().required().label("Branch"),
    // department: Joi.any().optional(),
    // batch: Joi.any().optional(),
    department: Joi.string().required().label("Department"),
    batch: Joi.string().required().label("Batch"),

    department: Joi.any().optional(),
    batch: Joi.any().optional(),
    title: Joi.string().required().label('Title'),
    date: Joi.string().required().label('Date'),
    starttime: Joi.string().required().label('StartTime'),
    endtime: Joi.string().required().label('EndTime'),
    description: Joi.string().empty('').optional(),
    code: Joi.string().required().label('Code'),
    term: Joi.string().required().label("Term"),
  }

  handleChange = async ({ currentTarget: Input }) => {
    const { name, value } = Input;
    const { data } = this.state;
    data[name] = value;
    this.setState({
      [name]: value
    })
    await this.clientDatas(name);
  }

  clientDatas = async (name) => { // Get the Client,Entity,Branch,Department,Batch,EventName Lists
    const { data } = this.state;
    switch (name) {
      case "client":
        await this.selectoptGet(`namelist?client=${data.client}&type=client`, "entityIds")
        await this.setState({ entity: "", branch: "", department: "", batch: "", branchIds: [], departmentIds: [], batchIds: [] })
        break;
      case "entity":
        await this.academicDateRange();
        await this.selectoptGet(`namelist?client=${data.client}&type=entity&entity=${data.entity}`, "branchIds")
        await this.setState({ branch: "", department: "", batch: "", departmentIds: [], batchIds: [] })
        break;
      case "branch":
        await this.selectoptGet(`namelist?client=${data.client}&type=branch&entity=${data.entity}&branch=${data.branch}`, "departmentIds")
        await this.setState({ department: "", batch: "", batchIds: [] })
        break;
      case "department":
        await this.selectoptGet(`namelist?client=${data.client}&type=department&entity=${data.entity}&branch=${data.branch}&department=${data.department}`, "batchIds")
        await this.setState({ batch: "" })
        break;
      case "batch":
        break;
      default:
        break;
    }
  }

  academicDateRange = async () => {
    const { data: { client, entity } } = this.state;
    let r = await academicDateRange(`client=${client}&entity=${entity}`)

    if (r && r.data && r.data.statusCode === 1) {
      r = r.data.data
      await this.setState({ toRange: r })
    } else {

    }

  }

  handleChangeFile = async (e) => {
    const data = this.formApi.getState().values
    data.bannerimageURL = e.target.files
    await this.formApi.setValues(data)
  }

  async selectoptGet(url, type) {
    const data = await getselectData(url)
    if (data.data.statusCode === 1) {
      const Datas = data.data.data
      this.setState({ [type]: Datas });
    }
    else{
      this.setState({ [type]: [] });

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

  setFormApi = (formApi) => {
    this.formApi = formApi
  }

  validateProperty = (name, value) => {
    const schema = Joi.reach(Joi.object(this.schema), name)
    const { error } = Joi.validate(value, schema);
    return error ? error.details[0].message : null;
  };


  onSubmit = async () => {
    const { actiontype } = this.props
    const data = this.formApi.getState().values;
    const { title, description, department, bannerimageurl, batch, entity, branch, client, code } = data
    let res, params;
    params = `client=${client}&entity=${entity}&branch=${branch}`
    let scheduleCourseDatas = {
      "type": "course",
      "title": title,
      "desc": description,
      "from": { "date": data.startDate || this.state.todayDate, "time": data.startTime },
      "to": { "date": data.endDate || this.state.todayDate, "time": data.endTime },
      "course": {
        "code": code,
        "website": {
          "url": bannerimageurl,
          "target": ""
        }
      },
      "clients": [
        {
          "departmentId": department,
          "batchId": batch
        }
      ]
    }
    if (actiontype === 'add') {
      res = await scheduleInsert(params, scheduleCourseDatas)
    } else if (actiontype === 'edit') {
      res = await updateScheduleDetails(params, scheduleCourseDatas)
    }
    if (res.data.statusCode !== 1) return ToastService.Toast(res.data.message, 'default');
    if (res.data.statusCode === 1) {
      ToastService.Toast(res.data.message, 'default');
      this.props.props.history.push(`${subDirectory}/schedule/course`)
    }
  }

  timeValue = async (time, field) => { // Get time from the timepicker
    const data = this.formApi.getState().values;
    data[field] = time;
    this.formApi.setValues(data);
  }

  resetForm = () => {
    this.formApi.reset()
  }
  render() {
    const { clientIds, entityIds, branchIds, departmentIds, batchIds,
      isClient, isEntity, isBranch, isDepartment, isBatch, toRange
    } = this.state
    const { actiontype } = this.props
    let range = toRange && toRange[0];
    const isOutsideRange = (day => {
      let dayIsBlocked = false;
      if (moment().diff(day, 'days') > 0) {
        dayIsBlocked = true;
      }
      if (range && range.academic.to !== '') {
        if (day > moment(range.academic.to)) {
          dayIsBlocked = true;
        }
      }
      return dayIsBlocked;
    })
    return (
      <Fragment>
        <h6>Schedule Course</h6>
        <Form getApi={this.setFormApi} onSubmit={this.onSubmit} >
          {({ formApi, formState }) => (
            <div>
              {isBatch && <section>
                <h6>Group Details</h6>
                <Row>
                  {/* Client as Group  and Entity as Institution*/}

                  {isClient && <Col sm={12} md={3}>
                    <CustomSelect field="client" label="Gropu*" name="client" getOptionValue={option => option.code}
                      getOptionLabel={option => option.name} options={clientIds}
                      validateOnBlur validate={e => this.validateProperty('client', e)} onChange={this.handleChange} />
                  </Col>}
                  {isEntity &&
                    <Col sm={12} md={3}>
                      <CustomSelect field="entity" label="Institution*" name="entity" getOptionValue={option => option.code}
                        getOptionLabel={option => option.name} options={entityIds}
                        validateOnBlur validate={e => this.validateProperty('entity', e)} onChange={this.handleChange} />
                    </Col>}
                  {isBranch &&
                    <Col sm={12} md={3}>
                      <CustomSelect field="branch" label="Branch*" name="branch" getOptionValue={option => option.code}
                        getOptionLabel={option => option.name} options={branchIds}
                        validateOnBlur validate={e => this.validateProperty('branch', e)} onChange={this.handleChange} />
                    </Col>}
                  {isDepartment &&
                    <Col sm={12} md={3}>
                      <CustomSelect field="department" label="Department*" name="department" getOptionValue={option => option.code}
                        getOptionLabel={option => option.name} options={departmentIds}
                        onChange={this.handleChange} validateOnBlur validate={e => this.validateProperty('department', e)} />
                    </Col>}
                  {isBatch &&
                    <Col sm={12} md={3}>
                      <CustomSelect field="batch" label="Batch*" name="batch" getOptionValue={option => option.code}
                        getOptionLabel={option => option.name} options={batchIds}
                        onChange={this.handleChange} validateOnBlur validate={e => this.validateProperty('batch', e)} />
                    </Col>}
                </Row>
              </section>}
              <section>
                <h6>Course Details</h6>
                <Row>
                  {
                    actiontype === 'edit' &&
                    <Col sm={12} md={3}>
                      <Input
                        field="code" label="Code*" name="code" disabled
                        validate={e => this.validateProperty('code', e)}
                      />
                    </Col>
                  }
                  {
                    actiontype === 'add' &&
                    <Col sm={12} md={3}>
                      <Input
                        field="code" label="Code*" name="code"
                        validate={e => this.validateProperty('code', e)}
                      />
                    </Col>
                  }
                  <Col sm={12} md={3}>
                    <Input
                      field="title" label="Title*" name="title"
                      validate={e => this.validateProperty('title', e)}
                    />
                  </Col>
                  <Col sm={12} md={5}>
                    <label>Date*</label>
                    <DRP1 isOutsideRange={isOutsideRange} field="date" label="Date*" id="date" startDate={moment(formState.values.startDate)} endDate={moment(formState.values.endDate)} onChange={(data) => this.dateValue(data, "date")} validate={e => this.validateProperty('date', e)} />
                  </Col>
                  <Col sm={12} md={2}>
                    <RTimePicker
                      field="startTime" label="StartTime*" value={moment(formState.values.startTime ? formState.values.startTime : "12:00 am", "h:mm a")} onChange={(data) => this.timeValue(data, "startTime")}
                    />
                  </Col>
                  <Col sm={12} md={2}>
                    <RTimePicker
                      field="endTime" label="EndTime*" value={moment(formState.values.endTime ? formState.values.endTime : "12.00 pm", "h:mm a")} onChange={(data) => this.timeValue(data, "endTime")}
                    />
                  </Col>
                  <Col sm={12} md={3}>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" md="12">
                    <Textarea
                      field="description" label="Description" name="description"
                      validateOnBlur validate={e => this.validateProperty('description', e)}
                    />
                  </Col>
                </Row>
              </section>
              <section>
                <Row>
                  <Col sm={6} md={3}>
                    <Input
                      field="bannerimageurl" label="BannerImageURL" name="bannerimage"
                    />
                  </Col>
                  (OR)
                  <Col sm={6} md={3}>
                    <Input
                      field="bannerimage" type="file" label="BannerImage" name="bannerimage"
                      onChange={this.handleChangeFile}
                    />
                  </Col>
                </Row>
              </section>
              <div className="text-right">
                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
              </div>
            </div>
          )}
        </Form>
      </Fragment>
    );
  }
}




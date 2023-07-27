import { Input, PreviewImage, Textarea } from 'components/common/forms';
import { AddressComponent, addressSchema } from 'components/common/forms/address';
import Header from 'components/common/header';
import Loading from 'components/common/loading';
import SideNav from 'components/common/sideNav';
import { Form, Scope } from 'informed';
import Joi from 'joi-browser';
import React, { Component, Fragment } from 'react';
import DRP1 from 'components/common/forms/date-range-picker';
import moment from 'moment';
import { Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import _ from 'lodash';
import ToastService from 'services/toastService'
import { saveClient, updateClient } from 'services/clientService'
// import { post } from 'axios';
// import { apiUrl } from './../../config.json'
import { FileUpload } from 'services/Fileupload'

import {subDirectory} from '../../config.json'


class ClientEdit extends Component {
  state = {
    data: {
      type: 'client', code: '', internalCode: '',
      name: '', shortName: '',
      logo: '', icon: '',
      address: {
        no: '', street: '',
        address1: '', address2: '',
        city: '', state: '', country: '',
        pincode: '',
        email: '', contactno: '', fax: ''
      },
      affiliation: '',
      rules: '',
      committe: '',
      entity: [],
      ref: { client: [], entity: [], branch: [], department: [], batch: [] },
      status: 'active'
    },
    entityImages: [],
    errors: {},
    isLoading: false
  };

  optionSchema = {
    label: Joi.string().empty('').optional(),
    value: Joi.any().optional()
  }

  rangeDateSchema = {
    from: Joi.string().required(),
    to: Joi.string().required()
  }

  shortEntitySchema = {
    name: Joi.string().required(),
    code: Joi.string().empty('').optional(),

    admission: Joi.object(this.rangeDateSchema),
    vacation: Joi.object(this.rangeDateSchema),
    academic: Joi.object(this.rangeDateSchema),

  }

  schema = {
    cuid: Joi.string().required().label("User id"),
    cpassword: Joi.string().required().label("Password"),
    cemail: Joi.string().email().required().label("Email"),
    uid: Joi.string().required().label("User id"),
    password: Joi.string().required().label("password"),
    email: Joi.string().email().required().label("Email"),
    branchId: Joi.any().optional(),
    branchName: Joi.string().required().label("Branch Name"),
    addremail: Joi.string().email().required().label("Address Email"),
    //* mobile: Joi.string().regex(/^\d+$/).length(10).required().label("Mobile Number"),
    mobile: Joi.number()
    .integer()
    .min(1000000000)
    .max(9999999999)
    .label("Mobile Number")
    .error(() => {
      return { message: "Enter Correct Mobile Number" };
    })
    .required(),

    type: Joi.string().required().label("Type"),
    code: Joi.string().alphanum().min(3).max(30).optional().label("Code"),
    internalCode: Joi.any().optional(),
    name: Joi.string().required().label('Name'),
    shortName: Joi.string().required().label("Short Name"),
    logo: Joi.any().optional(),
    icon: Joi.any().optional(),
    address: Joi.object(addressSchema).label("Address"),
    affiliation: Joi.any().optional(),
    rules: Joi.any().optional(),
    committe: Joi.any().optional(),
    entity: Joi.array().items(Joi.object(this.shortEntitySchema)).label("Entity"),
    ref: Joi.object({
      client: Joi.array().items(Joi.any()).label("Client"),
      entity: Joi.array().items(Joi.any()).label("Entity"),
      branch: Joi.array().items(Joi.any()).label("Branch"),
      department: Joi.array().items(Joi.any()).label("Department"),
      batch: Joi.array().items(Joi.any()).label("Batch")
    })
  };

  async componentDidMount() {
    const { match: { params: { groupaction, type } } } = this.props;
    console.log(";;;;;;;;;;;;;;;;;;;;; props at groups mount ", this.props)
    const { data } = this.state;
    data['type'] = type;
    await this.setState({ data })

    let sampleData = {};
    if (groupaction !== 'add') sampleData = await this.getSampleData();
    // this.setState({ data: sampleData })
    this.formApi.setValues(sampleData);
  }

  getSampleData = async () => {

    let { location: { state: { row } } } = this.props;

    // const { data: { statusCode, data } } = await clientData(id);
    // if (statusCode !== 0) return data[0];
    row['ref'] = { client: [], entity: [], branch: [], department: [], batch: [] }
    row['password'] = row['defaultpassword'];
    return row;
  }

  validateProperty = (name, value) => {
    const schema = Joi.reach(Joi.object(this.schema), name)
    const { error } = Joi.validate(value, schema);
    return error ? error.details[0].message : null;
  };

  setFormApi = (formApi) => {
    this.formApi = formApi;
  }

  dateValue = async (date, i, feild) => {
    const data = this.formApi.getState().values;
    const { from, to } = date;
    data.entity[i][feild] = { from: new Date(from).toLocaleDateString(), to: new Date(to).toLocaleDateString() };
    this.formApi.setValues(data);
    const data1 = this.formApi.getState().values;
    await _.keys(_.map(data1.entity)).forEach((item) => {
    });
  }

  dateFeildBlur = (e) => {

  }

  saveClient = async (data) => {
    var res = await saveClient(data);
    const { data: { message, statusCode } } = res;
    if (statusCode !== 1){ return ToastService.Toast(message,"default");}
    else{
      return ToastService.Toast(message,"default")
    }
    
    this.redirectTo();
  }

  updateClient = async (uid, data) => {
    var res = await updateClient(data.uid, data);
    const { data: { message,statusCode } } = res;
    if (statusCode !== 1){ return ToastService.Toast(message,"default");}
    else{
      return ToastService.Toast(message,"default")
    }
    this.redirectTo();
  }

  redirectTo = async () => {
    const { data: { type } } = this.state;
    let url = '';
    switch (type) {
      case "client":
        url = `${subDirectory}/client/list`;
        break;
      // case "entity":
      //   url = `/${clientid}/entity/list`;
      //   break;
      // case "branch":
      //   url = `/${clientid}/${entityId}/branch/list`;
      //   break;
      default:
        url = `${subDirectory}/client/list`;
        break;
    }
    await this.props.history.push({
      pathname: url
    });
  }

  addShortClient = async () => {
    let from = moment(new Date().toLocaleDateString()),
      to = moment(new Date().toLocaleDateString());

    const data = {
      code: '', name: '', logo: '',
      uid: '', password: '',
      admission: { from, to },
      academic: { from, to },
      vacation: { from, to },
    };

    const values = this.formApi.getState().values;
    var entity = values.entity;
    entity.push(data)

    this.formApi.setValues({ ...values, entity: entity });
  }

  removeShortClient = (i) => {
    const values = this.formApi.getState().values;
    let entity = values.entity;
    entity.splice(i, 1);
    this.formApi.setValues({ ...values, entity: entity });
  }

  handleEntityImage = async (i, { target: { files } }) => {
    const { entityImages } = this.state;
    await entityImages.push({ location: i, file: await FileUpload(files[0]).then((res) => res.data.name) })
    await this.setState({ entityImages });
  }

  handleChange = async (field, { target: { files } }) => {
    const values = this.formApi.getState().values;
    let imageUrl = await FileUpload(files[0]).then((res) => res.data.name)
    await this.setState({ [field]: imageUrl });
    await this.formApi.setValues({ ...values, [field]: imageUrl });
  }

  // fileUpload(file) {
  //   const url = `${apiUrl}/uploadfile`;
  //   const formData = new FormData();
  //   formData.append('file', file)
  //   const config = {
  //     headers: { 'content-type': 'multipart/form-data' }
  //   }
  //   return post(url, formData, config)
  // }

  onSubmit = async () => {
    const data = this.formApi.getState().values;
    const { match: { params: { groupaction } } } = this.props;
    data['entity'] = [{}];
    if (groupaction === 'add') return this.saveClient(data);
    this.updateClient(groupaction, data);
  }


  render() {
    const { isPageLoading } = this.state;

    const { session, match: { params: { groupaction } } } = this.props;

    console.log(";;;;;;;;;;;;;;;;;;;;; the propts at groups ", this.props)

    // if (groupaction !== "add") {
    //   let { location: { state: { entityId } } } = this.props
    // }

    return (

      <div className="">
        {isPageLoading && <Loading />}
        {!isPageLoading &&
          <Fragment>
            <Breadcrumb>
              {/* Client as Group */}
              <BreadcrumbItem><NavLink to={`${subDirectory}/dashboard`}>Dashboard</NavLink></BreadcrumbItem>
              <BreadcrumbItem><NavLink to={`${subDirectory}/client/list`}>Group</NavLink></BreadcrumbItem>
              {groupaction === "add" &&
                <BreadcrumbItem active>Add</BreadcrumbItem>
              }
              {groupaction !== "add" &&
                <Fragment>
                  <BreadcrumbItem active>{this.props.location.state.entityId}</BreadcrumbItem>
                  <BreadcrumbItem active>Edit</BreadcrumbItem>
                </Fragment>
              }
            </Breadcrumb>
            <div className="d-md-flex align-items-md-center justify-content-md-between maincontentheader">
              <h5>Group</h5>
              <div>
              </div>
            </div>
            <Form getApi={this.setFormApi} onSubmit={this.onSubmit}>
              {/* <FormStateInfo /> */}

              {({ formApi, formState }) => (
                <div>
                  <section>

                    <Row>
                      <Col sm={6} md={4}>
                          {/* Client as Group */}
                        <Input
                          field="code" label="Group Code"
                          validateOnBlur validate={e => this.validateProperty('code', e)}
                          readOnly={groupaction !== "add"} />
                      </Col>
                      <Col sm={6} md={4}>
                        <Input
                          field="internalCode" label="Reference code"
                          validateOnBlur validate={e => this.validateProperty('internalCode', e)}
                        />
                      </Col>
                      <Col sm={12} md={4}>
                        <Input
                          field="shortName" label="Short name*"
                          validateOnBlur validate={e => this.validateProperty('shortName', e)}
                        />
                      </Col>
                      <Col sm={12} md={12}>
                        <Input
                          field="name" label="Name of the institute*"
                          validateOnBlur validate={e => this.validateProperty('name', e)}
                        />
                      </Col>
                    </Row>
                  </section>
                  <section>
                      {/* Client as Group */}
                    <h6>Group Credentials</h6>
                    <Row>
                      <Col sm={12} md={2}>
                        <Input
                          field="uid" label="User Id*"
                          validateOnBlur validate={e => this.validateProperty('cuid', e)} readOnly={groupaction !== "add"}
                        />
                      </Col>
                      <Col sm={12} md={4}>
                        <Input
                          field="email" label="Email Id*"
                          validateOnBlur validate={e => this.validateProperty('cemail', e)} readOnly={groupaction !== "add"}
                        />
                      </Col>
                      <Col sm={12} md={4}>
                        <Input
                          field="password" label="Password*"
                          validateOnBlur validate={e => this.validateProperty('cpassword', e)}
                        />
                      </Col>
                    </Row>
                  </section>
                  <section>
                    <h6>Personalization</h6>
                    <Row>
                      <Col sm={12} md={6}>
                        <Input
                          field="logo" label="Header Logo"
                          validateOnBlur validate={e => this.validateProperty('logo', e)}
                        />
                        <PreviewImage
                          src={formState.values.logo}
                          sizes={[["sm", "Tables"], ["md", "Logo"], ["lg", "Login"]]}
                        />
                      </Col>
                      <Col sm={12} md={1}>(OR)</Col>
                      <Col sm={12} md={4}>
                        <Input
                          field="headerImage" type="file" label="Image" name="headerImage"
                          onChange={(e) => this.handleChange("logo", e)}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12} md={6}>
                        <Input
                          field="icon" label="Icon"
                          validateOnBlur validate={e => this.validateProperty('icon', e)}
                        />
                        <PreviewImage
                          src={formState.values.icon}
                          sizes={[["xs", "Icon/Browser tab"], ["sm", "Metadata"]]}
                        />
                      </Col>
                      <Col sm={12} md={1}>(OR)</Col>
                      <Col sm={12} md={4}>
                        <Input
                          field="iconImage" type="file" label="Image" name="iconImage"
                          onChange={(e) => this.handleChange("icon", e)}
                        />
                      </Col>
                    </Row>
                  </section>

                  <section>
                    <h6>Additional Details</h6>
                    <Row>
                      <Col sm={12} md={12}>
                        <Textarea
                          field="rules" label="Rules" rows={10}
                          validateOnBlur validate={e => this.validateProperty('rules', e)}
                        />
                      </Col>
                    </Row>
                  </section>
                  <div className="text-right">
                    <button type="submit" disabled={formState.invalid} className="btn btn-primary btn-sm">Submit</button>
                  </div>

                </div>
              )}
            </Form>
          </Fragment>
        }
      </div>

    );
  }
}

export default ClientEdit;


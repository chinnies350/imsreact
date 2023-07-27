import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, } from 'reactstrap';
import { Form } from 'informed';
import Joi from 'joi-browser';
import { rightsData } from 'services/rolesService';

import List from './list';
import { getCircularList } from 'services/circularService';
import ToastService from 'services/toastService';
import { getselectData } from 'services/userService';
import { CustomSelect } from 'components/common/forms';

import _ from 'lodash';

import {subDirectory} from '../../config.json'

export default class CircularDataList extends React.Component {
  state = {
    data: { client: '', entity: '', branch: "" },
    isPageLoading: false,
    isLoading: false,
    type: '',
    client: '',
    entity: '',
    department: '',
    branch: '',
    batch: '',
    clientIds: [], entityIds: [], branchIds: [], departmentIds: [], batchIds: [],
    isClient: true, isEntity: true, isBranch: true, isDepartment: true, isBatch: true,
    isTableLoading: true,
  }

  async componentDidMount() {
    const { session } = this.props;
    await this.init(this.props, true)   
    await this.selectoptGet(`clients`, "clientIds")
    await this.rightsData(session);
    await this.feildCheck();
    
  }

  async componentWillReceiveProps(props) {
    await this.init(props, false)
  }

  async init(props, isPageLoading = false) {
    const { location: { state } } = props.props;
    await this.setState({ data: state || {} });
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
    departmentId: Joi.string().required().label("Department"),
    batchId: Joi.string().required(),
    examName: Joi.string().required()
  };

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
            await this.setState({ data, isClient: false, isEntity: false, isBranch: false })
            await this.clientDatas('client');
            await this.clientDatas('entity');
            await this.clientDatas('branch');
            await this.formApi.setValues(data);           
            break;
    }
}
  renderForm(formType, data) {
    return <List form={formType} data={data} props={this.props} refreshTable={this.onSubmit} />
  }

  handleChange = async ({ currentTarget: Input }) => {   
    const { name, value } = Input;
    const { data } = this.state;
    data[name] = value;
    await this.setState({ [name]: value })
    await this.clientDatas(name);
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
        await this.setState({ departmentId: "", batch: "", })
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
      ToastService.Toast(`${type} Data Not Found!!!`, "default")
    }
  }
  setFormApi = (formApi) => {
    this.formApi = formApi
}
  onSubmit = async () => {
    this.tableHide()
    const { notificationtype } = this.props.props.match.params    
    switch (notificationtype) {
      case 'circular':
        return this.getCircularList()
      default:
        return
    }
  }

  getCircularList = async () => {   
    const { data: { client, entity, branch, department, batch } } = this.state
    let params = `client=${client}&entity=${entity}&branch=${branch}&department=${department}&batch=${batch}`       
    try {
      const res = await getCircularList(params);
      console.log(res,params)
      if (res.data.statusCode === 1) {
        let data = res.data.data             
        await this.setState({
          tableData: data,
          isTableLoading: false
        })
      } else if (res.data.statusCode === 0) {
        await this.setState({
          tableData: [],
          isTableLoading: false
        })
      }
    } catch (err) {
      this.handleError(err)
    }
  }

  handleError(...err) {
    return ToastService.Toast("Something went wrong.Please try again later", "default");
  }

  tableHide() {
    this.setState({ isTableLoading: true })
  }

  addNavigation(form) {
    return <NavLink className="btn btn-primary btn-sm" to={`${subDirectory}/notification/add/circular`}>+ Circular </NavLink>
  }

  render() {
    const { notificationtype } = this.props.props.match.params
    const { clientIds, entityIds, branchIds, departmentIds, batchIds, tableData, isTableLoading , isClient, isEntity, isBranch,isDepartment,isBatch,rightsData} = this.state;

    return (
      <Fragment>
        <Container fluid>
          <div style={{ textAlign: "right" }}>
            {this.addNavigation()}
          </div>
         
          <Form getApi={this.setFormApi} onSubmit={this.onSubmit} >
            {({ formApi, formState }) => (
              <div>
                <section>
                  <Row>
                  {isClient && <Col sm={6} md={3}>
                      {/* Client as Group */}
                      <CustomSelect field="client" label="Group*" name="client" getOptionValue={option => option.code} getOptionLabel={option => option.name} validateOnBlur validate={e => this.validateProperty('client', e)} onChange={this.handleChange} options={clientIds} />
                    </Col>
                  }
                    {isEntity &&  <Col sm={6} md={3}>
                        {/* Entity as Institution */}
                      <CustomSelect field="entity" label="Institution*" name="entity" getOptionValue={option => option.code} getOptionLabel={option => option.name} validateOnBlur validate={e => this.validateProperty('entity', e)} onChange={this.handleChange} options={entityIds} />
                    </Col>}
                    {isBranch &&  <Col sm={6} md={3}>
                      <CustomSelect field="branch" label="Branch*" name="branch" getOptionValue={option => option.code} getOptionLabel={option => option.name} validateOnBlur validate={e => this.validateProperty('branch', e)} onChange={this.handleChange} options={branchIds} />
                    </Col>}
                    {isDepartment && <Col sm={12} md={3}>
                      <CustomSelect field="department" label="Department*" name="department" getOptionValue={option => option.code}
                        getOptionLabel={option => option.name} options={departmentIds}
                        validateOnBlur validate={e => this.validateProperty('departmentId', e)} onChange={this.handleChange} />
                    </Col>}
                    {isBatch &&  <Col sm={6} md={3}>
                      <CustomSelect field="batch" label="Batch*" getOptionValue={option => option.code} getOptionLabel={option => option.name} validateOnBlur validate={e => this.validateProperty('batchId', e)} onChange={this.handleChange} options={batchIds} />
                    </Col>}
                  </Row>
                </section>
                <div className="text-right">
                  <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                </div>
              </div>
            )}
          </Form>
        </Container>
        <br />
        <Container fluid>
          {!isTableLoading &&
            this.renderForm(notificationtype, tableData)
          }
        </Container>
      </Fragment>
    );
  }
}
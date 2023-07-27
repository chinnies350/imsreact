import React, { Fragment } from "react";
import ToastService from "services/toastService";
import Static from "services/static";
import { CustomSelect } from "components/common/forms";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Form } from "informed";
import { getselectData } from "services/userService";
import Joi from "joi-browser";
import _ from "lodash";

import Header from "components/common/header";
import Loading from "components/common/loading";
import SideNav from "components/common/sideNav";
import List from "./list";
import { getGradeList, getScholastics, getSkills, getSubjectWeight } from "services/gradeService";
import { rightsData } from "services/rolesService";

import { subDirectory } from "../../config.json";

var classNames = require("classnames");

export default class GradeList extends React.Component {
  state = {
    data: {},
    isPageLoading: false,
    isLoading: false,
    type: "",
    client: "",
    entity: "",
    departmentId: "",
    department: "",
    branch: "",
    batch: "",
    uid: "",
    clientIds: [],
    entityIds: [],
    branchIds: [],
    departmentIds: [],
    batchIds: [],
    isTableLoading: true,
    isClient: true,
    isEntity: true,
    isBranch: true,
    isDepartment: true,
    isBatch: true,
  };

  async componentWillMount() {
    await this.props.isPageLoadingTrue();
  }
  async componentDidMount() {
    const { session } = this.props;
    console.log(this.props);
    await this.rightsData(session);
    await this.init(this.props, true);
    await this.selectoptGet(`clients`, "clientIds");
    await this.feildCheck();
    await this.props.isPageLoadingFalse();
    console.log(this.props);
    if (this.props.session.data.department) {
      console.log("department", this.props.session.data.department);
      await this.setState({
        departmentId: this.props.session.data.department,
      });
    }
    if (this.props.location.state) {
      console.log("propssssssssssssss");
      await this.setState({
        departmentId: this.props.location.state.departmentId,
      });
    }
  }

  async componentWillReceiveProps(props) {
    await this.init(props, false);
  }
  componentWillUpdate = async (prevProps) => {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      await this.redirectTo();
    }
  };

  rightsData = async (session) => {
    let res = await rightsData("institutionmasters", session);
    let excludeModules = [];
    await _.map(_.keys(res), async (v) => {
      await _.map(_.keys(res[v]), (k) => {
        if (res[v][k]["value"]) return excludeModules.push(_.lowerFirst(v));
      });
    });
    excludeModules = await _.uniq(excludeModules);
    await this.setState({ excludeModules, rightsData: res || {} });
  };

  feildCheck = async () => {
    const { listType } = this.props.match.params;
    let {
      session: { data: sessionData },
    } = this.props;
    const { data } = this.state;
    console.log(this.state);
    const { userType, userLevel, client, entity, branch, department, batch, code, branchId, departmentId, batchId } = sessionData;
    console.log(sessionData);
    let switchType = "";
    if (userType === "staff") switchType = userLevel;
    else switchType = userType;
    console.log("userlevel", switchType);
    switch (switchType) {
      case "sadmin":
        break;
      case "client":
        data["client"] = client;
        await this.setState({ data, isClient: false });
        await this.clientDatas("client");
        await this.formApi.setValues(data);
        break;
      case "entity":
      case "branch":
        data["client"] = client || code;
        data["entity"] = entity || code;
        data["branch"] = branch || branchId;
        console.log(data);
        await this.setState({ data, isClient: false, isEntity: false, isBranch: false });
        await this.clientDatas("client");
        await this.clientDatas("entity");
        await this.clientDatas("branch");
        await this.formApi.setValues(data);
        if (listType !== "subjectweightagelist") await this.onSubmit();
        break;
      case "department":
        // !case "student":
        data["client"] = client || code;
        data["entity"] = entity || code;
        data["branch"] = branch || branchId;
        data["department"] = department || departmentId;
        await this.setState({ data, isClient: false, isEntity: false, isBranch: false, isDepartment: false });
        await this.clientDatas("client");
        await this.clientDatas("entity");
        await this.clientDatas("branch");
        await this.clientDatas("department");
        await this.clientDatas("departmentId");
        await this.formApi.setValues(data);
        console.log(data);
        await this.onSubmit();
        break;
      default:
        data["client"] = client || code;
        data["entity"] = entity || code;
        data["branch"] = branch || branchId;
        data["department"] = department || departmentId;
        data["batch"] = batch || batchId;
        await this.setState({ data, isClient: false, isEntity: false, isBranch: false, isDepartment: false, isBatch: false });
        await this.formApi.setValues(data);
        await this.onSubmit();
        break;
    }
  };

  setFormApi = (formApi) => {
    this.formApi = formApi;
  };

  addNavigation() {
    const {
      match: {
        params: { listType: form },
      },
    } = this.props;
    console.log(this.props);
    switch (form) {
      case "grade":
        return (
          <NavLink className="btn btn-primary btn-sm" to={`${subDirectory}/grade/add/gradeform`}>
            + Add Grade
          </NavLink>
        );
      case "assessmentWeightage":
        return (
          <NavLink className="btn btn-primary btn-sm" to={`${subDirectory}/grade/add/assessmentweightage`}>
            + Add Assessment Weightage
          </NavLink>
        );
      case "skills":
        return (
          <NavLink className="btn btn-primary btn-sm" to={`${subDirectory}/grade/add/skill`}>
            + Add CCE Skill
          </NavLink>
        );
      case "subjectWeightage":
        return (
          <NavLink className="btn btn-primary btn-sm" to={`${subDirectory}/grade/add/subjectweightage`}>
            + Add Subject Weight
          </NavLink>
        );
      default:
        return (
          <NavLink className="btn btn-primary btn-sm" to={`${subDirectory}/grade/add/gradeform`}>
            + Add Grade
          </NavLink>
        );
    }
  }

  async init(props, isPageLoading = false) {
    const {
      location: { state },
    } = props;
    await this.setState({ data: state || {} });
  }

  validateProperty = (name, value) => {
    const schema = Joi.reach(Joi.object(this.schema), name);
    const { error } = Joi.validate(value, schema);
    return error ? error.details[0].message : null;
  };

  schema = {
    client: Joi.string().required().label("Client"),
    entity: Joi.string().required().label("Entity"),
    branch: Joi.string().required().label("Branch"),
    departmentId: Joi.string().required().label("Department"),
  };

  renderGradeForm(formType, data) {
    const { rightsData } = this.state;
    console.log(data, this.state);
    return <List form={formType} data={data} props={this.props} refreshTable={this.onSubmit} rightsData={rightsData} />;
  }

  handleChange = async ({ currentTarget: Input }) => {
    const { name, value } = Input;
    const { data } = this.state;
    data[name] = value;
    this.setState({ [name]: value });

    this.clientDatas(name);
  };

  clientDatas = async (name) => {
    const { data } = this.state;

    switch (name) {
      case "client":
        await this.selectoptGet(`namelist?client=${data.client}&type=client`, "entityIds");
        await this.setState({ entity: "", branch: "", department: "", batch: "", branchIds: [], departmentIds: [], batchIds: [] });
        break;
      case "entity":
        await this.selectoptGet(`namelist?client=${data.client}&type=entity&entity=${data.entity}`, "branchIds");
        await this.setState({ branch: "", department: "", batch: "", departmentIds: [], batchIds: [] });
        break;
      case "branch":
        await this.selectoptGet(`namelist?client=${data.client}&type=branch&entity=${data.entity}&branch=${data.branch}`, "departmentIds");
        await this.setState({ departmentId: "", batch: "" });
        break;
      default:
        break;
    }
  };

  async selectoptGet(url, type) {
    const data = await getselectData(url);
    if (data.data.statusCode === 1) {
      const Datas = data.data.data;
      this.setState({ [type]: Datas });
    } else {
      ToastService.Toast(`${type} Data Not Found!!!`, "default");
    }
  }

  onSubmit = async () => {
    this.tableHide();
    const { listType } = this.props.match.params;
    switch (listType) {
      case "grade":
        return this.getGradeList();
      case "assessmentWeightage":
        return this.scholasticsList();
      case "skills":
        return this.getCCESkills();
      case "subjectWeightage":
        return this.getSubjectWeight();
      default:
        return;
    }
  };

  getGradeList = async () => {
    console.log(" grade list");
    const {
      data: { client, entity, branch },
    } = this.state;
    let params = `client=${client}&entity=${entity}&branch=${branch}`;
    try {
      const res = await getGradeList(params);
      console.log(res);
      if (res.data.statusCode === 1) {
        let data = res.data.data;

        await this.setState({
          tableData: data,
          isTableLoading: false,
        });
      } else if (res.data.statusCode === 0) {
        await this.setState({
          tableData: [],
          isTableLoading: false,
        });
      }
    } catch (err) {
      this.handleError(err);
    }
  };

  scholasticsList = async () => {
    const {
      data: { client, entity, branch },
    } = this.state;
    let params = `client=${client}&entity=${entity}&branch=${branch}`;

    try {
      const res = await getScholastics(params);
      if (res.data.statusCode === 1) {
        let data = res.data.data;

        await this.setState({
          tableData: data,
          isTableLoading: false,
        });
      } else if (res.data.statusCode === 0) {
        await this.setState({
          tableData: [],
          isTableLoading: false,
        });
      }
    } catch (err) {
      this.handleError(err);
    }
  };

  getCCESkills = async () => {
    console.log("skill");
    const {
      data: { client, entity, branch },
    } = this.state;
    let params = `client=${client}&entity=${entity}&branch=${branch}`;

    try {
      const res = await getSkills(params);
      if (res.data.statusCode === 1) {
        let data = res.data.data;
        console.log(data);

        await this.setState({
          tableData: data,
          isTableLoading: false,
        });
      } else if (res.data.statusCode === 0) {
        await this.setState({
          tableData: [],
          isTableLoading: false,
        });
      }
    } catch (err) {
      this.handleError(err);
    }
  };

  getSubjectWeight = async () => {
    console.log("Get Subject Weightage");

    // if (this.props.location.state) {
    //   console.log('propssssssssssssss')
    //    this.setState({

    //       departmentId: this.props.location.state.departmentId,

    //   })
    // }

    //  const { data: { client, entity, branch, departmentId } ,data} = this.state
    const {
      data: { client, entity, branch, departmentId, department, departmentIds, code },
      data,
    } = this.state;

    console.log(this.state);
    let params = `client=${client}&entity=${entity}&branch=${branch}&departmentId=${departmentId}`;
    // let params = `client=${client}&entity=${entity}&branch=${branch}&type=subject&departmentId=${departmentId}}`
    console.log(params);
    try {
      const res = await getSubjectWeight(params);
      console.log(res, params, data);

      if (res.data.statusCode === 1) {
        console.log("rrrrrrrrrrrrrrrrrr");
        let data = res.data.data;
        console.log(data);

        let tableData = [];

        // await _.map(data, async (v) => {
        //   console.log(' 8888888888888888888888888888')
        //   // await _.map(v.credits, s => {
        //     console.log(' 99999999999999999999999999999')
        //     v["client"] = v['client'];
        //     v["entity"] = v['entity'];
        //     v["branch"] = v['branch'];
        //     v["departmentId"] = v['departmentId'];
        //     tableData.push(v)
        //     console.log(v)
        //   // })
        // })

        await _.map(data, async (v) => {
          console.log(" 8888888888888888888888888888");
          await _.map(v.credits, (s) => {
            console.log(" 99999999999999999999999999999");
            s["client"] = v["client"];
            s["entity"] = v["entity"];
            s["branch"] = v["branch"];
            s["departmentId"] = v["departmentId"];
            tableData.push(s);
            console.log(s);
          });
        });

        await this.setState({
          tableData,
          isTableLoading: false,
        });
      } else if (res.data.statusCode === 0) {
        await this.setState({
          tableData: [],
          isTableLoading: false,
        });
      }
    } catch (err) {
      this.handleError(err);
    }
  };

  handleError(...err) {
    return ToastService.Toast("Somthig went wrong.Please try again later", "default");
  }

  tableHide() {
    this.setState({
      isTableLoading: true,
    });
  }
  redirectTo = async () => {
    await this.setState({ isTableLoading: true });
    await this.feildCheck();
    await this.formApi.reset();
  };
  render() {
    const { listType } = this.props.match.params;
    const { isPageLoading, isLoading, clientIds, entityIds, branchIds, departmentIds, tableData, isTableLoading, rightsData, excludeModules, isClient, isEntity, isBranch, isDepartment, departmentId } = this.state;
    console.log(this.state);
    let { keys: formTypeKeys, order: formTypeOrder } = Static.CCEOptions();
    const { session } = this.props;
    let _form = _.upperFirst(listType);
    if (_form === "AssessmentWeightage") _form = "Assessment Weightage";
    if (_form === "SubjectWeightage") _form = "Subject Weightage";

    console.log(_form);

    formTypeOrder = _.filter(formTypeOrder, (v) => _.includes(excludeModules, v));
    return (
      <div className="">
        {isPageLoading && <Loading />}
        {!isPageLoading && !isLoading && (
          <Fragment>
            <Breadcrumb>
              <BreadcrumbItem>
                <NavLink to={`${subDirectory}/dashboard`}>Dashboard</NavLink>
              </BreadcrumbItem>
              <BreadcrumbItem active> {listType} </BreadcrumbItem>
            </Breadcrumb>

            <Container fluid>
              {/* <div className="mb-4  subnav-div">
                      {formTypeOrder.map((form) =>
                        <NavLink key={form} to={{ pathname: `/grade/${form}`, query: this.props.location.query }} className={classNames('subnav')} activeClassName="subnav-active" exact={true} onClick={() => this.redirectTo()}>{formTypeKeys[form]['label']}</NavLink>
                      )}
                    </div> */}

              <div className="d-md-flex align-items-md-center justify-content-md-between maincontentheader">
                <h5 class="pg-title">{_form}</h5>
                <div>{rightsData && rightsData[_form] && rightsData[_form].create.value && this.addNavigation()}</div>
              </div>

              {/* {listType !== 'subjectweightagelist' && isBranch && */}
              {listType !== "subjectweightagelist" && isBranch && (
                <Form getApi={this.setFormApi} onSubmit={this.onSubmit}>
                  {({ formApi, formState }) => (
                    <div>
                      <section>
                        <Row>
                          {isClient && (
                            <Col sm={6} md={3}>
                              {/* Client as Group */}
                              <CustomSelect field="client" label="Group*" name="client" getOptionValue={(option) => option.code} getOptionLabel={(option) => option.name} validateOnBlur validate={(e) => this.validateProperty("client", e)} onChange={this.handleChange} options={clientIds} />
                            </Col>
                          )}
                          {isEntity && (
                            <Col sm={6} md={3}>
                              {/* Entity as Institution*/}
                              <CustomSelect field="entity" label="Institution*" name="entity" getOptionValue={(option) => option.code} getOptionLabel={(option) => option.name} validateOnBlur validate={(e) => this.validateProperty("entity", e)} onChange={this.handleChange} options={entityIds} />
                            </Col>
                          )}
                          {isBranch && (
                            <Col sm={6} md={3}>
                              <CustomSelect field="branch" label="Branch*" name="branch" getOptionValue={(option) => option.code} getOptionLabel={(option) => option.name} validateOnBlur validate={(e) => this.validateProperty("branch", e)} onChange={this.handleChange} options={branchIds} />
                            </Col>
                          )}
                          {/* //!listType === "subjectweightagelist" && isDepartment && ( */}
                          {listType === "subjectweightagelist" && isDepartment && (
                            <Col sm={12} md={3}>
                              <CustomSelect field="departmentId" label="Department" name="department" getOptionValue={(option) => option.code} getOptionLabel={(option) => option.name} options={departmentIds} validateOnBlur validate={(e) => this.validateProperty("departmentId", e)} onChange={this.handleChange} />
                            </Col>
                          )}
                        </Row>
                        <div className="text-right">
                          <button type="submit" className="btn btn-primary btn-sm">
                            Submit
                          </button>
                        </div>
                      </section>
                    </div>
                  )}
                </Form>
              )}
            </Container>

            <Container fluid>{!isTableLoading && rightsData && this.renderGradeForm(listType, tableData)}</Container>
          </Fragment>
        )}
      </div>
    );
  }
}

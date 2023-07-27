import _ from "lodash";
import React, { Component } from "react";
import update from "react-addons-update";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { deleteGrade, deleteScholastics, deleteSkill, deleteSubjectWeight, getSubjectWeight } from "services/gradeService";
import { Collapse } from "reactstrap";
import { NavLink } from "react-router-dom";
import XlsExport from "xlsexport";

import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Form } from "informed";
import Joi from "joi-browser";
import Static from "services/static";
import { CustomSelect } from "components/common/forms";
import { getSubjectsList } from "services/scheduleService";
import { getselectData } from "services/userService";

// import _ from 'lodash'

import { subDirectory } from "../../config.json";

import { rightsData } from "services/rolesService";

import ToastService from "services/toastService";

export default class GradeList extends Component {
  state = {
    data1: {},
    data: {
      client: "",
      entity: "",
      branch: "",
      department: "",
      batch: "",
      userType: "",
      department: " ",
      data: "",
    },
    credits: [],
    columns: [],
    columnHeaders: { keys: [], def: {} },
    hideColumns: [],
    sort: [],
    isPageLoading: true,
    isLoading: false,
    modal: false,
    success: [],
    selected: [],
    exportData: [],
    allKeys: [],
    toggleColumns: false,
    labels: {},
    isDepartment: true,
    listType: "",
    clientIds: [],
    entityIds: [],
    branchIds: [],
    departmentIds: [],
    batchIds: [],
  };

  constructor(props, context) {
    super(props, context);
    this.bulkModalToggle = this.bulkModalToggle.bind(this);
  }

  async componentDidMount() {
    const labels = this.getDefaultClientLabels();
    const { data, type, rightsData } = this.props;
    console.log(this.props, this.props.form);
    const { session } = this.props;
    await this.rightsData(session);
    await this.feildCheck();
    await this.initTableData();
    await this.setState({
      rightsData,
      data,
      type,
      labels,
      isPageLoading: false,
    });
  }

  feildCheck = async () => {
    let {
      session: { data: sessionData },
    } = this.props.props;
    const { data } = this.state;
    console.log(this.state);
    const { userType, userLevel, client, entity, branch, department, batch, code, branchId, departmentId, batchId } = sessionData;
    console.log(sessionData);
    let switchType = "";
    if (userType === "staff") switchType = userLevel;
    else switchType = userType;
    switch (switchType) {
      case "sadmin":
        break;
      case "client":
        data["client"] = client;
        console.log(data);
        await this.setState({ data1: data });
        console.log(data);
        await this.setState({ data, isClient: false });
        await this.clientDatas("client");
        // await this.formApi.setValues(data);
        break;
      case "entity":
      case "branch":
        data["client"] = client || code;
        data["entity"] = entity || code;
        data["branch"] = branch || branchId;
        data["department"] = department || departmentId;
        console.log(data);
        await this.setState({ data1: data });
        console.log(data);
        await this.setState({ data, isClient: false, isEntity: false, isBranch: false });
        await this.clientDatas("client");
        await this.clientDatas("entity");
        await this.clientDatas("branch");
        // await this.formApi.setValues(data);
        break;
      case "department":
      //!
      case "student":
      case "parent":
      case "batch":
        //!
        data["client"] = client || code;
        data["entity"] = entity || code;
        data["branch"] = branch || branchId;
        data["department"] = department || departmentId;
        console.log(data);
        await this.setState({ data1: data });
        console.log(data);
        await this.setState({ data, isClient: false, isEntity: false, isBranch: false, isDepartment: false });
        await this.clientDatas("client");
        await this.clientDatas("entity");
        await this.clientDatas("branch");
        await this.clientDatas("department");
        // await this.formApi.setValues(data);
        // await this.onSubmit();
        break;
      default:
        data["client"] = client || code;
        data["entity"] = entity || code;
        data["branch"] = branch || branchId;
        data["department"] = department || departmentId;
        data["batch"] = batch || batchId;
        await this.setState({ data, isClient: false, isEntity: false, isBranch: false, isDepartment: false, isBatch: false });
        // await this.formApi.setValues(data);
        break;
    }
  };

  getSampleData = async (data) => {
    await this.setState({ data });

    try {
      await this.clientDatas("client");
      await this.clientDatas("entity");
      await this.clientDatas("branch");

      await this.formApi.setValues(data);
    } catch (err) {
      this.handleError(err);
    }
  };

  clientDatas = async (name) => {
    const { data } = this.state;
    console.log(name, data);
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
      case "departmentId":
        await this.subjectList();
        await this.getSubjectWeight();
        break;
      default:
        break;
    }
  };

  async selectoptGet(url, type) {
    const data = await getselectData(url);
    console.log(url, type, data, "getselect options");
    if (data.data.statusCode === 1) {
      const Datas = data.data.data;
      this.setState({ [type]: Datas });
    } else {
      ToastService.Toast(`${type} Data Not Found!!!`, "default");
    }
  }

  handleChange = async ({ currentTarget: Input }) => {
    const { name, value } = Input;
    const { data } = this.state;
    console.log(this.state);
    data[name] = value;
    this.setState({ [name]: value });

    this.clientDatas(name);
  };

  initTableData = async () => {
    const { hideColumns } = this.state;
    const columnHeaders = this.getColumnHeaders(this.props.form, this.props.prefixUrl);
    const columns = this.getColumns("client", columnHeaders, hideColumns);
    await this.setState({ columns, columnHeaders, hideColumns });
  };

  isColumnVisible = (key) => {
    return !_.includes(this.state.hideColumns, key);
  };

  toggleColumn = async (i) => {
    this.setState({ isLoading: true });
    await this.setState((prevState) => {
      let hidden = prevState.columns[i] && prevState.columns[i]["hidden"] ? prevState.columns[i]["hidden"] : false;
      var index = this.state.hideColumns.indexOf(prevState.columns[i]["text"]);
      let hideColumns = this.state.hideColumns;
      if (!hidden) {
        hideColumns.push(prevState.columns[i]["text"]);
      } else {
        if (index !== -1) {
          hideColumns.splice(index, 1);
        }
      }

      return {
        columns: update(this.state.columns, { [i]: { hidden: { $set: !hidden } } }),
        hideColumns,
      };
    });
    this.setState({ isLoading: false });
  };

  handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      this.setState(() => ({
        selected: [...this.state.selected, row._id],
        exportData: [...this.state.exportData, row],
      }));
    } else {
      this.setState(() => ({
        selected: this.state.selected.filter((x) => x !== row._id),
        exportData: this.state.exportData.filter((x) => x !== row),
      }));
    }
  };

  handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map((r) => r._id);

    if (isSelect) {
      this.setState(() => ({
        selected: ids,
        exportData: rows,
      }));
    } else {
      this.setState(() => ({
        selected: [],
        exportData: [],
      }));
    }
  };

  renderButton(name, type, className, funcal) {
    return (
      <button type={type} className={className} onClick={funcal}>
        {name}
      </button>
    );
  }

  toggleColumns = () => {
    this.setState({ toggleColumns: !this.state.toggleColumns });
  };

  bulkModalToggle() {
    this.setState({
      modal: !this.state.modal,
      modalsize: "lg",
    });
  }

  async exceltable(format) {
    let d;
    const { exportData } = this.state;
    const { data } = this.props;
    if (format === "selecteduserxls") d = this.downloadxls(exportData);
    if (format === "alluserxls") d = this.downloadxls(data);
    var xls = new XlsExport(d);
    xls.exportToXLS("UserList.xls");
  }

  downloadxls(data) {
    let dataarr = [];
    if (data.length > 0) {
      for (let item of data) {
        let obj = {
          "User ID": item.uid,
          Password: item.password,
          "Email Id": item.email,
          "Mobile No": item.mobile,
          Title: item.title,
          Name: item.firstName + item.middleName + item.lastName,
          Gender: item.gender,
          DOB: item.dob,
          BloodGroup: item.bloodGroup,
          MotherTongue: item.motherTongue,
          Caste: item.caste,
          Religion: item.religion,
          "Aadhaar Number": item.aadharNo,
          Nationality: item.nationality,
          Role: item.type,
        };
        dataarr.push(obj);
      }
      return dataarr;
    } else {
      return dataarr;
    }
  }

  adduserNavigation() {
    const { form } = this.props;
    switch (form) {
      case "gradelist":
        return (
          <NavLink className="btn btn-primary btn-sm" to={`${subDirectory}/grade/add/gradeform`}>
            + Add Grade
          </NavLink>
        );
      case "assessmentweightagelist":
        return (
          <NavLink className="btn btn-primary btn-sm" to={`${subDirectory}/grade/add/assessmentweightage`}>
            + Add Assessment Weightage
          </NavLink>
        );
      case "skilllist":
        return (
          <NavLink className="btn btn-primary btn-sm" to={`${subDirectory}/grade/add/skill`}>
            + Add CCE Skill
          </NavLink>
        );
      case "subjectweightagelist":
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

  setFormApi = (formApi) => {
    console.log(" formapi");
    this.formApi = formApi;
    console.log(formApi);
  };

  previewClient = {
    renderer: (row) => (
      <div>
        <h6>{row.name}</h6>
        {row.address && <p>{row.address}</p>}
      </div>
    ),
  };

  getColumns(type, columnsHeaders, hideColumns) {
    let columns = [];
    const { keys, def } = columnsHeaders;

    _.forEach(keys, (key) => {
      columns.push({ ...def[key], hidden: _.includes(hideColumns, key) });
    });
    return columns;
  }

  getColumnHeaders(type, prefixUrl = "", dynamicLabels = {}) {
    // "offlineTime", "onlineTime",
    let allKeys = ["Client", "Entity", "Branch", "type", "marksRange", "grade", "gradePoints", "actions", "mode", "weightage", "sactions", "skill", "skillActionFormater", "subjectName", "creditPoint", "creditsAction"];
    let excludeKeys = [];

    switch (type) {
      case "grade":
        excludeKeys = ["Client", "Entity", "Branch", "mode", "weightage", "sactions", "skill", "skillActionFormater", "subjectName", "creditPoint", "creditsAction"];
        break;
      case "assessmentWeightage":
        excludeKeys = ["Client", "Entity", "Branch", "marksRange", "grade", "gradePoints", "actions", "skill", "skillActionFormater", "subjectName", "creditPoint", "creditsAction"];
        break;
      case "skills":
        excludeKeys = ["Client", "Entity", "Branch", "marksRange", "grade", "gradePoints", "actions", "mode", "weightage", "sactions", "subjectName", "creditPoint", "creditsAction"];
        break;
      case "subjectWeightage":
        excludeKeys = ["Client", "Entity", "Branch", "marksRange", "grade", "gradePoints", "actions", "mode", "weightage", "sactions", "type", "skill", "skillActionFormater"];
        break;
      default:
        excludeKeys = ["Client", "Entity", "Branch", "markFrom", "markTo"];
        break;
    }

    let keys = _.filter(allKeys, (v) => !_.includes(excludeKeys, v));
    {
      /* Client as Group and Entity as Institution */
    }
    let def = {
      sno: { dataField: "sno", isDummyField: true, text: "S.No", formatter: this.serialNumberFormatter },
      Client: {
        dataField: "client",
        text: `Group`,
        filter: this.getTextFilter(),
        sort: true,
      },
      Entity: { dataField: "entity", text: `Institution`, filter: this.getTextFilter(), sort: true },
      Branch: { dataField: "branch", text: `Branch`, filter: this.getTextFilter(), sort: true },

      grade: { dataField: "grade", text: `Grade`, filter: this.getTextFilter(), sort: true },

      gradePoints: { dataField: "gradePoints", text: `Grade Point`, filter: this.getTextFilter(), sort: true },
      marksRange: { dataField: "marksRange", text: `Mark Range`, formatter: this.markrangeFormater, filter: this.getTextFilter(), sort: true },
      // "markFrom": { dataField: 'marksRange[0].from', text: `Mark From`, filter: this.getTextFilter(), sort: true },
      // "markTo": { dataField: 'marksRange[0].to', text: `Mark To`, filter: this.getTextFilter(), sort: true },

      actions: { dataField: "actions", isDummyField: true, text: "Actions", formatter: this.actionFormater },

      // TODO: Scholastic
      type: { dataField: "type", text: `CCE Catagory Name`, filter: this.getTextFilter(), sort: true },
      mode: { dataField: "mode", text: `Assessment Name`, filter: this.getTextFilter(), sort: true },
      weightage: { dataField: "weightage", text: `Weightage`, filter: this.getTextFilter(), sort: true },
      sactions: { dataField: "actions", isDummyField: true, text: "Actions", formatter: this.sActionFormater },

      // TODO: Skill
      skill: { dataField: "assessmentArea", text: `Skill Name`, filter: this.getTextFilter(), sort: true },
      skillActionFormater: { dataField: "actions", isDummyField: true, text: "Actions", formatter: this.skillActionFormater },

      // TODO: Subject Weight

      // "subjectName": { dataField: 'displayName', text: `Subject Name`, filter: this.getTextFilter(), sort: true },
      // "creditPoint": { dataField: 'creditPoint', text: `Credit Point`, filter: this.getTextFilter(), sort: true },

      subjectName: { dataField: "displayName", text: `Subject Name`, filter: this.getTextFilter(), sort: true },
      creditPoint: { dataField: "creditPoint", text: `Credit Point`, filter: this.getTextFilter(), sort: true },
      creditsAction: { dataField: "actions", text: "Actions", isDummyField: true, formatter: this.creditActionFormater },
    };
    return { keys: keys, def: def };
  }

  getDefaultClientLabels() {
    return {};
  }

  serialNumberFormatter(cell, row, rowIndex, formatExtraData) {
    return rowIndex + 1;
  }
  onlinedateFormatter(cell, row, rowIndex, formatExtraData) {
    return row.from.date + "-" + row.to.date;
  }
  onlinetimeFormatter(cell, row, rowIndex, formatExtraData) {
    return row.from.time + "-" + row.to.time;
  }

  // function pictureurlFormatter(cell, row, rowIndex, formatExtraData) {
  //   return (
  //     <div className="clientpicture">
  //       <img src={row.pictureUrl} />

  //     </div>
  //   )
  // }

  // function clientNameFormatter(cell, row, rowIndex, formatExtraData) {
  //   return (
  //     <div className="clientName">
  //       <div className="icon" style={{ backgroundImage: `url(${row.icon})` }}></div>
  //       {cell}
  //     </div>
  //   )
  // }

  // function clientLinkFormatter(cell, row, rowIndex, formatExtraData) {
  //   let links = []
  //   let { type, prefixUrl } = formatExtraData;
  //
  //   prefixUrl = prefixUrl === "" ? row.id : prefixUrl;
  //   switch (type) {
  //     case "entity":
  //       links.push(<NavLink to={`/${prefixUrl}/entities`} className='badge badge-light'>{cell}</NavLink>)
  //       break;
  //     case "branch":
  //       links.push(<NavLink to={`/${prefixUrl}/branches`} className='badge badge-light'>{cell}</NavLink>)
  //       break;
  //     case "department":
  //       links.push(<NavLink to={`/${prefixUrl}/departments`} className='badge badge-light'>{cell}</NavLink>)
  //       break;
  //     case "batch":
  //       links.push(<NavLink to={`/${prefixUrl}/batches`} className='badge badge-light'>{cell}</NavLink>)
  //       break;
  //     default:
  //       links.push(cell)

  //   }
  //   return <div className="">{links.concat(" ")}</div>
  // }

  getTextFilter(type = "default") {
    return textFilter({
      placeholder: "",
      delay: 1000,
    });
  }

  handleError(...err) {
    console.log(err, "error");
    return ToastService.Toast("Somthig went wrong.Please try again later", "default");
  }

  markrangeFormater = (cell, row, rowIndex, formatExtraData) => {
    return `${cell[0]} - ${cell[1]}`;
  };

  actionFormater = (cell, row, rowIndex, formatExtraData) => {
    const { rightsData } = this.state;
    let _form = "Grade";
    let links = [];
    rightsData &&
      rightsData[_form] &&
      rightsData[_form].view.value &&
      links.push(
        <div onClick={() => this.editFun(`${subDirectory}/grade/view/gradeform`, row)} className="badge badge-success">
          View
        </div>
      );

    rightsData &&
      rightsData[_form] &&
      rightsData[_form].edit.value &&
      links.push(
        <div onClick={() => this.editFun(`${subDirectory}/grade/edit/gradeform`, row)} className="badge badge-warning">
          Edit
        </div>
      );
    rightsData &&
      rightsData[_form] &&
      rightsData[_form].delete.value &&
      links.push(
        <div onClick={() => this.gradeDelete(row)} className="badge badge-danger">
          Delete
        </div>
      );
    return <div className="actions">{links.concat(" ")}</div>;
  };

  sActionFormater = (cell, row, rowIndex, formatExtraData) => {
    console.log("assessment action");
    const { rightsData } = this.state;
    console.log(this.state);
    // let _form = "AssessmentWeightage";
    let _form = "Assessment Weightage";

    console.log(_form);
    let links = [];
    console.log(links);
    rightsData &&
      rightsData[_form] &&
      rightsData[_form].view.value &&
      links.push(
        <div onClick={() => this.editFun(`${subDirectory}/grade/view/assessmentweightage`, row)} className="badge badge-success">
          View
        </div>
      );
    console.log();
    rightsData &&
      rightsData[_form] &&
      rightsData[_form].edit.value &&
      links.push(
        <div onClick={() => this.editFun(`${subDirectory}/grade/edit/assessmentweightage`, row)} className="badge badge-warning">
          Edit
        </div>
      );
    rightsData &&
      rightsData[_form] &&
      rightsData[_form].delete.value &&
      links.push(
        <div onClick={() => this.scholasticsDelete(row)} className="badge badge-danger">
          Delete
        </div>
      );
    return <div className="actions">{links.concat(" ")}</div>;
  };

  skillActionFormater = (cell, row, rowIndex, formatExtraData) => {
    const { rightsData } = this.state;
    let _form = "Skills";
    let links = [];
    rightsData &&
      rightsData[_form] &&
      rightsData[_form].view.value &&
      links.push(
        <div onClick={() => this.editFun(`${subDirectory}/grade/view/skill`, row)} className="badge badge-success">
          View
        </div>
      );
    console.log(rightsData[_form]);
    rightsData &&
      rightsData[_form] &&
      rightsData[_form].edit.value &&
      links.push(
        <div onClick={() => this.editFun(`${subDirectory}/grade/edit/skill`, row)} className="badge badge-warning">
          Edit
        </div>
      );
    rightsData &&
      rightsData[_form] &&
      rightsData[_form].delete.value &&
      links.push(
        <div onClick={() => this.cceSkillDelete(row)} className="badge badge-danger">
          Delete
        </div>
      );
    return <div className="actions">{links.concat(" ")}</div>;
  };

  creditActionFormater = (cell, row, rowIndex, formatExtraData) => {
    console.log("subject weightage action");
    const { rightsData } = this.state;
    let _form = "Subject Weightage";

    // let _form = "SubjectWeightage";
    let links = [];
    console.log(rightsData, rightsData[_form]);
    rightsData &&
      rightsData[_form] &&
      rightsData[_form].view.value &&
      links.push(
        <div onClick={() => this.creditEdit(`${subDirectory}/grade/view/subjectweightage`, row)} className="badge badge-success">
          View
        </div>
      );

    rightsData &&
      rightsData[_form] &&
      rightsData[_form].edit.value &&
      links.push(
        <div onClick={() => this.creditEdit(`${subDirectory}/grade/edit/subjectweightage`, row)} className="badge badge-warning">
          Edit
        </div>
      );
    rightsData &&
      rightsData[_form] &&
      rightsData[_form].delete.value &&
      links.push(
        <div onClick={() => this.subjectWeightageDelete(row)} className="badge badge-danger">
          Delete
        </div>
      );
    return <div className="actions">{links.concat(" ")}</div>;
  };

  editFun = (url, row) => {
    row["isFromView"] = true;
    this.props.props.history.push({
      pathname: url,
      state: row,
    });
  };

  creditEdit = async (url, row) => {
    const { displayName, creditPoint, subject } = row;
    row["isFromView"] = true;
    let temp = [];
    await temp.push({ displayName, creditPoint, subject });
    row["credits"] = temp;

    this.props.props.history.push({
      pathname: url,
      state: row,
    });
  };

  gradeDelete = async (row) => {
    try {
      const { client, entity, branch, _id } = row;
      const { refreshTable } = this.props;
      let params = `client=${client}&entity=${entity}&branch=${branch}&gradeId=${_id}`;
      let res = await deleteGrade(params);

      const {
        data: { message, statusCode },
      } = res;

      if (statusCode === 1) {
        await ToastService.Toast("Deleted Successfully", "default");
        refreshTable();
        setTimeout(`location.href = '${subDirectory}/grade/grade';`);
      } else {
        return ToastService.Toast(message || "Somthig went wrong.Please try again later", "default");
      }
    } catch (err) {
      this.handleError(err);
    }
  };

  scholasticsDelete = async (row) => {
    try {
      const { client, entity, branch, _id } = row;
      const { refreshTable } = this.props;
      let params = `client=${client}&entity=${entity}&branch=${branch}&id=${_id}`;
      let res = await deleteScholastics(params);
      console.log(res, params);

      const {
        data: { statusCode },
      } = res;

      if (statusCode === 1) {
        await ToastService.Toast("Deleted Successfully", "default");
        refreshTable();
        setTimeout(`location.href = '${subDirectory}/grade/assessmentWeightage';`);
      } else {
        return ToastService.Toast("Somthig went wrong.Please try again later", "default");
      }
    } catch (err) {
      this.handleError(err);
    }
  };

  cceSkillDelete = async (row) => {
    // TODO:
    const { refreshTable } = this.props;
    try {
      const { client, entity, branch, _id } = row;
      let params = `client=${client}&entity=${entity}&branch=${branch}&id=${_id}`;
      let res = await deleteSkill(params);

      const {
        data: { statusCode },
      } = res;

      if (statusCode === 1) {
        await ToastService.Toast("Deleted Successfully", "default");
        refreshTable();
        setTimeout(`location.href = '${subDirectory}/grade/skills';`);
      } else {
        return ToastService.Toast("Somthig went wrong.Please try again later", "default");
      }
    } catch (err) {
      this.handleError(err);
    }
  };

  subjectWeightageDelete = async (row) => {
    console.log(" subject weightage delete");
    // TODO:
    const { refreshTable } = this.props;
    try {
      const { client, entity, branch, subject, departmentId } = row;
      console.log(row);
      let params = `client=${client}&entity=${entity}&branch=${branch}&departmentId=${departmentId}&subjectCode=${subject}`;
      let res = await deleteSubjectWeight(params);
      console.log(res, params);
      const {
        data: { statusCode },
      } = res;

      if (statusCode === 1) {
        await ToastService.Toast("Deleted Successfully", "default");
        refreshTable();
      } else {
        return ToastService.Toast("Somthig went wrong.Please try again later", "default");
      }
    } catch (err) {
      this.handleError(err);
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

  validateProperty = (name, value) => {
    const schema = Joi.reach(Joi.object(this.schema), name);
    const { error } = Joi.validate(value, schema);
    return error ? error.details[0].message : null;
  };

  schema = {
    departmentId: Joi.string().required().label("Department"),
    client: Joi.string().required().label("Client"),
    entity: Joi.string().required().label("Entity"),
    branch: Joi.string().required().label("Branch"),
  };

  subjectList = async () => {
    console.log("subjectweightage");
    try {
      const {
        data: { client, entity, branch, departmentId },
        data,
      } = this.state;
      const { data1 } = this.state;
      console.log(this.state);
      // let params = `client=${client}&entity=${entity}&branch=${branch}&type=subject&departmentId=${departmentId}`;
      let params = `client=${data1.client}&entity=${data1.entity}&branch=${data1.branch}&type=subject&departmentId=${departmentId}`;
      let res = await getSubjectsList(params);
      console.log(res, params);

      const {
        data: { message, statusCode },
      } = res;
      if (statusCode === 1) {
        let credits = [];
        await _.map(res.data.data, (v) => {
          credits.push({ displayName: v["displayName"], subject: v["code"], creditPoint: "" });
        });
        data["credits"] = credits;
        await this.setState({ data });
        await this.formApi.setValues(data);
      } else {
        return ToastService.Toast(message || "Somthig went wrong.Please try again later", "default");
      }
    } catch (err) {
      this.handleError(err);
    }
  };

  getSubjectWeight = async () => {
    console.log("Get Subject Weightage");

    const { data1, credits } = this.state;
    //  const { data: { client, entity, branch, departmentId } } = this.state
    const {
      data: { client, entity, branch, departmentId, departmentIds, code },
      data,
    } = this.state;

    console.log(this.state, this.props);
    let params = `client=${data1.client}&entity=${data1.entity}&branch=${data1.branch}&departmentId=${departmentId}`;
    // let params = `client=${client}&entity=${entity}&branch=${branch}&type=subject&departmentId=${departmentId}}`
    console.log(params);
    try {
      const res = await getSubjectWeight(params);
      console.log(res, params, data);

      if (res.data.statusCode === 1) {
        console.log("rrrrrrrrrrrrrrrrrr");
        let data = res.data.data;
        await this.setState({ data: data });
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
          const datas = [];
          console.log(" 8888888888888888888888888888");
          await _.map(v.credits, (s) => {
            console.log(" 99999999999999999999999999999");
            s["client"] = v["client"];
            s["entity"] = v["entity"];
            s["branch"] = v["branch"];
            s["departmentId"] = v["departmentId"];
            tableData.push(s);
            this.setState({ data: tableData, credits: s });
            console.log(s, data);
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

  render() {
    // const { isPageLoading, isLoading, data, columns, isDepartment} = this.state;
    const { data, credits, data1, columns } = this.state;

    const { listType } = this.state;
    let _form = _.upperFirst(listType);
    if (_form === "SubjectWeightage") _form = "Subject Weightage";

    console.log(_form);

    // const {listType} = this.props

    // const { listType } = this.props.match.params
    const { isPageLoading, isLoading, clientIds, entityIds, branchIds, departmentIds, tableData, isTableLoading, rightsData, excludeModules, isClient, isEntity, isBranch, isDepartment, departmentId } = this.state;
    console.log(this.state, this.props);

    const { form } = this.props;

    const options = {
      paginationSize: 4,
      pageStartIndex: 1,
      sizePerPage: 100,
      alwaysShowAllBtns: true,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true,
      firstPageText: "First",
      prePageText: "Back",
      nextPageText: "Next",
      lastPageText: "Last",
      nextPageTitle: "First page",
      prePageTitle: "Pre page",
      firstPageTitle: "Next page",
      lastPageTitle: "Last page",
      showTotal: true,
    };

    return (
      <React.Fragment>
        {!isPageLoading && (
          <React.Fragment>
            {/* <div className="d-md-flex align-items-md-center justify-content-md-between">
            <h6>{form}</h6>
            <div>
              <button className="btn btn-outline-info btn-sm" onClick={this.toggleColumns}>Columns</button> &nbsp; 
                {
                this.adduserNavigation()
              }
            </div>
          </div> */}

            {this.props.form === "subjectWeightage" && (
              <Container fluid>
                <Form getApi={this.setFormApi} onSubmit={this.onSubmit}>
                  {({ formApi, formState }) => (
                    <div>
                      <section>
                        <Row>
                          <Col sm={12} md={3}>
                            <CustomSelect field="departmentId" label="Department" name="department" getOptionValue={(option) => option.code} getOptionLabel={(option) => option.name} options={departmentIds} validateOnBlur validate={(e) => this.validateProperty("departmentId", e)} onChange={this.handleChange} />
                          </Col>
                        </Row>
                        {/* <div className="text-right">
                          <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                        </div> */}
                      </section>
                    </div>
                  )}
                </Form>
              </Container>
            )}

            <Collapse isOpen={this.state.toggleColumns}>
              <div className="alert alert-info alert-sm">
                <div className="d-flex align-items-center justify-content-between">
                  <h6>Show/Hide Columns </h6>
                  {/* <button className="btn btn-link btn-sm" onClick={this.initTableData}>Reset to default visible columns</button> */}
                </div>
                {/* {colKeys.map((k, i) => {
                if (excludeToggleFields.indexOf(k) > -1)
                  return

                return <div key={`toggle_${k}`} className="custom-control custom-control-inline col-6 col-md-2 custom-checkbox">
                  <input type="checkbox" className="custom-control-input" checked={this.isColumnVisible(k)}
                    onChange={(e) => this.toggleColumn(i)} id={`toggle_${k}`} />
                  <label className="custom-control-label" htmlFor={`toggle_${k}`}>{colDef[k]['desc'] ? colDef[k]['desc'] : colDef[k]['text']}</label>
                </div>
              })} */}
              </div>
            </Collapse>
            {!isLoading && (
              <div>
                <BootstrapTable
                  keyField="_id"
                  data={data}
                  // credits={credits}
                  columns={columns}
                  bootstrap4
                  classes="table table-bordered table-hover table-sm"
                  wrapperClasses="table-responsive"
                  filter={filterFactory()}
                  pagination={paginationFactory(options)}
                  noDataIndication={"No data to display here"}
                  // selectRow={selectRow}
                  // expandRow={this.previewClient}
                />
              </div>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

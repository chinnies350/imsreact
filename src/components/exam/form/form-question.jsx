import 'styles/App.scss';
import React, { Component, Fragment } from 'react';
import Joi from 'joi-browser';
import { Col, Row,  Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Form, Scope,  } from 'informed';
import { Input, Textarea, } from 'components/common/forms';
import { getsubjectname, getexamname, getAllSection, InsertQuestions, UpdateQuestions } from 'services/examService';
import { getselectData } from 'services/userService';
import ToastService from 'services/toastService';
import { Container,Modal, ModalBody, ModalHeader } from 'reactstrap';
import {subDirectory} from '../../../config.json'
import XLSX from 'xlsx';
import XlsExport from 'xlsexport';
import _ from 'lodash';

export default class QuestionForm extends Component {
  constructor(props) {

    super(props)
  this.state = {
    data: {
      type: "MCQ",
      questions: [],

    },
    isEditForm: false,
    modal: false,
    clientIds: [], entityIds: [], branchIds: [], departmentIds: [], batchIds: [], examname: [], subjectname: [], sectionLists: [],

  }
}

  async componentDidMount() {
    const { data } = this.state
 console.log(data)

    await this.formApi.setValues(data);
    const { actiontype,  } = this.props
    this.setState({ isEditForm: false });
    if (actiontype === 'edit')
      this.setState({ isEditForm: true });


    await this.setState({ formActionType: (actiontype === 'view') })

    const { location: { state } } = this.props.props;

    if (state !== undefined && state.isFromView)
      return this.getSampleData(state);
  }

  schema = {
    // client: Joi.string().required(),
    // entity: Joi.string().required(),
    // branch: Joi.string().required(),
    // department: Joi.string().required(),
    // batch: Joi.string().required(),
    // examname: Joi.string().required(),
    // subject: Joi.string().required(),
    // type: Joi.string().required(),
    noquestion: Joi.any().optional(),
    sectionId: Joi.string().required(),

    question: Joi.string().required(),
    answer: Joi.string().required(),
    optionA: Joi.string().required(),
    optionB: Joi.string().required(),
    optionC: Joi.any().optional(),
    optionD: Joi.any().optional(),

  }


  getSampleData = async (data) => {
 console.log(data)
 

    data['noquestion'] = parseInt(data.noquestion)
    data['sectionId'] = data._id;
await this.setState({details:data,NumberOfQuestions:data.noquestion})
console.log(this.state.NumberOfQuestions)
    await this.setState({ data });

    const { isEditForm } = this.state;
   

    try {
      // await this.clientDatas('client');
      // await this.clientDatas('entity');
      // await this.clientDatas('branch');
      // await this.clientDatas('department');

      await this.formApi.setValues(data);
      console.log(data)
      if (!isEditForm) await this.questionsArrForm();

    } catch (err) {
      this.handleError(err);
    }

  }

  handleChange = async ({ currentTarget: Input }) => {
    const { name, value } = Input;

    const { data } = this.state;
    data[name] = value;
    await this.setState({ [name]: value, data })
    await this.clientDatas(name)
  }

  clientDatas = async (name) => {
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
        await this.setState({ department: "", batch: "", departmentIds: [], batchIds: [] })
        break;
      case "department":
        this.selectoptGet(`namelist?client=${data.client}&type=department&entity=${data.entity}&branch=${data.branch}&department=${data.department}`, "batchIds")
        await this.setState({ batch: "", batchIds: [] })
        this.examnameget(`scheduleTypeId?client=${data.client}&entity=${data.entity}&branch=${data.branch}&type=exam`, "examname");
        break;
      case "batch":
        this.subjectnameget(`particularCourse?client=${data.client}&entity=${data.entity}&branch=${data.branch}&department=${data.department}&batch=${data.batch}&type=subject`, "subjectname")
        break;
      case "subjectId":
        this.sectionList();
        break;
      case "sectionId":
        await this.perticularSection();
        await this.questionsArrForm();
        break;
      default:
        break;
    }
  }


  async selectoptGet(url, type) {

    try {
      const data = await getselectData(url)
   
      if (data.data.statusCode === 1) {
        const Datas = data.data.data
        await this.setState({ [type]: Datas });
      }
    } catch (err) { this.handleError(err) }
  }

  async examnameget(url, type) {
   
    try {
      const data = await getexamname(url)
    
      if (data.data.statusCode === 1) {
        const Datas = data.data.data
        this.setState({ [type]: Datas });
      }
    } catch (err) {
      this.handleError(err)
    }
  }

  async subjectnameget(url, type) {
   
    try {
      const data = await getsubjectname(url)
    
      if (data.data.statusCode === 1) {
        const Datas = data.data.data
        this.setState({ [type]: Datas });
      }
    } catch (err) {
      this.handleError(err)
    }

  }

  sectionList = async () => {
    const { data: { client, entity, branch, department, batch, examId } } = this.state
    let params = `client=${client}&entity=${entity}&branch=${branch}&departmentId=${department}&examId=${examId}&batch=${batch}`
  
    try {
      const res = await getAllSection(params)
      if (res.data.statusCode === 1) {
        let sectionLists = res.data.data
       
        this.setState({ sectionLists })
      } else {
        ToastService.Toast(`No Data Found!!!`, "default")
      }
    } catch (err) {
      this.handleError(err)
    }
  }


  perticularSection = async () => {
    const { data: { client, entity, branch, department, batch, examId, sectionId }, data } = this.state
    let params = `client=${client}&entity=${entity}&branch=${branch}&departmentId=${department}&examId=${examId}&batch=${batch}&sectionId=${sectionId}`
    try {
      const res = await getAllSection(params)
     
      if (res.data.statusCode === 1) {
        let sectionList = res.data.data[0]

        data["noquestion"] = parseInt(sectionList.noquestion)
        data["type"] = sectionList.type
        await this.setState({ data })
      } else {
        ToastService.Toast(`No Data Found!!!`, "default")
      }
    } catch (err) {
      this.handleError(err)
    }
  }

  questionsArrForm = async () => {
    const { data: { noquestion, type }, data } = this.state
  
    let items = {
      question: '',
      answer: ''
    };
    if (type === 'MCQ') {
      items["optionA"] = ''
      items["optionB"] = ''
      items["optionC"] = ''
      items["optionD"] = ''
    }

    let temp = [];
    for (var i = 0; i < noquestion; i++)
      temp.push(items)


    data["questions"] = temp;

    await this.setState({ data });
    await this.formApi.setValues(this.state.data)
 
  }

  validateProperty = (name, value) => {
    const schema = Joi.reach(Joi.object(this.schema), name)
    const { error } = Joi.validate(value, schema);
    return error ? error.details[0].message : null;
  };


  setFormApi = (formApi) => {
    this.formApi = formApi;
  }
  bulkModalToggle() {
    this.setState({
      modal: !this.state.modal,
      modalsize: "lg",
    });
  }
  readFile = async (e) => {
    e.persist();
    this.setState({ payloadArray: [], payloadData: [], studentstaffHeaders: '' })
    if (e.target.files[0].size <= 2000000) {
      const rABS = true;
      const files = e.target.files;
      const f = files[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        var data = e.target.result;
        if (!rABS) data = new Uint8Array(data);
        //  const wb = XLSX.read(data, { type: rABS ? 'binary' : 'array',cellDates: true, dateNF: 'yyyy/mm/dd;@' })     
        const wb = XLSX.read(data, { type: rABS ? 'binary' : 'array', cellDates: true })
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        this.setState({
          studentstaffHeaders: data[0]
        })
        const datas = XLSX.utils.sheet_to_json(ws, { range: 1, header: this.state.studentstaffHeaders });
        console.log(datas)
        await this.setState({ ws: datas, file: f });
      };
      if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
    } else {
      // alert("File size can not exceed 2 MB");
      ToastService.Toast("File size can not exceed 2 MB","default");

    }
  }
  saveDetails(e) {
    if (this.state.ws) {
      if (this.state.ws.length === 0) return ToastService.Toast("You are uploading the empty file!", 'default');
      this.payloadData(this.state.ws);
    } else {
      return ToastService.Toast("Upload the  file!", 'default');
    }
  }
  
  async payloadData(data, values) {
       let BulkQuestionupload=[]
       let labels=[]
       let res
      console.log(data,"klkl",this.state.details,data.length,this.state.NumberOfQuestions)
      if(data.length===this.state.NumberOfQuestions)
      {
      await _.map(data).forEach(async (item) => {
      console.log(item)
      console.log(Object.keys(item))
      labels=Object.keys(item)
      let fieldNames=["question", "optionA", "optionB", "optionC", "optionD", "answer"]
      let ShortAnsFields=["question", "answer"]
      // let x=_.isEqual(labels,fieldNames)
      // console.log(x)
      // console.log(labels,labels===["question", "optionA", "optionB", "optionC", "optionD", "answer"])
      // console.log(labels[0]==="question")
     
      const { question, optionA, optionB, optionC, optionD,answer } = item;
     if((_.isEqual(labels,fieldNames))||(_.isEqual(labels,ShortAnsFields)))
     {
       console.log("checked")
      BulkQuestionupload.push({
        "question":question,
        "optionA":optionA,
        "optionB":optionB,
        "optionC":optionC,
        "optionD":optionD,
        "answer":answer
      })
      console.log(BulkQuestionupload)
     let data = this.state.details
       data["questions"]=BulkQuestionupload
       console.log(data)
       res = await InsertQuestions(data);
      console.log(res)
      if(res.data.statusCode === 1){
        return this.redirectTo();
      }
      else {
        return ToastService.Toast("Something went wrong.Please try again later", "default");
      }
    }
    else {
      return ToastService.Toast("Field Names does'nt match!Upload Proper file", "default");
    }
      })
    
    }
    else if(data.length!==this.state.NumberOfQuestions){
      return ToastService.Toast("Number of Questions does'nt match", "default");
    }
  
  }

  onSubmit = async () => {
    let data = this.formApi.getState().values
    const { isEditForm } = this.state
  
    var res = '';
    try {
      if (!isEditForm) {
     

        res = await InsertQuestions(data);
        console.log(res,data)
      } else {
      
        res = await UpdateQuestions(data);
      }
      const { data: { statusCode, message } } = res;
   
      if (statusCode === 1) {
        await ToastService.Toast(message, "default");
        return this.redirectTo();
      } else {
        return ToastService.Toast("Something went wrong.Please try again later", "default");
      }
    } catch (err) {
      this.handleError(err)
    }
   
  }

  redirectTo = async () => {
    const { isEditForm,  } = this.state;
   
    const { props } = this.props;
    if (isEditForm) {
      await props.history.goBack()
    } else {
      await props.history.goBack()
    }
  }

  handleError(...err) {
  
    return ToastService.Toast("Something went wrong.Please try again later", "default");
  }
  downloaddata = async () => {
const {ws}=this.state
    let dataarr = []
    if (ws && ws.length > 0) {
      for (let item of ws) {
        let obj = {
          "question": item.question, "optionA": item.optionA, "optionB": item.optionB, "optionC": item.optionC, "optionD": item.optionD,"answer":item.answer
        }
        console.log(obj)
        dataarr.push(obj)
      }
      var xls = new XlsExport(dataarr)
      xls.exportToXLS('Questions.xls')
    }
  }


  render() {
    const {  data: { type } } = this.state
    const { actiontype } = this.props

    return (
      <Fragment>
        <Breadcrumb>
          <BreadcrumbItem > <NavLink to={`${subDirectory}/exam/offlineExam`}>Exam</NavLink></BreadcrumbItem>
          <BreadcrumbItem active>{actiontype} Question</BreadcrumbItem>
        </Breadcrumb>
        <Row>
          <Col>
          <h6>{actiontype} Question - Exam</h6>
          </Col>
          <Col sm={12} md={6} style={{ textAlign: 'right' }}>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => this.bulkModalToggle()}>Bulk Upload</button> &nbsp;
									</Col>
        </Row>
       
       
        <Form getApi={this.setFormApi} onSubmit={this.onSubmit}>
          {({ formApi, formState }) => (
            <div>
 
              {/* <section>
                <Row>
                  <Col sm={12} md={3}>
                    <CustomSelect field="client" label="Client" name="client" getOptionValue={option => option.code}
                      getOptionLabel={option => option.name} options={clientIds}
                      validateOnBlur validate={e => this.validateProperty('client', e)} onChange={this.handleChange} />
                  </Col>
                  <Col sm={12} md={3}>
                    <CustomSelect field="entity" label="Entity" name="entity" getOptionValue={option => option.code}
                      getOptionLabel={option => option.name} options={entityIds}
                      validateOnBlur validate={e => this.validateProperty('entity', e)} onChange={this.handleChange} />
                  </Col>
                  <Col sm={12} md={3}>
                    <CustomSelect field="branch" label="Branch" name="branch" getOptionValue={option => option.code}
                      getOptionLabel={option => option.name} options={branchIds}
                      validateOnBlur validate={e => this.validateProperty('branch', e)} onChange={this.handleChange} />
                  </Col>
                  <Col sm={12} md={3}>
                    <CustomSelect field="department" label="Department" name="department" getOptionValue={option => option.code}
                      getOptionLabel={option => option.name} options={departmentIds}
                      validateOnBlur validate={e => this.validateProperty('department', e)} onChange={this.handleChange} />
                  </Col>
                  <Col sm={12} md={3}>
                    <CustomSelect field="batch" label="Batch" name="batch" getOptionValue={option => option.code}
                      getOptionLabel={option => option.name} options={batchIds}
                      validateOnBlur validate={e => this.validateProperty('batch', e)} onChange={this.handleChange} />
                  </Col>

                </Row>
              </section> */}

              {/* <section>
                <Row>
                  <Col sm={12} md={3}>
                    <CustomSelect field="examId" label="Exam Name*" name="examname" getOptionValue={option => option._id}
                      getOptionLabel={option => option.title} options={examname}
                      validateOnBlur validate={e => this.validateProperty('examname', e)} onChange={this.handleChange} />
                  </Col>
                  <Col sm={12} md={3}>
                    <CustomSelect field="subjectId" label="Subject*" name="subject" getOptionValue={option => option._id}
                      getOptionLabel={option => option.displayName} options={subjectname}
                      validateOnBlur validate={e => this.validateProperty('subject', e)} onChange={this.handleChange} />
                  </Col>
                  <Col sm={12} md={3}>
                    <CustomSelect field="sectionId" label="Section *" name="Section" getOptionValue={option => option._id}
                      getOptionLabel={option => option.name} options={sectionLists}
                      validateOnBlur validate={e => this.validateProperty('sectionId', e)} onChange={this.handleChange} />
                  </Col>
                  <Col sm={12} md={3}>
                    <Input
                      field="noquestion" label="No. of Questions" name="questions" readOnly
                      validateOnBlur validate={e => this.validateProperty('noquestion', e)}
                    />
                  </Col>
                  <Col sm={12} md={3}>
                    <Input
                      field="type" label="Type" name="type" readOnly
                      validateOnBlur validate={e => this.validateProperty('type', e)}
                    />
                  </Col>


                </Row>
              </section> */}
              <section>
                {formState.values.questions && formState.values.questions.map((question, i) =>
             
                  <Scope scope={`questions[${i}]`} key={i}>
                    <Row>

                      <Col sm={12} md={12}>
                        <Input
                          field="question" label={`Question ${i + 1}`} name="Question 1"
                          validateOnBlur validate={e => this.validateProperty('question', e)}
                        />
                      </Col>
                    </Row>
                    {
                      type === 'MCQ' ? <Row>
                        <Col sm={12} md={3}>
                          <Input
                            field="optionA" label="Option A" name="OptionA"
                            validateOnBlur validate={e => this.validateProperty('optionA', e)}
                          />
                        </Col>
                        <Col sm={12} md={3}>
                          <Input
                            field="optionB" label="Option B " name="OptionB"
                            validateOnBlur validate={e => this.validateProperty('optionB', e)}
                          />
                        </Col>
                        <Col sm={12} md={3}>
                          <Input
                            field="optionC" label="Option C" name="OptionC"
                            validateOnBlur validate={e => this.validateProperty('optionC', e)}
                          />
                        </Col>
                        <Col sm={12} md={3}>
                          <Input
                            field="optionD" label="Option D" name="OptionD"
                            validateOnBlur validate={e => this.validateProperty('optionD', e)}
                          />
                        </Col>
                      </Row>
                        : ''
                    }
                    <Row>
                      <Col sm={12} md={12}>
                        <Textarea
                          field="answer" label="answer" name="Answer"
                          validateOnBlur validate={e => this.validateProperty('answer', e)}
                        />
                      </Col>
                    </Row>
                    <hr></hr>
                  </Scope>
                )}
              </section>
              <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            </div>
          )}
        </Form>
        <Fragment>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size={this.state.modalsize}>
            <ModalHeader toggle={this.toggle}>Add Questions</ModalHeader>
            <ModalBody>
              <Container>
                <Form getApi={this.setFormApi} onSubmit={(e) => this.saveDetails(e)} >
                  {({ formApi, formState }) => (
                   
                    <div>
                       {console.log(formState)}
                      <section>
                       <p>Number of Questions:{this.state.NumberOfQuestions}</p>
                      </section>
                      <br />
                      <section>
                        <Col sm={6} md={6} >
                          <input id="upload" ref="upload" type="file" onChange={(event) => { this.readFile(event) }} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                        </Col>
                        <Row className="justify-content-end" >
                          <button type="button" className="btn btn-warning cancel" onClick={()=>this.setState({modal:false})} style={{ marginRight: '20px' }} >Cancel</button>
                          <button type="submit" className="btn btn-primary btn-sm"  onSubmit={(e) => this.saveDetails(e)} >Save</button>
                        </Row>
                      </section>
                      <section>
                        <h6>Download Format</h6>
                        <Row>
                          <Col sm={6} md={6} >
                            <div>
                              <p onClick={() => this.downloaddata()}>List of Questions</p>
                            </div><br />
                          </Col>
                        </Row>
                      </section>
                    </div>
                  )}
                </Form>
              </Container>
            </ModalBody>
          </Modal>
        </Fragment>
      </Fragment>
      
    );
  }
}




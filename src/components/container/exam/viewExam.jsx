import React, { Component } from 'react';
import * as FAIcons from 'react-icons/fa';
import { Container, Row, Col, FormGroup, Label, Input, Modal, ModalBody,ModalHeader, Form, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import SimpleReactValidator from 'simple-react-validator';

import TabsItem from 'components/common/tabItem';
import CustomCard from 'components/common/customCard';

import deleteIcon from './../../images/delete.svg';
import editIcon from './../../images/editer.png';
import './style.scss'

import {subDirectory} from '../../../config.json'

export default class ViewExam extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    this.state = {
      modal: false
    };


    this.options = {
      sizePerPage: 5,  // which size per page you want to locate as default
      sizePerPageList: [5, 10, 25, 50, 100],
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text  
      paginationPosition: 'bottom',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addsec = this.addsec.bind(this);
    this.toggle = this.toggle.bind(this);
  }





  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }


  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {

    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }



  addsec(cell, row) {
    return <a onClick={this.toggle}>Add Section</a>;
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      modalsize: "lg"
    });
  }


 
  render() {
    var products = [
      {
        sno: 1,
        examname: "Half Yearly",
        subjname: "DBMS",
        syllabus: "Unit - 3",
        date: "12-11-2018",
        time: "3 hours",

      }
    ];
    return (
      <div>
        <Container fluid>
          <br />
          <Row>
            <h6>Exam - View Exam</h6><br />

          </Row>

          <br />
          <Row>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaBook />} text="Add Exam" to={`${subDirectory}/main/add_exam`}/>
            </Col>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaRegFileAlt />} text="View Exam" active />
            </Col>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaRegWindowRestore />} text="View Section" to={`${subDirectory}/main/view_section`}/>
            </Col>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaRegListAlt />} text="View Question" to={`${subDirectory}/main/view_question`}/>
            </Col>
          </Row>
          <br />
          <CustomCard>


            <Row >
              <BootstrapTable data={products} striped hover bordered condensed options={this.options} pagination version='4' search={true} exportCSV={false} scrollTop={'Bottom'} >
                <TableHeaderColumn isKey dataSort dataField='sno' rowSpan='2'>S. No</TableHeaderColumn>
                <TableHeaderColumn rowSpan='2' dataField='examname' dataSort >Exam Name </TableHeaderColumn>
                <TableHeaderColumn rowSpan='2' dataField='subjname' dataSort >Subject Name </TableHeaderColumn>
                <TableHeaderColumn rowSpan='2' dataField='syllabus' dataSort >Syllabus </TableHeaderColumn>
                <TableHeaderColumn rowSpan='2' dataField='date' dataSort >Date </TableHeaderColumn>
                <TableHeaderColumn rowSpan='2' dataField='time' dataSort >Time </TableHeaderColumn>

                <TableHeaderColumn row='0' colSpan='2' dataField='price' dataAlign="center"  >Actions</TableHeaderColumn>
                <TableHeaderColumn row="1" colSpan='1' dataAlign="center" dataFormat={this.addsec} columnTitle="Add" tdStyle={{ color: '#0099ff', cursor: 'pointer', textDecorationLine: 'underline' }}  >Add Section</TableHeaderColumn>
                <TableHeaderColumn row="1" colSpan='1' dataAlign="center" columnTitle="Edit" dataFormat={editFormatter} >Edit</TableHeaderColumn>
                <TableHeaderColumn row="1" colSpan='1' dataAlign="center" columnTitle="Delete" dataFormat={buttonFormatter} >Delete</TableHeaderColumn>
              </BootstrapTable>
            </Row>
          </CustomCard>

        </Container>


        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size={this.state.modalsize}>
          <ModalHeader toggle={this.toggle}>Add Section</ModalHeader>
          <ModalBody>
            <Container>
              <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col sm="4">
                    <FormGroup>
                      <Label>Type</Label>
                      <Input type="select" name="testType"  >
                        <option>MCQ</option>
                        <option>Short Term</option>
                        <option>Long Term</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col sm="4">
                    <FormGroup>
                      <Label>No. of Section</Label>
                      <Input type="text" placeholder="No. of Sections" name="noofSections" onChange={this.handleChange} />
                      <span className="text-danger">
                        {this.validator.message('no of sections', this.state.noofSections, 'required')}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4">
                    <FormGroup>
                      <Label>Section Name</Label>
                      <Input type="select" name="sectionName" onChange={this.handleChange}  >
                        <option>Sec A</option>
                        <option>Sec B</option>
                        <option>Sec C</option>
                        <option>Sec D</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm="4">
                    <FormGroup>
                      <Label>Number of Question</Label>
                      <Input type="number" placeholder="Number of Questions" name="noofQestions" onChange={this.handleChange} />
                      <span className="text-danger">
                        {this.validator.message('no of questions', this.state.noofQestions, 'required')}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4">
                    <FormGroup>
                      <Label>Total Marks</Label>
                      <Input type="number" placeholder="Total Marks" name="totalMarks" onChange={this.handleChange} />
                      <span className="text-danger">
                        {this.validator.message('total marks', this.state.totalMarks, 'required')}
                      </span>
                    </FormGroup>
                  </Col>

                </Row>

                <Row>
                  <Col sm="12">
                    <FormGroup>
                      <Label>Section Instructions</Label>
                      <Input type="textarea" placeholder="Section Instructions" name="instructions" rows="4" />
                      <span className="text-danger">
                        {this.validator.message('section instructions', this.state.instructions, 'required')}
                      </span>
                    </FormGroup>
                  </Col>

                </Row>
                <Row className="justify-content-end">
                  <Button color="success" type="submit" style={{ marginRight: "10px" }}>Save</Button>
                  <Button color="primary" onClick={this.toggle}>Cancel</Button>
                </Row>

              </Form>
            </Container>
          </ModalBody>

        </Modal>
      </div>

    );
  }
}

function editFormatter(cell, row) {
  return `<img src="${editIcon}" class="img-responsive editbtn"/>`;
}
function buttonFormatter(cell, row) {
  return `<img src="${deleteIcon}" class="img-responsive deletebtn"/>`;
}

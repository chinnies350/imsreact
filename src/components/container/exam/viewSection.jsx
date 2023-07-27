import React, { Component } from 'react';
import * as FAIcons from 'react-icons/fa';
import { Container, Row, Col, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, Form, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import deleteIcon from './../../images/delete.svg';
import editIcon from './../../images/editer.png';
import TabsItem from 'components/common/tabItem';

import CustomCard from 'components/common/customCard';
import './style.scss'

import {subDirectory} from '../../../config.json'

export default class ViewSection extends Component {


  constructor(props) {
    super(props);



    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);

    this.options = {
      sizePerPage: 5,  // which size per page you want to locate as default
      sizePerPageList: [5, 10, 25, 50, 100],
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 1,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text  
      paginationPosition: 'bottom',
      onRowClick: this.toggle
    };

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
        type: "MCQ",
        sec: "3",
        secname: "Sec C",
        secinst: "True or False Questions",
        quest: "10",
        totalmark: "30",

      }
    ];
     
    return (
        <div>
          <Container fluid>
            <br />
            <Row>
              <h6>Exam - View Section</h6><br />

            </Row>

            <br/>

            <Row>
              <Col sm="3">
                  <TabsItem icon={<FAIcons.FaBook />} text="Add Exam" to={`${subDirectory}/main/add_exam`}/>
              </Col>
              <Col sm="3"> 
                <TabsItem icon={<FAIcons.FaRegFileAlt />} text="View Exam" to={`${subDirectory}/main/view_exam`}/>
              </Col>
              <Col sm="3">
                <TabsItem icon={<FAIcons.FaRegWindowRestore />} text="View Section" active/> 
              </Col>
              <Col sm="3">
                <TabsItem icon={<FAIcons.FaRegListAlt />} text="View Question" to={`${subDirectory}/main/view_question`}/> 
              </Col> 
            </Row>
            <br/> 

             <CustomCard>

<Row>
  <Col sm="3">
    <FormGroup>
      <Label>Type</Label>
      <select className="form-control">
        <option>LKG</option>
        <option>UKG</option>
        <option>UG</option>
        <option>PG</option>
      </select>
    </FormGroup>
  </Col>
</Row>

<br />
<Row >
  <BootstrapTable data={products} striped hover bordered condensed options={this.options} pagination version='4' search={true} exportCSV={false} scrollTop={'Bottom'} >
    <TableHeaderColumn isKey dataSort dataField='sno' rowSpan='2'>S. No</TableHeaderColumn>
    <TableHeaderColumn rowSpan='2' dataField='type' dataSort >Type </TableHeaderColumn>
    <TableHeaderColumn rowSpan='2' dataField='sec' dataSort >No.of Sections </TableHeaderColumn>
    <TableHeaderColumn rowSpan='2' dataField='secname' dataSort > Sec. Name </TableHeaderColumn>
    <TableHeaderColumn rowSpan='2' dataField='secinst' dataSort > Instruction </TableHeaderColumn>
    <TableHeaderColumn rowSpan='2' dataField='quest' dataSort >No.of Questions </TableHeaderColumn>
    <TableHeaderColumn rowSpan='2' dataField='totalmark' dataSort >Total Mark </TableHeaderColumn>

    <TableHeaderColumn row='0' colSpan='2' dataField='price' dataAlign="center"  >Actions</TableHeaderColumn>
    <TableHeaderColumn row="1" colSpan='1' dataAlign="center" dataFormat={addques} columnTitle="Add" tdStyle={{ color: '#0099ff', cursor: 'pointer', textDecorationLine: 'underline' }}  >Add Question</TableHeaderColumn>
    <TableHeaderColumn row="1" colSpan='1' dataAlign="center" columnTitle="Edit" dataFormat={editFormatter} >Edit</TableHeaderColumn>
    <TableHeaderColumn row="1" colSpan='1' dataAlign="center" columnTitle="Delete" dataFormat={buttonFormatter} >Delete</TableHeaderColumn>
  </BootstrapTable>
</Row>
</CustomCard>

</Container>


<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size={this.state.modalsize}>
<ModalHeader toggle={this.toggle}>Add Questions</ModalHeader>
<ModalBody>
<Container>
  <Form>
    <Row>
      <Col sm="12">
        <FormGroup>
            <Label>Question</Label>
            <Input type="text" placeholder="Enter Question" />
          </FormGroup>
      </Col> 
    </Row> 
    <br/>
    <Row>
      <Col sm="3">
        <FormGroup>
          <Label>Option A</Label>
          <Input type="text" placeholder="Enter Option A"  />
        </FormGroup>
      </Col> 
      <Col sm="3">
        <FormGroup>
          <Label>Option B</Label>
          <Input type="text" placeholder="Enter Option B"  />
        </FormGroup>

      </Col>
      <Col sm="3">
        <FormGroup>
          <Label>Option C</Label>
          <Input type="text" placeholder="Enter Option C"  />
        </FormGroup>
      </Col> 
      <Col sm="3">
        <FormGroup>
          <Label>Option D</Label>
          <Input type="text" placeholder="Enter Option D"  />
        </FormGroup>

      </Col>

    </Row>

    <Row>
      <Col sm="4">
        <FormGroup>
          <Label>Correct Answer</Label>
          <Input type="text" placeholder="Correct Answer B"  />
        </FormGroup>
      </Col>

    </Row>
  </Form>
</Container>
</ModalBody>
<ModalFooter>
<Button color="primary" onClick={this.toggle}>Save</Button>
<Button color="primary" onClick={this.toggle}>Cancel</Button>
</ModalFooter>
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
function addques(cell, row, enumObject, rowIndex) {
return <a href="#" onClick={this.toggle}>Add Questions</a>;
}

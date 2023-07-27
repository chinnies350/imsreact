import React, { Component } from 'react';
import * as FAIcons from 'react-icons/fa';
import { Container, Row, Col, FormGroup, Label} from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'; 
  

import deleteIcon from './../../images/delete.svg';
import editIcon from './../../images/editer.png';
import TabsItem from 'components/common/tabItem';

import CustomCard from 'components/common/customCard';
import './style.scss'

import {subDirectory} from '../../../config.json'

export default class ViewQuestion extends Component {

    constructor(props) {
        super(props);
    


        this.state = { 

        }; 

        this.options = {
          sizePerPage: 5,  // which size per page you want to locate as default
          sizePerPageList: [5, 10, 25, 50, 100],
          pageStartIndex: 1, // where to start counting the pages
          paginationSize: 1,  // the pagination bar size.
          prePage: 'Prev', // Previous page button text
          nextPage: 'Next', // Next page button text  
          paginationPosition: 'bottom',
        };
    
      }
   
 

 
    render() { 

      var products = [
        {
          sno: 1,
          question: "Question No 1",
          options: 'A, B, C, D', 
          answer: 'Option A'
        }
      ];
     
    return (
        <div>
          <Container fluid>
            <br />
            <Row>
              <h6>Exam - View Question</h6><br />

            </Row>

            <br/>

            <Row>
              <Col sm="3">
                  <TabsItem icon={<FAIcons.FaBook />} text="Add Exam" to={`${subDirectory}/main/add_exam`}/>
              </Col>
              <Col sm="3"> 
                <TabsItem icon={<FAIcons.FaRegFileAlt />} text="View Exam" to={`${subDirectory}/main/view_exam`} />
              </Col>
              <Col sm="3">
                <TabsItem icon={<FAIcons.FaRegWindowRestore />} text="View Section" to={`${subDirectory}/main/view_section`}/> 
              </Col>
              <Col sm="3">
                <TabsItem icon={<FAIcons.FaRegListAlt />} text="View Question" active /> 
              </Col> 
            </Row>

            <br/>

            <CustomCard>
 
                <Row>
                  <Col sm="3">
                    <FormGroup>
                      <Label>Question</Label>
                      <select className="form-control">
                        <option>Question 1</option>
                        <option>Question 2</option>
                        <option>Question 3</option>
                        <option>Question 4</option>
                      </select>
                    </FormGroup>
                  </Col>
                </Row>

                <br />
                <Row >
                  <BootstrapTable data={products} striped hover bordered condensed options={this.options} pagination version='4' search={true} exportCSV={false} scrollTop={'Bottom'} >
                    <TableHeaderColumn isKey dataSort dataField='sno' rowSpan='2'>S. No</TableHeaderColumn>
                    <TableHeaderColumn rowSpan='2' dataField='question' dataSort >Questions </TableHeaderColumn>
                    <TableHeaderColumn rowSpan='2' dataField='options' dataSort >Options </TableHeaderColumn>
                    <TableHeaderColumn rowSpan='2' dataField='answer' dataSort >Answer </TableHeaderColumn> 

                    <TableHeaderColumn row='0' colSpan='2' dataField='price' dataAlign="center"  >Actions</TableHeaderColumn> 
                    <TableHeaderColumn row="1" colSpan='1' dataAlign="center" columnTitle="Edit" dataFormat={editFormatter} >Edit</TableHeaderColumn>
                    <TableHeaderColumn row="1" colSpan='1' dataAlign="center" columnTitle="Delete" dataFormat={buttonFormatter} >Delete</TableHeaderColumn>
                  </BootstrapTable>
                </Row>

            </CustomCard>
  
          </Container>
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
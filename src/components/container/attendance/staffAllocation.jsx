import React, { Component } from 'react';
import * as FAIcons from 'react-icons/fa';
import { Container, Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import deleteIcon from './../../images/delete.svg';
import editIcon from './../../images/editer.png';

import TabsItem from 'components/common/tabItem';

import CustomCard from 'components/common/customCard';
import './style.scss'

import {subDirectory} from '../../../config.json'

export default class StaffAllocation extends Component {

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
        staffname: "Divya",
        department: "B.Tech - IT",
        batch: "1st Year",
        subject: "DBMS",
        time: "10:30 - 12:30"

      }
    ];


    return (
      <div>
        <Container fluid>
          <br />
          <Row>
            <h6>Attendance</h6><br />

          </Row>

          <br />

          <Row>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaBook />} text="Add Attendance" to={`${subDirectory}/main/add_attendance`} />
            </Col>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaFileAlt />} text="View Attendance" to={`${subDirectory}/main/view_attendance`} />
            </Col>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaUmbrellaBeach />} text="Add Holidays" to={`${subDirectory}/main/add_holidays`} />
            </Col>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaClipboardList />} text="Staff Allocation"  active={true} to={`${subDirectory}/main/staff_allocation`} />
            </Col>
          </Row>
          <br />

          <CustomCard>
            <Row >
              <BootstrapTable data={products} striped hover bordered condensed options={this.options} pagination version='4' search={true} exportCSV={false} scrollTop={'Bottom'} >
                <TableHeaderColumn isKey dataSort dataField='sno' rowSpan='2'>S. No</TableHeaderColumn>
                <TableHeaderColumn rowSpan='2' dataField='staffname' dataSort >Staff Name </TableHeaderColumn>
                <TableHeaderColumn rowSpan='2' dataField='department' dataSort >Department </TableHeaderColumn>
                <TableHeaderColumn rowSpan='2' dataField='batch' dataSort >Batch </TableHeaderColumn>
                <TableHeaderColumn rowSpan='2' dataField='subject' dataSort >Subject </TableHeaderColumn>
                <TableHeaderColumn rowSpan='2' dataField='time' dataSort >Time </TableHeaderColumn>

                <TableHeaderColumn row='0' colSpan='2' dataField='price' dataAlign="center" >Actions</TableHeaderColumn>
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

import React, { Component } from 'react';
import * as FAIcons from 'react-icons/fa';
import { Container, Row, Col, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, Button, Table } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
 

import TabsItem from 'components/common/tabItem';

import CustomCard from 'components/common/customCard';
import './style.scss'

export default class AddRoles extends Component {

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
        name: "Divya",
        modules: "Schedule, Exam",
        rights: "Edit, View, Delete",

      },
      {
        sno: 2,
        name: "Bernet", 
        modules: "Events, Exam",
        rights: "Edit, View, Delete",


      },
      {
        sno: 3,
        name: "Lisa",
        modules: "Schedule, User",
        rights: "Edit, View, Delete",
 

      },
      {
        sno: 4,
        name: "Chirstina", 
        modules: "User, Exam",
        rights: "Edit, View, Delete",


      },
      {
        sno: 5,
        name: "Marry", 
        modules: "Attendance, User",
        rights: "Edit, View, Delete",


      },
      {
        sno: 6,
        name: "Easther", 
        modules: "Events, Schedule",
        rights: "Edit, View, Delete",


      }
    ];

    const selectrow = {
      mode: 'checkbox'
    }


    return (
      <div>
        <Container fluid>
          <br />
          <Row>
            <h6>Roles - Add Roles</h6><br />

          </Row>

          <br />
          <Row>
            <Col sm="2">
              <TabsItem icon={<FAIcons.FaListAlt />} text="Add Roles" active  />
            </Col> 
          </Row>

          <br />

          <CustomCard> 

            <Row >
              <BootstrapTable data={products} striped hover bordered condensed options={this.options} pagination version='4' search={true} exportCSV={false} scrollTop={'Bottom'} selectRow={selectrow}>
                <TableHeaderColumn isKey dataSort dataField='sno' rowSpan='2'>S. No</TableHeaderColumn>
                <TableHeaderColumn rowSpan='2' dataField='name' dataSort > Name </TableHeaderColumn>
                <TableHeaderColumn rowSpan='2' dataField='modules' dataSort > Modules </TableHeaderColumn>
                <TableHeaderColumn rowSpan='2' dataField='rights' dataSort > Rights </TableHeaderColumn> 

                <TableHeaderColumn row='0' colSpan='2' dataField='price' dataAlign="center"  >Actions</TableHeaderColumn>
                <TableHeaderColumn row="1" colSpan='1' dataAlign="center" dataFormat={addsec} columnTitle="Add" tdStyle={{ color: '#4caf50', cursor: 'pointer' }}  >Active</TableHeaderColumn>
                <TableHeaderColumn row="1" colSpan='1' dataAlign="center" dataFormat={deletesec} columnTitle="Delete" tdStyle={{ color: '#e53935', cursor: 'pointer'}}  >Delete</TableHeaderColumn>
                <TableHeaderColumn row="1" colSpan='1' dataAlign="center" dataFormat={deactivesec} columnTitle="Deactive" tdStyle={{ color: '#ffc107', cursor: 'pointer'}}  >Deactive</TableHeaderColumn>
              </BootstrapTable>
            </Row>

            <br/>

            <Row className="justify-content-end"> 
              
                  <Button color="primary" onClick={this.toggle} >Add New User Role</Button> 

            </Row>
          </CustomCard> 

        </Container>


        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size={this.state.modalsize}>
          <ModalHeader toggle={this.toggle}>Add Roles</ModalHeader>
          <ModalBody>
            <Container> 
                <Row>
                  <Col sm="4">
                    <FormGroup>
                      <Label>Name</Label>
                      <Input type="text" placeholder="Enter Name"  />
                    </FormGroup>
                  </Col>   
                </Row>
                <br/>
                <Row >
                  <Table bordered striped hover responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Edit</th>
                        <th>View</th>
                        <th>Create</th>
                        <th>Delete</th>  
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Schedule</th>
                        <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                        <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                        <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                        <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                      </tr>
                      <tr>
                      <th scope="row">Exam</th>
                        
                      <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                        <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                        <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                        <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                      </tr>
                      <tr>
                      <th scope="row">Events</th>
                      <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                        <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                        <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                        <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                      </tr>
                      <tr>
                      <th scope="row">Attendance</th>
                      <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                        <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                        <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                        <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                      </tr>
                      <tr>
                      <th scope="row">User</th>
                      <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                        <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                        <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                        <td><Input type="checkbox" className="tablecheckbox"></Input></td>
                      </tr>
                    </tbody>
                  </Table>
                </Row> 
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

 
function addsec(cell, row, enumObject, rowIndex) {
  return <p>Active</p>;
}
function deletesec(cell, row, enumObject, rowIndex) {
  return <p>Delete</p>;
}
function deactivesec(cell, row, enumObject, rowIndex) {
  return <p>Deactive</p>;
}

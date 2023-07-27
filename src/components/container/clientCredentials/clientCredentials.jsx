import React, { Component } from 'react';
import { Col, Container } from 'reactstrap';

import RestService from 'services/restService';
import logo from './../../images/preview.png';

import Input from "components/common/input";
import Button from "components/common/button";
import './style.scss';

export default class ClientCrdentials extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      errors: {},
      isNewClient: false,
      isRowEdit: false,
      instituteName: '',
      instituteCode: '',
      username: '',
      password: '',
      InstituemailId: '',
      btnName: 'Create',
      clientsDetails: []
    };

  }

  componentWillMount() {

  }



  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    // const errorMessage = this.validateProperty(input);
    // if (errorMessage) errors[input.name] = errorMessage;
    // else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors }, () => {
    });
  };



  createClient() {
    RestService.createClient(this.state.data, (res) => {
     
    });
  }

  cancel() {
  
  }
  renderInput(name, label, type, accept) {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        id={name}
        value={data[name]}
        label={label}
        accept={accept}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderButton(name, type, className, funcal) {

    return (
      <Button
        value={name}
        type={type}
        className={className}
        onClick={funcal}
      />
    );
  }

  render() {
    this.options = {
      sizePerPage: 5,  // which size per page you want to locate as default
      sizePerPageList: [5, 10, 25, 50, 100],
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 1,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text  
      paginationPosition: 'bottom',
    };

    return (
      <Container fluid>
        <br></br>

        <Col sm="12" >
          <div className="flexdiv d-flex align-items-center flex-column justify-content-center">
            <div className="d-flex align-items-center flex-column justify-content-center bg-white customdiv">
              <img src={logo} className="logostyle" alt="Loading ..." />
              <div style={{ width: "100%" }}>
                {this.renderInput("instituteName", "Institution Name", "text", "")}
                {this.renderInput("instituteCode", "Institution Code", "text", "")}
                {this.renderInput("emailId", "Institution MailId", "email", "")}
                {this.renderInput("uid", "UserId", "text", "")}
                {this.renderInput("password", "Password", "password", "")}
                <div style={{ display: "flex" }} >
                  <div style={{ flex: 1 }}>
                    {this.renderButton("Cancel", "button", "btn btn-warning", () => { this.cancel() })}
                  </div>
                  <div style={{ flex: 1, marginLeft: "201px" }}>
                    {this.renderButton("Create", "submit", "btn btn-primary", () => { this.createClient() })}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Col>


        {/* {
          !this.state.isNewClient ? <div>
            <Row>
              <Col sm="12" >
                <h6>
                  Client Credentials
           </h6>
              </Col>
            </Row>
            <CustomCard>
              <Row>
                <Col sm="12">
                  <div>

                    {this.renderButton("Add Client", "btn btn-primary")}
                  </div>


                  <BootstrapTable data={this.state.clientsDetails} striped hover bordered condensed options={this.options} pagination version='4' search={true} exportCSV={false} scrollTop={'Bottom'} >
                    <TableHeaderColumn rowSpan='2' isKey dataField='institute_name' dataSort >Institution Name</TableHeaderColumn>
                    <TableHeaderColumn rowSpan='2' dataField='institute_code' dataSort >Institution Code</TableHeaderColumn>
                    <TableHeaderColumn rowSpan='2' dataField='_id' dataSort >Username</TableHeaderColumn>
                    <TableHeaderColumn row='0' colSpan='2' dataField='price' dataAlign="center" >Actions</TableHeaderColumn>
                    <TableHeaderColumn row="1" colSpan='1' dataAlign="center" columnTitle="Edit" dataFormat={this.editFormatter} >Edit</TableHeaderColumn>
                    <TableHeaderColumn row="1" colSpan='1' dataAlign="center" columnTitle="Delete" dataFormat={this.buttonFormatter} >Delete</TableHeaderColumn>
                  </BootstrapTable>
                </Col>
              </Row>
            </CustomCard> </div> : ''
        } */}

      </Container>
    );
  }
}





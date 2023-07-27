import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Badge } from 'reactstrap';
import CustomCard from 'components/common/customCard';
import Input from "components/common/input";
import Select from "components/common/select";

import restService from './services/restService';
import Service from './services/service';

import './style.scss';
import Joi from "joi-browser";


var schema = Joi.object().keys({
  Type: Joi.string().required(),
  code: Joi.string().required(),
  internalCode: Joi.string().required(),
  name: Joi.string().required(),
  shortName: Joi.string().required(),


});


class Settings extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {},
      errors: {},
      types: [
        {
          name: 'caste',
          _id: 'caste'
        },
        {
          name: 'category',
          _id: 'category'
        },
        {
          name: 'department',
          _id: 'department'
        },
        {
          name: 'language',
          _id: 'language'
        },
        {
          name: 'religion',
          _id: 'religion'
        },
        {
          name: 'boardtype',
          _id: 'boardtype'
        },
        {
          name: 'batch',
          _id: 'batch'
        },
        {
          name: 'state',
          _id: 'state'
        }
      ],
      skillOptions1: ['Same as Above'],
      selectedarr: [],
      showForm: false
    };
  }



  componentDidMount() {


    Service.getStoredValue((res) => {
      this.setState({
        logindata: res.data
      })
    })

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

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
        optionName="name"
        optionId="_id"
      />
    );
  }



  renderButton(name, type, className, funcal) {
    return (
      <button
        type={type}
        className={className}
        onClick={funcal}
      >{name}
      </button>
    );

  }



  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = Joi.object().keys({
      [name]: Joi.string().required(),
    });
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };


  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };



  saveDetails = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
  
    if (errors) return;
    if (!errors) return this.payloadData()

  }

  addDetails = (e) => {
    e.preventDefault();
    this.setState({
      showForm: true
    })
  }


  payloadData() {

    let loginValues = this.state.logindata;
    let objValues = this.state.data

    let obj = {
      "type": objValues.Type,
      "code": objValues.code,
      "internalCode": objValues.internalCode,
      "shortName": objValues.shortName,
      "displayName": objValues.name,
      "refId": ""
    }

  
    restService.addConstants(loginValues.client, 1, 1, obj, (res) => {
    
      if (res.statusCode === 1) {

      }
    })
  }





  render() {


    return (
      <Container fluid>
        <br />
        <Row>
          <h6>Settings</h6>
        </Row>

        <CustomCard>
          <div>
            <br />
            <Row className="justify-content-end" >
              <button className="btn btn-outline-secondary btn-sm">Download</button> &nbsp;
            <button className="btn btn-outline-secondary btn-sm">Bulk Upload</button> &nbsp;
              {this.renderButton("+Add", 'button', 'btn btn-primary btn-sm', this.addDetails)}
            </Row>
            <br />
            <Button color="primary" outline>
              Department <Badge color="secondary">5</Badge>
            </Button>

            <Button color="primary" outline>
              Batch <Badge color="secondary">5</Badge>
            </Button>

            <Button color="primary" outline>
              Board Type <Badge color="secondary">5</Badge>
            </Button>

            <Button color="primary" outline>
              Religion <Badge color="secondary">5</Badge>
            </Button>

            <Button color="primary" outline>
              Language <Badge color="secondary">5</Badge>
            </Button>

            <Button color="primary" outline>
              Caste <Badge color="secondary">5</Badge>
            </Button>

            <Button color="primary" outline>
              Category <Badge color="secondary">5</Badge>
            </Button>

            <Button color="primary" outline>
              State <Badge color="secondary">5</Badge>
            </Button>

            <br />

            {this.state.showForm ?
              <Form className="addDetailsForm" >
                <Row>
                  <Col sm="4">
                    {this.renderSelect("Type", "Type", this.state.types)}
                  </Col>
                  {this.state.data.Type === 'category' ?
                    <Col sm="4">
                      {this.renderSelect("caste", "Caste", this.state.types)}
                    </Col>
                    : null
                  }
                  {this.state.data.Type === 'batch' ?
                    <Col sm="4">
                      {this.renderSelect("department", "Department", this.state.types)}
                    </Col> : null
                  }
                  <Col sm="4">
                    {this.renderInput("code", "Code", "text", "")}
                  </Col>
                </Row>
                <Row>
                  <Col sm="4">
                    {this.renderInput("internalCode", "Internal Code", "text", "")}
                  </Col>
                  <Col sm="4">
                    {this.renderInput("name", "Name", "text", "")}
                  </Col>
                  <Col sm="4">
                    {this.renderInput("shortName", "Short Name", "text", "")}
                  </Col>
                </Row>
                <br />
                <Row className="justify-content-end" >
                  {this.renderButton("Save", "submit", 'btn btn-primary', this.saveDetails)}
                </Row>
              </Form>
              : null}
            <br />
            <Row>
              <h6>Details</h6>

            </Row>
            <p>table view</p>
          </div>
        </CustomCard>
      </Container >

    );
  }
}

export default Settings
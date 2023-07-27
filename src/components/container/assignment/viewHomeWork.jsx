import React, { Component } from "react";
import { Container, Row, Col, Button } from 'reactstrap';

import * as FAIcons from 'react-icons/fa';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import CustomCard from 'components/common/customCard';
import TabItem from 'components/common/tabItem';

import Input from "components/common/input";

import Select from "components/common/select";
import TextArea from "components/common/textarea";
import CheckBox from "components/common/checkbox";

import RadioButton from "components/common/radiobutton";
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import deleteIcon from './../../images/delete.svg';
import Joi from "joi-browser";
import './style.scss';

import {subDirectory} from '../../../config.json'

var schema = Joi.object().keys({

});


export default class viewHomeWork extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      isDatePickerOpen: false,
      activeTab: 'addevent',
      data: {},
      errors: {},
      dateRange: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',

        },

      },
      department: [
        {
          name: 'B.Tech',
          _id: 'B.Tech'
        },
        {
          name: 'BE',
          _id: 'BE'
        },
        {
          name: 'ME',
          _id: 'ME'
        }
      ],

      batch: [
        {
          name: '1st Year',
          _id: '1st Year'
        },
        {
          name: '2nd Year',
          _id: '2nd Year'
        },
        {
          name: '3rd Year',
          _id: '3rd Year'
        }
      ],
      subject: [
        {
          name: 'Maths',
          _id: 'Maths'
        },
        {
          name: 'Science',
          _id: 'Science'
        },
        {
          name: 'Tamil',
          _id: 'Tamil'
        }
      ],
      selectedarr: [],
    };

    this.openDatePicker = this.openDatePicker.bind(this);

  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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
      />
    );
  }

  renderButton(label, type = 'button', className = 'btn btn-primary') {
    return (
      <button type={type} className={className} >
        {label}
      </button>
    );
  }

  renderRadioButton(name, option) {
    return (

      <RadioButton
        name={name}
        options={option}
        handleChange={(e) => this.handleSkillsCheckBox(e)}
      />
    );
  }
  openDatePicker() {
    this.setState({
      isDatePickerOpen: !this.state.isDatePickerOpen
    });
  }


  handleRangeChange(which, payload) {
  
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload,
      },

    });
  }

  formatDateDisplay(date, defaultText) {
    if (!date) return defaultText;
    return format(date, 'YYYY-MM-DD');
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

  renderdateInput(name, label, type, accept) {
    const { date, errors } = this.state;
    return (
      <Input
        type={type}
        name={date}
        id={name}
        value={this.formatDateDisplay(this.state.dateRange.selection.startDate) + ' to ' + this.formatDateDisplay(this.state.dateRange.selection.endDate)}
        label={label}
        accept={accept}
        onClick={this.openDatePicker}
        error={errors[name]}
      />
    );
  }

  renderdaterangeInput() {

    return (

      <DateRange
        onChange={this.handleRangeChange.bind(this, 'dateRange')}
        moveRangeOnFirstSelection={false}
        ranges={[this.state.dateRange.selection]}
        className={'PreviewArea bg-white'}
      />
    )
  }

  renderTextArea(name, label) {
    const { data, errors } = this.state;
    return (
      <TextArea
        name={name}
        id={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderCheckbox(option, selectedOptions) {
    return (

      <CheckBox
        selectedOptions={selectedOptions}
        options={option}
        handleChange={(e) => this.handleSkillsCheckBox(e)}
      />
    );
  }

  buttonFormatter(cell, row) {
    return <img src={deleteIcon} className="img-responsive deletebtn" onClick={() => this.deleteAssignment(row)} alt="delete" />;
  }


  render() {
    return (
      <Container fluid><br />

        <Row><h6>View Homework</h6></Row>

        <Row>
          <Col sm="3">
            <TabItem icon={<FAIcons.FaBook />} text={"Add Assignment"}  to={`${subDirectory}/main/addAssignment`} />
          </Col>
          <Col sm="3">
            <TabItem icon={<FAIcons.FaRegListAlt />} text={"View Assignment"} to={`${subDirectory}/main/viewAssignment`} />
          </Col>
          <Col sm="3">
            <TabItem icon={<FAIcons.FaHireAHelper />} text={" Add HomeWork"} to={`${subDirectory}/main/homework`} />
          </Col>
          <Col sm="3">
            <TabItem icon={<FAIcons.FaHireAHelper />} text={"View HomeWork"} active to={`${subDirectory}/main/viewHomeWork`} />
          </Col>
        </Row>

        <CustomCard>
          <div>

            <Row>
              <Col sm="4">
                {this.renderSelect("Department", "Department", this.state.department)}
              </Col>
              <Col sm="4">
                {this.renderSelect("Batch", "Batch", this.state.batch)}
              </Col>
              <Col sm="4">
                {this.renderSelect("Subject", "Subject", this.state.subject)}
              </Col>
            </Row>

            <Row>{
              this.state.showEdit ? <Button onClick={() => this.editAssignmentDetails()} style={{ marginLeft: "851px", marginBottom: "10px" }}>Edit</Button> : null
            }
              <BootstrapTable data={this.state.studentList} striped hover bordered condensed options={this.options} pagination version='4' search={true} exportCSV={false} scrollTop={'Bottom'}  >
                <TableHeaderColumn dataField='name' dataAlign="center" dataSort>  Name</TableHeaderColumn>
                <TableHeaderColumn isKey={true} dataField='assignmentReport' dataAlign="center" dataFormat={this.totalMarksVal} >Total Marks</TableHeaderColumn>
                <TableHeaderColumn dataField='assignmentReport' dataAlign="center" dataFormat={this.marksVal} >Marks Obtained</TableHeaderColumn>
                <TableHeaderColumn dataField='Delete' dataAlign="center" dataFormat={this.buttonFormatter} >  Delete</TableHeaderColumn>
              </BootstrapTable>
            </Row>

            <Row className="justify-content-end" >
              {this.renderButton("Save")}
            </Row>
          </div>
        </CustomCard>

      </Container >
    );
  }
} 
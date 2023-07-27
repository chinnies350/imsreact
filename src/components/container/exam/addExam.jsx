import React, { Component } from "react";
import { Container, Row, Col, Form } from 'reactstrap';

import * as FAIcons from 'react-icons/fa';

import CustomCard from 'components/common/customCard';
import TabsItem from 'components/common/tabItem';

import Input from "components/common/input";

import Select from "components/common/select";
import TextArea from "components/common/textarea";
import CheckBox from "components/common/checkbox";

import RadioButton from "components/common/radiobutton";
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import Joi from "joi-browser";
import './style.scss';

import {subDirectory} from '../../../config.json'

var schema = Joi.object().keys({

});



export default class AddExam extends Component {

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
      exammode: [
        {
          name: 'Offline',
          _id: 'Offline'
        },
        {
          name: 'Online',
          _id: 'Online'
        }
      ],

      subjname: [
        {
          name: 'Maths',
          _id: 'Maths'
        },
        {
          name: 'English',
          _id: 'English'
        },
        {
          name: 'Science',
          _id: 'Science'
        }
      ],



      skillOptions1: ['Project Ongoing'],
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


  render() {
    return (
      <div>
        <Container fluid>
          <br />
          <Row>
            <h6>Exam - Add Exam</h6>
          </Row>
          <br />
          <Row>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaBook />} text="Add Exam" active />
            </Col>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaRegFileAlt />} text="View Exam" to={`${subDirectory}/main/view_exam`} />
            </Col>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaRegWindowRestore />} text="View Section" to={`${subDirectory}/main/view_section`} />
            </Col>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaRegListAlt />} text="View Question" to={`${subDirectory}/main/view_question`} />
            </Col>
          </Row>
          <br />
          <CustomCard>
            <Form autoComplete="off" onSubmit={this.handleSubmit}>
              <Row>
                <Col sm="4">
                  {this.renderInput("Exam Name", "Exam Name", "text", "")}
                </Col>
                <Col sm="4">
                  {this.renderSelect("Exam Mode", "Exam Mode", this.state.exammode)}
                </Col>
                <Col sm="4">
                  {this.renderSelect("Subject Name", "Subject Name", this.state.subjname)}
                </Col> 
              </Row>

              <Row>

                <Col sm="4">
                  {this.renderdateInput("Date", "Date", "")}
                  {this.state.isDatePickerOpen ? this.renderdaterangeInput() : ''}
                </Col>
                <Col sm="4">
                  {this.renderInput("Time", "Time (in Hours)", "text", "")}
                </Col>
              </Row>

              <Row>

                <Col sm="12">
                  {this.renderInput("Syllabus", "Syllabus", "text", "")}
                </Col>

              </Row> 
              <Row className="justify-content-end" >
                {this.renderButton("Save")}
              </Row>
            </Form>
          </CustomCard>

        </Container>
      </div>
    );
  }
}


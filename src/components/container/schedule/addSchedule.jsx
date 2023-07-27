import React, { Component } from "react";
import { Container, Row, Col, Label, TabContent, TabPane, Nav, NavItem, NavLink, FormGroup } from 'reactstrap';

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

import Picky from 'react-picky';
import 'react-picky/dist/picky.css';

import classnames from 'classnames';

import './style.scss';

import {subDirectory} from '../../../config.json'

const dayList = [];
const weekList = [];

dayList.push("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
weekList.push("1st Week", "2nd Week", "3rd Week", "4th Week") 
var schema = Joi.object().keys({

});


export default class AddSchedule extends Component {
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
      type: [
        {
          name: 'Attendance',
          _id: 'Attendance'
        },
        {
          name: 'Assignment',
          _id: 'Assignment'
        },
        {
          name: 'Exam',
          _id: 'Exam'
        },
        {
          name: 'Event',
          _id: 'Event'
        },
        {
          name: 'Home Work',
          _id: 'Home Work'
        },
        {
          name: 'Timetable',
          _id: 'Timetable'
        },
      ],
      mode: [
        {
          name: 'Offline',
          _id: 'Offline'
        },
        {
          name: 'Online',
          _id: 'Online'
        }
      ],
      category: [
        {
          name: 'Sports',
          _id: 'Sports'
        },
        {
          name: 'Lab',
          _id: 'Lab'
        },
        {
          name: 'Classroom',
          _id: 'Classroom'
        },
      ],
      eventtype: [
        {
          name: 'Daily',
          _id: 'Daily'
        },
        {
          name: 'Weekly',
          _id: 'Weekly'
        },
        {
          name: 'Monthly',
          _id: 'Monthly'
        },
      ],
      skillOptions1: ['Project Ongoing'],
      selectedarr: [],
    }
    this.toggle = this.toggle.bind(this);
    this.openDatePicker = this.openDatePicker.bind(this);
  };
 

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
      <Container fluid>
        <br />
        <Row>
          <h5>Add Schedule</h5>
        </Row>
        <br />
        <Row>
          <Col sm="3">
            <TabsItem icon={<FAIcons.FaHourglassHalf />} text="Add Schedule" active={true} to={`${subDirectory}/main/add_schedule`} />
          </Col>
          <Col sm="3">
            <TabsItem icon={<FAIcons.FaUserClock />} text="View Schedule" to={`${subDirectory}/main/view_schedule`} />
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
                {this.renderSelect("Type", "Type", this.state.type)}
              </Col>

            </Row>
            <Row>
              <Col sm="4">
                {this.renderInput("Title", "Title", "text", "")}
              </Col>

              <Col sm="4">
                {this.renderdateInput("projectDate", "Date", "")}
                {this.state.isDatePickerOpen ? this.renderdaterangeInput() : ''}
              </Col>
              {
                this.state.data.Type === 'Event' ?
                  <Col sm="2" >
                    {this.renderInput("Start Time", "Start Time", "time", "")}

                  </Col>
                  : ''}
              {
                this.state.data.Type === 'Event' ?
                  <Col sm="2">
                    {this.renderInput("End Time", "End Time", "time", "")}

                  </Col>
                  : ''
              }

            </Row>
            <br />

            {

                this.state.data.Type === 'Attendance' ?
                <div>
                  <Row>
                    <Col sm="4">
                      {this.renderInput("No.of Times Taken", "No.of Times Taken", "text", "")}
                    </Col>
                  </Row>
                </div>

                :
               this.state.data.Type === 'Assignment' ?
               <div>
                 <Row>
                   <Col sm="4">
                     {this.renderInput("Assignment Mark", "Assignment Mark", "text", "")}
                   </Col>
                 </Row>
               </div>

               :
              this.state.data.Type === 'Exam' ?
                <div>
                  <Row>
                    <Col sm="4">
                      {this.renderSelect("Mode", "Mode", this.state.mode)}
                    </Col>
                    <Col sm="4">
                      {this.renderInput("Total Marks", "Total Marks", "text", "")}
                    </Col>
                  </Row><br />
                  <Row>
                    <Col sm="12">
                      {this.renderInput("Syllabus", "Syllabus", "text", "")}
                    </Col>

                  </Row><br />
                </div>

                :

                this.state.data.Type === 'Timetable' ?
                  <div>
                    <Row>
                      <Col sm="4">
                        {this.renderSelect("Category", "Category", this.state.category)}
                      </Col>

                      <Col sm="4">
                        {this.renderInput("Days", "Days", "text", "")}
                      </Col>

                    </Row>
                  </div>
                  :
                 
                    this.state.data.Type === 'Event' ?

                      <div>
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: this.state.activeTab === 'addevent' })}
                              onClick={() => { this.toggle('addevent'); }}
                            >
                              Add Events
                              </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: this.state.activeTab === 'addgallery' })}
                              onClick={() => { this.toggle('addgallery'); }}
                            >
                              Add Gallery
                              </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: this.state.activeTab === 'otherdetails' })}
                              onClick={() => { this.toggle('otherdetails'); }}
                            >
                              Other Details
                              </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                          <TabPane tabId="addevent">
                            <Row className="justify-content-center">
                              <Label style={{ fontWeight: '600', color: '#0099ff', textTransform: 'uppercase', marginTop: '10px' }}>Add Events</Label>
                            </Row><br />

                            <Row>

                              <Col sm="4">

                                {this.renderSelect("EventType", "Event Type", this.state.eventtype)}

                              </Col>
                              {
                                this.state.data.EventType === 'Monthly' ?
                                  <Col sm="4">

                                    <FormGroup>

                                      <Label>Weekly</Label>
                                      <Picky
                                        value={this.state.weeks}
                                        options={weekList}
                                        onChange={this.selectMultipleOption}
                                        open={false}
                                        multiple={true}
                                        includeSelectAll={true}
                                        includeFilter={false}
                                        dropdownHeight={600}
                                      />
                                    </FormGroup>
                                  </Col>
                                  : ''
                              }
                              {
                                this.state.data.EventType === 'Monthly' || this.state.data.EventType === 'Weekly' ?
                                  <Col sm="4">
                                    <FormGroup>

                                      <Label>Days</Label>

                                      <Picky
                                        value={this.state.days}
                                        options={dayList}
                                        onChange={this.selectMultipleOption1}
                                        open={false}
                                        multiple={true}
                                        includeSelectAll={true}
                                        includeFilter={false}
                                        dropdownHeight={600}
                                      />

                                    </FormGroup>

                                  </Col>

                                  : ''
                              }

                            </Row>

                            <Row>

                              <Col sm="4">
                                {this.renderInput("Banner URL", "Banner URL", "file", "")}
                              </Col>
                              <Col sm="4">
                                {this.renderInput("Website", "Website Link", "text", "")}
                              </Col>

                            </Row>

                          </TabPane>
                          <TabPane tabId="addgallery">
                            <Row className="justify-content-center">
                              <Label style={{ fontWeight: '600', color: '#0099ff', textTransform: 'uppercase', marginTop: '10px' }}>Add Gallery</Label>
                            </Row><br />

                            <Row>

                              <Col sm="4">
                                {this.renderSelect("Event Name", "Event Name", this.state.eventtype)}
                              </Col>
                              <Col sm="4">
                                {this.renderInput("Gallery Image", "Gallery Image", "file", "")}
                              </Col>

                            </Row>

                          </TabPane>
                          <TabPane tabId="otherdetails">
                            <Row className="justify-content-center">
                              <Label style={{ fontWeight: '600', color: '#0099ff', textTransform: 'uppercase', marginTop: '10px' }}>Other Details</Label>
                            </Row><br />
                            <Row>
                              <Col sm="4">
                                {this.renderSelect("Event Name", "Event Name", this.state.eventtype)}
                              </Col>
                              <Col sm="4">
                                {this.renderInput("Guest Name", "Guest Name", "text", "")}
                              </Col>
                              <Col sm="4">
                                {this.renderInput("Guest Role", "Guest Role", "text", "")}
                              </Col>
                            </Row>
                            <Row>
                              <Col sm="4">
                                {this.renderInput("Guest Image", "Guest Image", "file", "")}
                              </Col>
                            </Row>

                          </TabPane>
                        </TabContent>
                      </div>

                      :
                      ''

            }

            <Row>

              <Col sm="12">
                {this.renderTextArea("projectTextArea", "Description")}
              </Col>

            </Row>
            <Row className="justify-content-end" >
              {this.renderButton("Save")}
            </Row>


          </div>
        </CustomCard>

      </Container>

    );
  }
}


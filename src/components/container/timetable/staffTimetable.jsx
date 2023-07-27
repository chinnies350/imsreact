import React, { Component } from "react";
import { Container, Row, Col, Table } from 'reactstrap';

import * as FAIcons from 'react-icons/fa';

import CustomCard from 'components/common/customCard';
import TabsItem from 'components/common/tabItem';

import Select from "components/common/select";
import Input from "components/common/input";
import Joi from "joi-browser";
import './style.scss';

import {subDirectory} from '../../../config.json'

var schema = Joi.object().keys({

});


export default class StaffTimetable extends Component {

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
          name: 'Tamil',
          _id: 'Tamil'
        },
        {
          name: 'English',
          _id: 'English'
        }
      ],
      days: [
        {
          name: 'Monday',
          _id: 'Monday'
        },
        {
          name: 'Tuesday',
          _id: 'Tuesday'
        },
        {
          name: 'Wednesday',
          _id: 'Wednesday'
        },
      ],
      staffname: [
        {
          name: 'Divya',
          _id: 'Divya'
        },
        {
          name: 'Shruthi',
          _id: 'Shruthi'
        },
      ],
      selectedarr: [],
    };

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

  renderButton(label, type = 'button', className = 'btn btn-primary') {
    return (
      <button type={type} className={className} >
        {label}
      </button>
    );
  }


  handleRangeChange(which, payload) {
  
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload,
      },

    });
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


  render() {
    return (
      <Container fluid><br />

        <Row><h6>Timetable - Free Staff Timetable</h6></Row>
        <br />
        <Row>
          <Col sm="2">
            <TabsItem icon={<FAIcons.FaTable />} text="Staff Wise" active to={`${subDirectory}/main/staff_timetable`} />
          </Col>
          <Col sm="2">
            <TabsItem icon={<FAIcons.FaListAlt />} text="Class Wise" to={`${subDirectory}/main/student_timetable`} />
          </Col>
          <Col sm="2">
            <TabsItem icon={<FAIcons.FaTasks />} text="Free Staff" to={`${subDirectory}/main/freestaff_timetable`} />
          </Col>
          <Col sm="2">
            <TabsItem icon={<FAIcons.FaTasks />} text="Reschedule" to={`${subDirectory}/main/reschedule`} />
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
                {this.renderSelect("Days", "Days", this.state.days)}
              </Col>
            </Row>

            <Row>
              <Col sm="4">
                {this.renderSelect("Subject Name", "Subject Name", this.state.subject)}
              </Col>
              <Col sm="2">
                {this.renderInput("Start Time", "Start Time", "time", "")}
              </Col>
              <Col sm="2">
                {this.renderInput("End Time", "End Time", "time", "")}
              </Col>
              <Col sm="4">
                {this.renderSelect("Staff Name", "Staff Name", this.state.staffname)}
              </Col>
            </Row>
            <Row className="justify-content-end" >
              {this.renderButton("Save")}
            </Row>

            <br /><br />
            <Row>

              <h6>View Details</h6>

              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>Days/Period</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Monday</th>
                    <td onClick={() => this.Update("08:30", "09:30", "Maths", "Divya")} style={{ cursor: 'pointer' }}>

                      <p>  8:30 to 9:30</p>

                      <p>  Maths</p>

                      <p>  Divya</p>

                    </td>
                    <td onClick={() => this.Update("10:30", "11:30", "English", "Divya")} style={{ cursor: 'pointer' }}>
                      <p>  10:30 to 11:30</p>

                      <p>  English</p>

                      <p>  Divya</p>
                    </td>
                    <td onClick={() => this.Update("12:30 ", "01:30", "Maths", "Divya")} style={{ cursor: 'pointer' }}>
                      <p>  12:30 to 1:30</p>

                      <p>  Maths</p>

                      <p>  Divya</p>
                    </td>
                    <td onClick={() => this.Update("2:30 ", "3:30", "English", "Divya")} style={{ cursor: 'pointer' }}>
                      <p>  2:30 to 3:30</p>

                      <p>  English</p>

                      <p>  Divya</p></td>
                    <td onClick={() => this.Update("03:30 ", "04:30", "Maths", "Divya")} style={{ cursor: 'pointer' }}>
                      <p>  3:30 to 4:30</p>

                      <p>  Maths</p>

                      <p>  Divya</p>
                    </td>
                    <td onClick={() => this.Update("04:30", "05:30", "English", "Divya")} style={{ cursor: 'pointer' }}>
                      <p>  4:30 to 5:30</p>

                      <p>  English</p>

                      <p>  Divya</p>
                    </td>
                    <td onClick={() => this.Update("06:30 ", " 07:30", "Maths", "Divya")} style={{ cursor: 'pointer' }}>
                      <p>  6:30 to 7:30</p>

                      <p>  Maths</p>

                      <p>  Divya</p>
                    </td>
                    <td onClick={() => this.Update("08:30 ", " 09:30", "English", "Divya")} style={{ cursor: 'pointer' }}>
                      <p>  8:30 to 9:30</p>

                      <p>  English</p>

                      <p>  Divya</p>
                    </td>

                  </tr>
                </tbody>
              </Table>




            </Row>

          </div>
        </CustomCard>

      </Container >
    );
  }
} 
import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';

import * as FAIcons from 'react-icons/fa';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
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


export default class EventsReports extends Component {

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
      events: [
        {
          name: 'Robotics',
          _id: 'Robotics'
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



  render() {
    var products = [
      {
        sno: 1,
        userid: "1001",
        name: 'Divya',
        eventname: 'Robotics',
        date: '12/12/2018',
      },
      {
        sno: 2,
        userid: "1002",
        name: 'Lisa',
        eventname: 'iOT',
        date: '13/12/2018',
      },
      {
        sno: 3,
        userid: "1003",
        name: 'Shruthi',
        eventname: 'AI',
        date: '24/12/2018',
      },
      {
        sno: 4,
        userid: "1004",
        name: 'Sara',
        eventname: 'BOTICS',
        date: '28/12/2018',
      },
      {
        sno: 5,
        userid: "1005",
        name: 'Thara',
        eventname: '5G Tech',
        date: '29/12/2018',
      }
    ];

    var products = [
      {
        sno: 1,
        name: "Bernet",
        attendane: 'present',
      }
    ];

    return (
      <div>
        <Container fluid>
          <br />
          <Row>
            <h6> Reports - Events </h6><br />

          </Row>

          <br />

          <Row>
            <Col sm="2">
              <TabsItem icon={<FAIcons.FaRegChartBar />} text="Attendance" to={`${subDirectory}/main/attendance_reports`} />
            </Col>
            <Col sm="2">
              <TabsItem icon={<FAIcons.FaClipboardList />} text="Exam" to={`${subDirectory}/main/exam_reports`} />
            </Col>
            <Col sm="2">
              <TabsItem icon={<FAIcons.FaBook />} text="Assignment" to={`${subDirectory}/main/assignment_reports`} />
            </Col>
            <Col sm="2">
              <TabsItem icon={<FAIcons.FaFileInvoiceDollar />} text="Fee Details" to={`${subDirectory}/main/fee_reports`} />
            </Col>
            <Col sm="2">
              <TabsItem icon={<FAIcons.FaTasks />} active={true} text="Events" to={`${subDirectory}/main/event_reports`} />
            </Col>
          </Row>
          <br />

          <CustomCard>

            <Row>
              <Col sm="4">
                {this.renderSelect("Department", "Department", this.state.department)}
              </Col>
              <Col sm="4">
                {this.renderSelect("Batch", "Batch", this.state.batch)}
              </Col>
              <Col sm="4">
                {this.renderSelect("Events", "Events", this.state.events)}
              </Col>
            </Row>
            <br />
            <Row>

              <Col sm="12">
                <BootstrapTable data={products} striped hover bordered condensed options={this.options} pagination version='4' search={true} exportCSV={false} scrollTop={'Bottom'} >
                  <TableHeaderColumn isKey dataSort dataField='sno'>S. No</TableHeaderColumn>
                  <TableHeaderColumn dataField='userid' dataSort >User ID </TableHeaderColumn>
                  <TableHeaderColumn dataSort dataField='name' >Participant Name</TableHeaderColumn>
                  <TableHeaderColumn dataSort dataField='eventname' >Event Name</TableHeaderColumn>
                  <TableHeaderColumn dataSort dataField='date' >Event Date</TableHeaderColumn>

                </BootstrapTable>
              </Col>
            </Row>

          </CustomCard>

        </Container>
      </div>
    );
  }
}

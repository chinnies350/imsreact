import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';

import * as FAIcons from 'react-icons/fa';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import CustomCard from 'components/common/customCard';
import TabsItem from 'components/common/tabItem';
import Select from "components/common/select";
import Input from "components/common/input";
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import Joi from "joi-browser";
import './style.scss';
import './style.scss';

import {subDirectory} from '../../../config.json'
var schema = Joi.object().keys({

});


export default class AddHolidays extends Component {

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
      type: [
        {
          name: 'Pongal',
          _id: 'Pongal'
        },
        {
          name: 'Chirstmas',
          _id: 'Chirstmas'
        },
        {
          name: 'New Year',
          _id: 'New Year'
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

  renderButton(label, type = 'button', className = 'btn btn-primary') {
    return (
      <button type={type} className={className} >
        {label}
      </button>
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

  render() {
    this.options = {
      sizePerPage: 5,
      sizePerPageList: [5, 10, 25, 50, 100],
      pageStartIndex: 1,
      paginationSize: 5,
      prePage: 'Prev',
      nextPage: 'Next',
      paginationPosition: 'bottom',
    };
    return (
      <div>
        <Container fluid><br />
          <Row>
            <h6>Add Holidays</h6><br />
          </Row><br />
          <Row>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaBook />} text="Add Attendance" to={`${subDirectory}/main/add_attendance`} />
            </Col>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaFileAlt />} text="View Attendance" to={`${subDirectory}/main/view_attendance`} />
            </Col>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaUmbrellaBeach />} text="Add Holidays" active={true} to={`${subDirectory}/main/add_holidays`} />
            </Col>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaClipboardList />} text="Staff Allocation" to={`${subDirectory}/main/staff_allocation`} />
            </Col>
          </Row>
          <br />
          <CustomCard>
            <Row>
              <Col sm="4">
                {this.renderSelect("Type", "Type", this.state.type)}
              </Col>
              <Col sm="4">
                {this.renderdateInput("Date", "Date", "")}
                {this.state.isDatePickerOpen ? this.renderdaterangeInput() : ''}
              </Col>

            </Row>
            <Row className="justify-content-end" >
              {this.renderButton("Save")}
            </Row>
            <br />
            <Row>
              <BootstrapTable data={this.state.holidayLists} striped hover bordered condensed options={this.options} pagination version='4' search={true} exportCSV={false} scrollTop={'Bottom'}  >
                {/* <TableHeaderColumn   dataSort dataField='sno' rowSpan='2'>S. No</TableHeaderColumn> */}
                <TableHeaderColumn isKey rowSpan='2' dataField='title' dataSort dataAlign="center" >Holiday Name </TableHeaderColumn>
                <TableHeaderColumn rowSpan='2' dataField='holidayDate' dataAlign="center" dataFormat={this.tableHolidayDate}>Date </TableHeaderColumn>
                <TableHeaderColumn row='0' colSpan='2' dataField='price' dataAlign="center" >Actions</TableHeaderColumn>
                <TableHeaderColumn row="1" colSpan='1' dataAlign="center" columnTitle="Edit" dataFormat={this.editFormatter} >Edit</TableHeaderColumn>
                <TableHeaderColumn row="1" colSpan='1' dataAlign="center" columnTitle="Delete" dataFormat={this.buttonFormatter} >Delete</TableHeaderColumn>
              </BootstrapTable>
            </Row>
          </CustomCard>
        </Container>
      </div>
    );
  }
}



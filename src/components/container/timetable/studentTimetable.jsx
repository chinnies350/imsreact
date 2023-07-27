import React, { Component } from 'react';
import * as FAIcons from 'react-icons/fa';
import { Container, Row, Col, FormGroup, Label, Button, Table } from 'reactstrap';
import TabsItem from 'components/common/tabItem';
import CustomCard from 'components/common/customCard';
import Select from "components/common/select";
import Input from "components/common/input";
import Joi from "joi-browser";
import './style.scss';

import {subDirectory} from '../../../config.json'

var schema = Joi.object().keys({

});

export default class StudentTimetable extends Component {

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

  componentDidMount() {
    this.gettingtimetablevalues();
  }


  gettingtimetablevalues() {
    var data = require('./sample.json');
    var days = ['Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday'];
    var Val = data.timeTable.map((results, i) => {
      let tablebody = '';
      for (let i = 0; i < days.length; i++) {
        let day = days[i];
        let rowdata = results[day] || [];
        let tddata = '';
        let trdata = '';
        for (let j = 0; j < rowdata.length; j++) {
          tddata += `         
          <td ${rowdata[j].subjectName === ('Break') ? 'rowspan="5"' : ''} >
            <div class="subjname"><p>${rowdata[j].subjectName}</p></div>
            <div class="staffname"><p>${rowdata[j].staff}</p></div>
          </td>  
          `
        }
        trdata += `
          <th scope="row" className="subjname">${days[i]}</th>
          ${tddata}
        `;
        tablebody += `<tr>${trdata}</tr>`;
        if ((days.length - 1) === i) {
          this.setState({
            timetable: tablebody

          }, () => {
            return this.state.timetable;
          });


        }
      }

    })


  }





  render() {


    return (
      <div>
        <Container fluid>
          <br />
          <Row>
            <h6>Time Table - Student Time Table</h6><br />

          </Row>

          <br />

          <Row>
            <Col sm="2">
              <TabsItem icon={<FAIcons.FaTable />} text="Staff Wise" to={`${subDirectory}/main/staff_timetable`}/>
            </Col>
            <Col sm="2">
              <TabsItem icon={<FAIcons.FaListAlt />} text="Class Wise" active to={`${subDirectory}/main/student_timetable`} />
            </Col>
            <Col sm="2">
              <TabsItem icon={<FAIcons.FaTasks />} text="Free Staff" to={`${subDirectory}/main/freestaff_timetable`} />
            </Col>
            <Col sm="2">
              <TabsItem icon={<FAIcons.FaTasks />} text="Reschedule" to={`${subDirectory}/main/reschedule`} />
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
                {this.renderSelect("Subject", "Subject", this.state.subject)}
              </Col>
            </Row>

            <br />
            <Row className="justify-content-end">
              <Button color="primary" >Submit</Button>
            </Row>

            <br />

            <Row >
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>Days/Period</th>
                    <th>1 (9:00-9:50)</th>
                    <th>9:50 - 10:00</th>
                    <th>2 (10:00-11:00)</th>
                    <th>3 (11:00-12:00)</th>
                    <th>4 (1:00 - 2:00)</th>
                    <th>5 (2:00 - 2:50)</th>
                    <th>2:50 - 3:00</th>
                    <th>6 (3:00 - 4:00)</th>
                  </tr>
                </thead>

                <tbody dangerouslySetInnerHTML={{ __html: this.state.timetable }}>

                </tbody>


              </Table>
            </Row>


          </CustomCard>

        </Container>
      </div>
    );
  }
}



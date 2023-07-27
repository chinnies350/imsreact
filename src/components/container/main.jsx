import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Row, Container } from 'reactstrap';

import Header from 'components/common/header';
import SideNav from 'components/common/sideNav';

// Services
import Service from 'services/service';

// Route
import Dashboard from './dashboard/dashboard';
import Settings from './settings/settings';
import FeeAllocation from './fees/feeAllocation';
import FeeCollection from './fees/feeCollection';
import AddAssignment from './assignment/addAssignment';
import ViewAssignment from './assignment/viewAssignment';
import HomeWork from './assignment/homeWork';
import ViewHomeWork from './assignment/viewHomeWork';

/* import Details from './user/userlist'; */
import Login from './user/form/form-register';
import Personal from './user/personal';
import Communication from './user/communication';
import Education from './user/education';
import Extracurricular from './user/extracurricular';
import Organization from './user/organization';
import Parent from './user/parent';

import AddRoles from './roles/addRoles';


import AddExam from './exam/addExam';
import ViewExam from './exam/viewExam';
import ViewQuestion from './exam/viewQuestion';
import ViewSection from './exam/viewSection';
import AddCourse from './course/addCourse';
import AddSubject from './course/addSubject';
import AddLesson from './course/addLesson';
import CourseDetails from './course/courseDetails';
import SubjectDetails from './course/subjectDetails';
import LessonDetails from './course/lessonDetails';
import AddSchedule from './schedule/addSchedule';
import ViewSchedule from './schedule/viewSchedule';
import ViewEventDetails from './schedule/viewEventDetails';

import ClientCrdentials from './clientCredentials/clientCredentials';
import AddClient from './client/addClient';
import ViewClient from './client/viewClient';
import viewClientDetails from './client/viewClientDetails'
import AddAttendance from './attendance/addAttendance';
import ViewAttendance from './attendance/viewAttendance';
import AddHolidays from './attendance/addHolidays';
import StaffAllocation from './attendance/staffAllocation';
import AssignmentReports from './reports/assignmentReports';
import AttendanceReports from './reports/attendanceReports';
import EventsReports from './reports/eventsReports';
import ExamReports from './reports/examReports';
import FeeDetailsReports from './reports/feedetailsReports';
import StudentTimetable from './timetable/studentTimetable';
import StaffTimetable from './timetable/staffTimetable';
import ReSchedule from './timetable/reschedule';
import FreestaffTimetable from './timetable/freestaffTimetable';

import './style.scss';

import {subDirectory} from '../../../config.json'

// var $ = require('jquery');

export default class main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginData: {}
    }
    this.checkLoggedIn = this.checkLoggedIn.bind(this);
  }

  componentDidMount() {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    Service.getStoredValue((res) => {
    
      if (res.isLoggedIn) return this.setState({ loginData: res });
      sessionStorage.clear();
      return this.props.history.push('/');
    });
  }


  render() {
    return (
      <Container fluid className="pl-0 px-0">

        <Header />
        <Row className="ml-0 mx-0">
          <div className="sidbardiv">
            <SideNav />
          </div>
          <div className="maincontentdiv">
            <Router>
              <Switch>
                <Route exact path={`${subDirectory}/main/dashboard`} component={Dashboard} />
                <Route path={`${subDirectory}/main/settings`} component={Settings} />



                <Route path={`${subDirectory}/main/:type/:clientId/personal`}component={Personal} />

                <Route path={`${subDirectory}/main/personal`} component={Personal} />
                <Route path={`${subDirectory}/main/:uid/personal`} component={Personal} />
                <Route path={`${subDirectory}/main/communication`} component={Communication} />
                <Route path={`${subDirectory}/main/education`}component={Education} />
                <Route path={`${subDirectory}/main/extracurricular`}component={Extracurricular} />
                <Route path={`${subDirectory}/main/organization`} component={Organization} />
                <Route path={`${subDirectory}/main/parent`} component={Parent} />


                <Route path={`${subDirectory}/main/add_exam`}component={AddExam} />
                <Route path={`${subDirectory}/main/view_exam`}component={ViewExam} />
                <Route path={`${subDirectory}/main/view_question`} component={ViewQuestion} />
                <Route path={`${subDirectory}/main/view_section`} component={ViewSection} />

                <Route path={`${subDirectory}/main/addAssignment`} component={AddAssignment} />
                <Route path={`${subDirectory}/main/viewAssignment`} component={ViewAssignment} />
                <Route path={`${subDirectory}/main/homework`} component={HomeWork} />
                <Route path={`${subDirectory}/main/viewHomeWork`} component={ViewHomeWork} />


                <Route path={`${subDirectory}/main/client_credentials`}component={ClientCrdentials} />

                <Route path={`${subDirectory}/main/fee_allocation`} component={FeeAllocation} />
                <Route path={`${subDirectory}/main/fee_collection`}component={FeeCollection} />

                <Route path={`${subDirectory}/main/add_course`} component={AddCourse} />
                <Route path={`${subDirectory}/main/add_subject`} component={AddSubject} />
                <Route path={`${subDirectory}/main/add_lesson`} component={AddLesson} />
                <Route path={`${subDirectory}/main/viewlesson_details`} component={LessonDetails} />
                <Route path={`${subDirectory}/main/viewsubject_details`} component={SubjectDetails} />
                <Route path={`${subDirectory}/main/viewcourse_details`} component={CourseDetails} />

                <Route path={`${subDirectory}/main/add_schedule`} component={AddSchedule} />
                <Route path={`${subDirectory}/main/view_schedule`} component={ViewSchedule} />
                <Route path={`${subDirectory}/main/view_event_details`} component={ViewEventDetails} />

                <Route path={`${subDirectory}/main/add-client`} component={AddClient} />
                <Route path={`${subDirectory}/main/view-client`} component={ViewClient} />
                <Route path={`${subDirectory}/main/view-client-details`} component={viewClientDetails} />

                <Route path={`${subDirectory}/main/add_attendance`} component={AddAttendance} />
                <Route path={`${subDirectory}/main/view_attendance`} component={ViewAttendance} />
                <Route path={`${subDirectory}/main/add_holidays`} component={AddHolidays} />
                <Route path={`${subDirectory}/main/staff_allocation`} component={StaffAllocation} />

                <Route path={`${subDirectory}/main/client_credentials`} component={ClientCrdentials} />

                <Route path={`${subDirectory}/main/assignment_reports`} component={AssignmentReports} />
                <Route path={`${subDirectory}/main/attendance_reports`} component={AttendanceReports} />
                <Route path={`${subDirectory}/main/event_reports`} component={EventsReports} />
                <Route path={`${subDirectory}/main/exam_reports`}component={ExamReports} />
                <Route path={`${subDirectory}/main/fee_reports`}component={FeeDetailsReports} />

                <Route path={`${subDirectory}/main/student_timetable`}component={StudentTimetable} />
                <Route path={`${subDirectory}/main/staff_timetable`}component={StaffTimetable} />
                <Route path={`${subDirectory}/main/freestaff_timetable`} component={FreestaffTimetable} />
                <Route path={`${subDirectory}/main/reschedule`}component={ReSchedule} />

                <Route path={`${subDirectory}/main/add_roles`} component={AddRoles} />
              </Switch>
            </Router>
            {/* </Col> */}
          </div>
        </Row>
      </Container >
    );
  }
}


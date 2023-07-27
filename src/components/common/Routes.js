import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from 'components/common/protectedRoute';

import GroupForm from 'components/client/Group';
import InstitutionForm from 'components/client/Institution';
import Clients from 'components/client';
import ClientEdit from 'components/client/editForm';
import ClientView from 'components/client/viewForm';

import ForgotPassword from 'components/core/forgotForm';

import Login from 'components/core/loginForm';
import Users from 'components/user';
import Profile from 'components/profile';
import GroupProfile from 'components/client/GroupProfile';
import InstitutionProfile from 'components/client/InstitutionProfile';
import UserForm from 'components/user/form';
import Staffs from 'components/staffuser';

import ScheduleForm from 'components/schedule/form';
import Schedule from 'components/schedule';

import Exam from 'components/exam/form';
import ExamList from 'components/exam';

import SettingsForm from 'components/settings/form';
import SettingsRoot from 'components/settings';

import AssignmentForm from 'components/assignment/form';
import Assignment from 'components/assignment';

import Dashboard from 'components/dashboard';

import Attendance from 'components/attendance/form';
import AttendanceList from 'components/attendance';

import StaffAttendance from 'components/StaffAttendance/form';
import StaffAttendanceList from 'components/StaffAttendance';

import CredentialsRoot from 'components/clientcredentials';
import CredentialsForm from 'components/clientcredentials/form';

import EventForm from 'components/event/form';
import EventRoot from 'components/event';

import TemplateForm from 'components/template/form'

import Result from 'components/onlineExam/result'
import OnlineExam from 'components/onlineExam';

import Timetable from 'components/timetable/form';
import TimetableList from 'components/timetable';

import FeesForm from 'components/fees/form';
import Fees from 'components/fees';

import CourseRoot from 'components/externalcourse';
import CourseAttendees from 'components/externalcourse/form/';
import SubjectRoot from 'components/subject';
import SubjectForm from 'components/subject/form';
import SyllabusRoot from 'components/syllabus';
import SyllabusForm from 'components/syllabus/form';

import Roles from 'components/roles';
import RolesForm from 'components/roles/form';

import GradeList from 'components/gradesettings';
import GradeForm from 'components/gradesettings/form';

import MarkDataList from 'components/markentry';
import MarkForm from 'components/markentry/form';

import ReportsForm from 'components/reports/form';

import Leave from 'components/leave/form';
import LeaveList from 'components/leave';
import Transfer from '../transfer/index'

import StaffLeave from 'components/StaffLeave/form';
import StaffLeaveList from 'components/StaffLeave';

import NotificationForm from 'components/notification/form'
import CircularDataList from 'components/circular';
import CircularForm from 'components/circular/form';

import StaffAllocationForm from 'components/staffallocation/form'
import StaffAllocation from 'components/staffallocation'

import ClassList from 'components/class';
import ResheduleRoot from 'components/class/form/';

import {subDirectory} from '../../config.json'
class Routes extends React.Component {
  async componentDidMount() {

  }
  

  render() {
    const { session, isPageLoadingFalse, isPageLoadingTrue } = this.props
    console.log(this.props,'iddddddddddddd')

    return (
      <Switch>

        {/* DASHBOARD */}
        <ProtectedRoute exact path={`${subDirectory}/dashboard`}render={(props) => <Dashboard {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        {/* USER PAGES */}

        <ProtectedRoute exact path={`${subDirectory}/:type/:uid/users`} render={(props) => <Users {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute exact path={`${subDirectory}/user/:formType/:uid`} render={(props) => <UserForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute exact path={`${subDirectory}/user/:uid/edit/:formType`} render={(props) => <UserForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute exact path={`${subDirectory}/:clientid/:entityid/:branch/:uid/edit/:formType`} render={(props) => <UserForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute exact path={`${subDirectory}/users`} render={(props) => <Users {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute exact path={`${subDirectory}/staffs`} render={(props) => <Staffs {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        {/* PROFILE PAGES */}
        <ProtectedRoute path={`${subDirectory}/:uid/profile`}exact render={(props) => <Profile {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute path={`${subDirectory}/Group Profile`} exact render={(props) => <GroupProfile {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute path={`${subDirectory}/Institution Profile`} exact render={(props) => <InstitutionProfile {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />


        <ProtectedRoute path={`${subDirectory}/:clientid/:entityid/:branch/:uid/profile`} exact render={(props) => <Profile {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />


        {/* External Course */}
        <ProtectedRoute exact path={`${subDirectory}/course/externalcourse-list`} render={(props) => <CourseRoot {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute exact path={`${subDirectory}/course/externalcourse/:actionTypes`} render={(props) => <CourseAttendees {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute exact path={`${subDirectory}/course/subject/:actionTypes`} render={(props) => <SubjectForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute exact path={`${subDirectory}/course/subject-list`} render={(props) => <SubjectRoot {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute exact path={`${subDirectory}/course/syllabus/:actionTypes`} render={(props) => <SyllabusForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute exact path={`${subDirectory}/course/syllabus-list`} render={(props) => <SyllabusRoot {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        {/* CLIENT CREDENTIAL PAGES */}
        <ProtectedRoute exact path={`${subDirectory}/credentials/:form/:action`} render={(props) => <CredentialsForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute exact path={`${subDirectory}/credentials/:form`} render={(props) => <CredentialsRoot {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        {/* CLIENT PAGES */}
        <ProtectedRoute path={`${subDirectory}/group/:groupaction`} render={(props) => <GroupForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute path={`${subDirectory}/institution/:institutionaction`} render={(props) => <InstitutionForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute path={`${subDirectory}/:type/:id/view`} render={(props) => <ClientView {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute path={`${subDirectory}/institution/:id/view`} render={(props) => <InstitutionForm  {...props}  session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue}/>}/>
        <ProtectedRoute path={`${subDirectory}/:type/list`} exact render={(props) => <Clients {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute path={`${subDirectory}/:clientid/:type/list`} exact render={(props) => <Clients {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute path={`${subDirectory}/:clientid/:entityid/:type/list`} exact render={(props) => <Clients {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute path={`${subDirectory}/:clientid/:entityid/:branchid/:type/list`} exact render={(props) => <Clients {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute path={`${subDirectory}/:clientid/:entityid/:branchid/:departmentid/:type/list`} exact render={(props) => <Clients {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute path={`${subDirectory}/:clientid/:entityid/:branchid/:departmentid/:batchid/:type/list`} exact render={(props) => <Clients {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute path={`${subDirectory}/:type/:id/edit`} render={(props) => <ClientEdit {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute path={`${subDirectory}/:type/:id/add`} render={(props) => <ClientEdit {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute exact path={`${subDirectory}/:clientid/:entityid/:branchid/credentials/:form`} render={(props) => <CredentialsForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />


        <ProtectedRoute exact path={`${subDirectory}/settings/:action/:formType`} render={(props) => <SettingsForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute exact path={`${subDirectory}/:clientid/settings/:action/:formType`} render={(props) => <SettingsForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute exact path={`${subDirectory}/:clientid/:entityid/settings/:action/:formType`} render={(props) => <SettingsForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute exact path={`${subDirectory}/settings/:formType`}render={(props) => <SettingsRoot {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />


        {/* SCHEDULE PAGES */}
        <ProtectedRoute exact path={`${subDirectory}/schedule/:actiontype/:scheduleform`} render={(props) => <ScheduleForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute exact path={`${subDirectory}/schedule/:scheduleType`}render={(props) => <Schedule {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />



        <ProtectedRoute exact path={`${subDirectory}/schedule/:actiontype/:scheduleform`} render={(props) => <ScheduleForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />


        <ProtectedRoute exact path={`${subDirectory}/schedule/:scheduleType`}render={(props) => <Schedule {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute exact path={`${subDirectory}/exam/:action/:examform`}render={(props) => <Exam {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute exact path={`${subDirectory}/exam/:form`} render={(props) => <ExamList {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />



        {/* Assignment Pages */}

        <ProtectedRoute exact path={`${subDirectory}/assignments/:action/:type`} render={(props) => <AssignmentForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute exact path={`${subDirectory}/assignments/:type`} render={(props) => <Assignment {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />


        {/* Attendance */}
        <ProtectedRoute exact path={`${subDirectory}/attendance/:actiontype/:attendanceform`} render={(props) => <Attendance {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute exact path={`${subDirectory}/attendance/:attendanceType`} render={(props) => <AttendanceList {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        {/* Staff Attendance */}
        <ProtectedRoute exact path={`${subDirectory}/staffattendance/:actiontype/:attendanceform`} render={(props) => <StaffAttendance {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute exact path={`${subDirectory}/staffattendance/:attendanceType`} render={(props) => <StaffAttendanceList {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />


        {/* Event Registration Pages */}

        <ProtectedRoute exact path={`${subDirectory}/event/:actiontype/:eventform`} render={(props) => <EventForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute exact path={`${subDirectory}/event/:eventformType`} render={(props) => <EventRoot {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />



        {/* Syllabus Pages */}
        <ProtectedRoute exact path={`${subDirectory}/syllabus/:actionTypes`}render={(props) => <SyllabusForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute exact path={`${subDirectory}/syllabus-list`} render={(props) => <SyllabusRoot {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        {/* Subject Pages */}
        <ProtectedRoute exact path={`${subDirectory}/subject/:actionTypes`} render={(props) => <SubjectForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute exact path={`${subDirectory}/subjectList`} render={(props) => <SubjectRoot {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />


        {/* LEAVE PAGES */}

        <ProtectedRoute exact path={`${subDirectory}/leave/:actiontype/:leaveform`} render={(props) => <Leave {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute exact path={`${subDirectory}/leave/:leaveType`} render={(props) => <LeaveList {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />


{/*Transfer  */}
<ProtectedRoute exact path={`${subDirectory}/transfer/:TransferType`} render={(props) => <Transfer {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
      

        {/* LEAVE PAGES */}

        <ProtectedRoute exact path={`${subDirectory}/staffleave/:actiontype/:leaveform`} render={(props) => <StaffLeave {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute exact path={`${subDirectory}/staffleave/:leaveType`} render={(props) => <StaffLeaveList {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        {/* RESULT PAGE *(ONLINE EXAM) */}
        <ProtectedRoute exact path={`${subDirectory}/result`} render={(props) => <Result {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        {/* ONLINE EXAM  */}

        <ProtectedRoute exact path={`${subDirectory}/onlineExam`} render={(props) => <OnlineExam {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        {/* TIMETABLE */}
        <ProtectedRoute exact path={`${subDirectory}/timetable/:action/:form`} render={(props) => <Timetable {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute exact path={`${subDirectory}/timetable/:form`} render={(props) => <TimetableList {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        {/* CLASS */}
        <ProtectedRoute exact path={`${subDirectory}/classLists/:formTypes`} render={(props) => <ClassList {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute exact path={`${subDirectory}/classList/reschedule`} render={(props) => <ResheduleRoot {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        {/* STAFF ALLOCATION */}
        <ProtectedRoute exact path={`${subDirectory}/staff/:actiontype/:allocationtype`} render={(props) => <StaffAllocationForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute exact path={`${subDirectory}/staff/allocation`} render={(props) => <StaffAllocation {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        {/* Template */}

        <ProtectedRoute exact path={`${subDirectory}/notification/:actionType/template`} render={(props) => <TemplateForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />


        {/* Fees */}
        <ProtectedRoute exact path={`${subDirectory}/fees/:actiontype/:feesform`} render={(props) => <FeesForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />
        <ProtectedRoute exact path={`${subDirectory}/fees/:feesType`} render={(props) => <Fees {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />


        {/* ROLES */}
        <ProtectedRoute exact path={`${subDirectory}/roles/:action`}render={(props) => <RolesForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        <ProtectedRoute exact path={`${subDirectory}/roles`} render={(props) => <Roles {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />

        {/*  Circular */}
        <ProtectedRoute exact path={`${subDirectory}/circular/:listType`} render={(props) => {
          return <CircularDataList {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />;
        }} />
        <ProtectedRoute exact path={`${subDirectory}/notification/:actionType/:formType`} render={(props) => {
          return <CircularForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />;
        }} />

        {/* Notification */}
        <ProtectedRoute exact path={`${subDirectory}/notification/:notificationtype/`} render={(props) => <NotificationForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />} />


        {/* Grades */}
        <ProtectedRoute exact path={`${subDirectory}/grade/:action/:formType`} render={(props) => {
          return <GradeForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />;
        }} />
        <ProtectedRoute exact path={`${subDirectory}/grade/:listType`}render={(props) => {
          return <GradeList {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />;
        }} />


        {/*  Mark Entry */}
        <ProtectedRoute exact path={`${subDirectory}/mark/:listType`} render={(props) => {
          return <MarkDataList {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />;
        }} />
        <ProtectedRoute exact path={`${subDirectory}/mark/:action/:formType`} render={(props) => {
          return <MarkForm {...props} session={session} isPageLoadingFalse={isPageLoadingFalse} isPageLoadingTrue={isPageLoadingTrue} />;
        }} />

        {/* REPORT */}
        <ProtectedRoute exact path={`${subDirectory}/reports/:reporttype`}render={(props) =>
          <ReportsForm {...props}
            session={session}
            isPageLoadingFalse={isPageLoadingFalse}
            isPageLoadingTrue={isPageLoadingTrue} />}
        />
      </Switch>
    );
  }
}

export default Routes;

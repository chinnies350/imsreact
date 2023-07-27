import React from "react";
import * as FAIcons from "react-icons/fa";
import { subDirectory } from "../../config.json";

const Menus = {
  dashboard: {
    url: `${subDirectory}/dashboard`,
    icon: <FAIcons.FaLayerGroup />,
    text: "Dashboard",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],
  },

  group: {
    url: `${subDirectory}/dashboard`,
    icon: <FAIcons.FaUserCircle />,
    text: "Group",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],
    //submenus
    submenu: {
      Clients: { name: "Groups", text: "Groups", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/client/list` },
      "Group Profile": { name: "Profile", text: "Profile", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/Group Profile` },
    },
  },
  institutions: {
    url: `${subDirectory}/dashboard`,
    icon: <FAIcons.FaUserCircle />,
    text: "Institution",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],

    //submenus
    submenu: {
      Institution: { name: "Institution", text: "Institution", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/client/list` },

      "Institution Profile": { name: "Profile", text: "Profile", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/Institution Profile` },
    },
  },
  roles: {
    url: `${subDirectory}/roles`,
    icon: <FAIcons.FaCriticalRole />,
    text: "Roles",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],
  },

  groupmasters: {
    url: `${subDirectory}/dashboard`,
    icon: <FAIcons.FaUserMd />,
    text: "Group Masters",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],
    //submenus
    submenu: {
      Religion: { name: "Religion", text: "Religion", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/settings/religion` },

      Caste: { name: "Caste", text: "Caste", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/settings/caste` },
      SubCaste: { name: "SubCaste", text: "Sub-Caste", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/settings/subcaste` },

      Language: { name: "Language", text: "Language", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/settings/language` },
      // "Religion": { "name": "Religion", "text": "Religion",  "icon": <FAIcons.FaCircleNotch />, "url":`${subDirectory}/settings/religion`  },
      State: { name: "State", text: "State", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/settings/state` },
      Title: { name: "Title", text: "Title", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/settings/title` },
    },
  },
  institutionmasters: {
    url: `${subDirectory}/dashboard`,
    icon: <FAIcons.FaUserMd />,
    text: "Institution Masters",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],
    //submenus
    submenu: {
      Department: { name: "Department", text: "Department", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/settings/department` },
      Batch: { name: "Batch", text: "Batch", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/settings/batch` },
      BoardType: { name: "BoardType", text: "Board Type", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/settings/boardtype` },

      Grade: { name: "Grade", text: "Grade", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/grade/grade` },
      Skills: { name: "Skills", text: "Skills", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/grade/skills` },
      "Assessment Weightage": { name: "AssessmentWeightage", text: "Assessment Weightage", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/grade/assessmentWeightage` },
      "Subject Weightage": { name: "SubjectWeightage", text: "Subject Weightage", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/grade/subjectWeightage` },
      Holiday: { name: "Holiday", text: "Holiday", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/attendance/holiday` },
    },
  },
  scheduling: {
    url: `${subDirectory}/dashboard`,
    icon: <FAIcons.FaWindows />,
    text: "Scheduling",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],

    //submenus
    submenu: {
      "Term Schedule": { name: "Term", text: "Term", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/schedule/term` },
      "Course Schedule": { name: "Course", text: "External Course", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/schedule/course` },
      "Timetable Schedule": { name: "Timetable", text: "Timetable", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/schedule/timetable` },
      "Events Schedule": { name: "Events", text: "Events", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/schedule/event` },
      "Attendance Schedule": { name: "Attendance", text: "Attendance", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/schedule/attendance` },
      "Assignment Schedule": { name: "Assignment", text: "Assignment", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/schedule/assignment` },
      "Homework Schedule": { name: "Homework", text: "Homework", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/schedule/homework` },

      // "Timetable Schedule": { "name": "Timetable", "text": "Timetable",  "icon": <FAIcons.FaCircleNotch />, "url": "/schedule/timetable" },

      // "Attendance Schedule": { "name": "Attendance", "text": "Attendance",  "icon": <FAIcons.FaCircleNotch />, "url": "/schedule/attendance" },

      // "ExternalCourse Schedule": { "name": "ExternalCourse", "text": "External Course",  "icon": <FAIcons.FaCircleNotch />, "url": "/course/externalcourse-list" },

      // "ExternalCourse Schedule": { "name": "ExternalCourse", "text": "External Course",  "icon": <FAIcons.FaCircleNotch />, "url": "/course/externalcourse-list" },
      // "Assignment Schedule": { "name": "Assignment", "text": "Assignment",  "icon": <FAIcons.FaCircleNotch />, "url": "/schedule/assignment" },
      // "Homework Schedule": { "name": "Homework", "text": "Homework",  "icon": <FAIcons.FaCircleNotch />, "url": "/schedule/homework" },
    },
  },
  academics: {
    url: `${subDirectory}/dashboard`,
    icon: <FAIcons.FaUserGraduate />,
    text: "Academics",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],

    //submenus
    submenu: {
      Subject: { name: "Subject", text: "Subject", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/course/subject-list` },
      Syllabus: { name: "Syllabus", text: "Syllabus", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/course/syllabus-list` },
    },
  },

  exam: {
    url: `${subDirectory}/dashboard`,
    icon: <FAIcons.FaWindows />,
    text: "Exam",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],

    //submenus
    submenu: {
      "Exam Schedule": { name: "ExamSchedule", text: "Exam Scheduling", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/schedule/exam` },
      "Online Exam": { name: "OnlineExam", text: "Online Exam Question", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/exam/onlineExam` },
      "Online Exam Status": { name: "OnlineExamStatus", text: "Online Exam Result", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/result` },
      "Offline Exam": { name: "OfflineExam", text: "Offline Exam Question", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/exam/offlineExam` },
      // "GPA Exam Mark": { "name": "OfflineExam", "text": "GPA - Exam Mark",  "icon": <FAIcons.FaCircleNotch />, "url": "/exam/offlineExam" },
      // "CCE Exam Mark": { "name": "OfflineExam", "text": "CCE - Exam Mark",  "icon": <FAIcons.FaCircleNotch />, "url": "/exam/offlineExam" },

      // "GPA Exam Mark": { "name": "OfflineExam", "text": "GPA - Exam Mark",  "icon": <FAIcons.FaCircleNotch />, "url":`${subDirectory}/mark/gpa`  },
      "CCE Exam Mark": { name: "OfflineExam", text: "CCE - Exam Mark", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/mark/cce` },
    },
  },

  staffs: {
    url: `${subDirectory}/dashboard`,
    icon: <FAIcons.FaChalkboardTeacher />,
    text: "Staffs",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],

    //submenus
    submenu: {
      "Staff Registration": { name: "StaffRegistration", text: "Registration", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/staffs` },
      "Staff Timetable": { name: "StaffTimetable", text: "Staff Timetable - View", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/timetable/Staff` },
      "Work Allocation": { name: "WorkAllocation", text: "Adhoc Work Allocation", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/timetable/WorkAllocation` },
      "Staff Attendance": { name: "Staff Attendance", text: "Staff Attendance", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/staffattendance/attendance` },
      "Staff Leave": { name: "Staff Leave", text: "Staff Leave", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/staffleave/leave` },
    },
  },

  timetable: {
    url: `${subDirectory}/dashboard`,
    icon: <FAIcons.FaSchool />,
    text: "Timetable",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],
    //submenus
    submenu: {
      "Class Timetable": { name: "ClassTimetable", text: "Class Timetable", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/timetable/Class` },

      "Exam Timetable": { name: "ExamTimetable", text: "Exam Timetable", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/timetable/exam` },

      // "Exam Timetable": { "name": "ExamTimetable", "text": "Exam Timetable",  "icon": <FAIcons.FaCircleNotch />, "url":`${subDirectory}/timetable/Class`  },
    },
  },

  students: {
    url: `${subDirectory}/dashboard`,
    icon: <FAIcons.FaUserAlt />,
    text: "Students",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],

    //submenus
    submenu: {
      "Student Registration": { name: "StudentRegistration", text: "Registration", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/users` },
      Leave: { name: "Leave", text: "Leave", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/leave/leave` },
      "Assignment Marks": { name: "AssignmentMarks", text: "Assignment Marks", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/assignments/assignment` },
      "Homework Marks": { name: "HomeworkMarks", text: "Homework Status", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/assignments/homework` },
      Transfer: { name: "Transfer", text: "Transfer", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/transfer/transfer` },
    },
  },

  communication: {
    url: `${subDirectory}/dashboard`,
    icon: <FAIcons.FaCreativeCommonsShare />,
    text: "Communication",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],

    //submenus
    submenu: {
      "Credentials-Sms": { name: "CredentialsSMS", text: "SMS Credentials", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/credentials/sms` },
      "Credentials-Mail": { name: "CredentialsMail", text: "Mail Credentials", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/credentials/mail` },
      "Communication Templates": { name: "Templates", text: "Communication Template", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/notification/template` },
      "Sending Sms": { name: "Sms", text: "Sending Sms", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/notification/sms` },
      "Sending Mail": { name: "Mail", text: "Sending Mail", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/notification/mail` },
      "Publish Circular": { name: "Circular", text: "Publish Circular", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/notification/circular` },
    },
  },

  externalCourse: {
    url: `${subDirectory}/dashboard`,
    icon: <FAIcons.FaAddressBook />,
    text: "External Course",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],

    //submenus
    submenu: {
      "ExternalCourse Registration": { name: "ExternalCourseRegistration", text: "Registration", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/course/externalcourse-list` },
    },
  },

  events: {
    url: `${subDirectory}/dashboard`,
    icon: <FAIcons.FaConnectdevelop />,
    text: "Events",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],

    //submenus
    submenu: {
      "Event Registration": { name: "EventRegistration", text: "Registration", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/event/addAttendees` },
      Gallery: { name: "Gallery", text: "Events Gallery", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/event/gallery` },
    },
  },

  feeManagement: {
    url: `${subDirectory}/dashboard`,
    icon: <FAIcons.FaMoneyCheck />,
    text: "Fee Management",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],

    //submenus
    submenu: {
      "Fee Allocation": { name: "FeeAllocation", text: "Fee Allocation", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/fees/feeallocation` },
      "Fee Collection": { name: "FeeCollection", text: "Fee Collection", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/fees/feecollection` },
    },
  },

  reports: {
    url: `${subDirectory}/dashboard`,
    icon: <FAIcons.FaFileAlt />,
    text: "Reports",
    userTypes: ["sadmin", "client", "entity", "student", "staff"],
    level: ["client"],
    //submenus
    submenu: {
      "Attendance Reports": { name: "Attendance", text: "Attendance", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/reports/attendance` },
      "Assignment Reports": { name: "Assignment", text: "Assignment", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/reports/assignment` },
      "Mark Reports": { name: "Mark", text: "Student Mark", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/reports/mark` },
      "Homework Reports": { name: "Homework", text: "Homework", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/reports/homework` },
      "SubjectWise Reports": { name: "SubjectWise", text: "Subject wise Mark statement", icon: <FAIcons.FaCircleNotch />, url: `${subDirectory}/reports/staff` },
    },
  },
};

export default Menus;

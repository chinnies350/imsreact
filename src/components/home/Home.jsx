// import React, { Fragment } from 'react';

// class Home extends React.Component {
//   componentDidMount() {

//   }
//   componentWillUnmount() {

//   }
//   render() {
//     return (
//         <Fragment>

//         </Fragment>
//     );
//   }
// }

// export default Home;

import React, { Fragment } from "react";
import "../../styles/Home.scss";
import { subDirectory } from "../../config.json";
import logo from "../../assets/images/home/logo.png";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledCarousel, Modal, ModalHeader, ModalBody } from "reactstrap";
import RequestDemo from "./RequestDemo";
import ReachUs from "./ReachUs";
import FeedBack from "./FeedBack";
import Lottie from "react-lottie";
import lesson from "../../assets/images/home/lesson.json";
import wellcome from "../../assets/images/home/wellcome.json";
import follow from "../../assets/images/home/follow.json";
import live from "../../assets/images/home/live2.json";
import message from "../../assets/images/home/messaging.json";
import wphone from "../../assets/images/home/wphone.json";

import company from "../../assets/images/home/company.json";
import { addVisitor, getNumberOfVisitor } from "../../services/homeService";
import Count from "./Count";
import VisibilitySensor from "react-visibility-sensor";
import image1 from "../../assets/images/home/ScreenShot/s1.png";
import image2 from "../../assets/images/home/ScreenShot/s2.png";
import m1 from "../../assets/images/home/ScreenShot/m1.png";
import m2 from "../../assets/images/home/ScreenShot/m2.png";
import student from "../../assets/images/home/student.jpg";
import staff from "../../assets/images/home/staff.jpg";

import parent from "../../assets/images/home/parent.jpg";

import admin from "../../assets/images/home/admin.jpg";

import Fade from "react-reveal/Fade";

const items = [
  {
    src: "http://globalacademy.lk/wp-content/uploads/2018/04/highschool-student-sitting-on-a-bench.jpg",
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: "http://globalacademy.lk/wp-content/uploads/2018/04/highschool-student-sitting-on-a-bench.jpg",
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: "http://globalacademy.lk/wp-content/uploads/2018/04/highschool-student-sitting-on-a-bench.jpg",
    altText: "",
    caption: "",
    header: "",
  },
];
//  const Laptops= [image1,image2]
const screenshots = [
  {
    src: image1,
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: image2,
    altText: "",
    caption: "",
    header: "",
  },
  // {
  //   src: "/assets/images/screen2.png",
  //   altText: "",
  //   caption: "",
  //   header: "",
  // },
  // {
  //   src: "/assets/images/screen4.png",
  //   altText: "",
  //   caption: "",
  //   header: "",
  // },
  // {
  //   src: "/assets/images/screen5.png",
  //   altText: "",
  //   caption: "",
  //   header: "",
  // },
  // {
  //   src: "/assets/images/screen6.png",
  //   altText: "",
  //   caption: "",
  //   header: "",
  // },
  // {
  //   src: "/assets/images/screen7.png",
  //   altText: "",
  //   caption: "",
  //   header: "",
  // },
];
const mobiles = [
  {
    src: m1,
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: m1,
    altText: "",
    caption: "",
    header: "",
  },
  // {

  //   src:m2,
  //   altText: "",
  //   caption: "",
  //   header: "",
  // },
];
class Home extends React.Component {
  constructor(props) {
    super(props);
    // this.toggle = this.toggle.bind(this);
    // this.modaltoggle = this.modaltoggle.bind(this);
    this.state = {
      isOpen: false,
      islogin: false,
      isTerms: false,
      isRequestDemo: false,
      isReachUs: false,
      Visitors: 0,
      visibility: false,
      Laptops: [image1, image2],
      Mobile: [m1, m2],
      selectedLap: image1,
      selectedMobile: m1,
      Index: 0,
    };
  }

  componentDidMount = async () => {
    console.log("home pages");
    // let login = localStorage.getItem("login");
    let login = sessionStorage.getItem("login");
    if (login) await this.setState({ islogin: true });

    setInterval(() => {
      this.setState((prevState) => {
        if (prevState.Index < this.state.Laptops.length) {
          return {
            selectedLap: this.state.Laptops[prevState.Index + 1],
            selectedMobile: this.state.Mobile[prevState.Index + 1],
            Index: prevState.Index + 1,
          };
        } else {
          return {
            selectedLap: this.state.Laptops[0],
            selectedMobile: this.state.Mobile[0],
            Index: 0,
          };
        }
      });
    }, 3000);
    //  const response= await addVisitor();

    // // const response=await getNumberOfVisitor();
    // if(response.data.statusCode==1){
    //   await this.setState({Visitors:response.data.data})
    // }
    // else{
    // await this.setState({Visitors:0})
    // }
    //       console.log("addvisitor",response)
  };
  //   changeImage=()=>{
  // document.getElementById("ScreenShotImg").src=Laptops[index]
  // let item=0;
  // if(index<Laptops.length-1){
  // item=index+1
  // }
  // console.log(Laptops[index],"hi",index)
  // // setTimeout(this.changeImage(item),10000)
  //   }

  toggle = (type) => {
    if (type == "isRequestDemo") {
      return this.setState((prevState) => ({
        isRequestDemo: !prevState.isRequestDemo,
      }));
    }

    if (type == "isTerms") {
      return this.setState((prevState) => ({
        isTerms: !prevState.isTerms,
      }));
    }
    if (type == "isOpen") {
      return this.setState((prevState) => ({
        isOpen: !prevState.isOpen,
      }));
    }
    if (type == "isReachUs") {
      return this.setState((prevState) => ({
        isReachUs: !prevState.isReachUs,
      }));
    }
  };
  // modaltoggle(type) {

  //   this.setState(prevState => ({
  //     modal: !prevState.modal
  //   }));
  // }
  render() {
    const { islogin } = this.state;
    // const defaultOptions = {
    //   loop: true,
    //   autoplay: true,
    //   animationData: lesson,
    //   rendererSettings: {
    //     preserveAspectRatio: "xMidYMid slice",
    //   },
    // };
    return (
      <Fragment>
        <Fade top>
          <button
            className="btn-request"
            onClick={() => {
              this.toggle("isRequestDemo");
            }}
          >
            <span>Request Demo</span>
          </button>
        </Fade>

        <div
          className="home-page

"
        >
          <div class="homenavbar">
            <Navbar color="light" light className="bgwhite" expand="md">
              <NavbarBrand href="/ims">
                <img
                  className="homelogo"
                  alt=""
                  src={logo}
                  // src="https://www.bluewhyte.com/assets/images/school-management-icon.png"
                />
                <span className="brandname">Institute Management System</span>
              </NavbarBrand>
              <NavbarToggler onClick={() => this.toggle("isOpen")} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink
                      className="homeloginbtn"
                      onClick={() => {
                        this.toggle("isReachUs");
                      }}
                    >
                      Reach Us
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                  <NavLink
                    className="homeloginbtn"
                    onClick={() => {
                      this.toggle("isRequestDemo");
                    }}
                  >
                    Request A Demo
                  </NavLink>
                </NavItem> */}
                  <NavItem>
                    {!islogin && (
                      <NavLink className="homeloginbtn" href={`${subDirectory}/login`}>
                        Login
                      </NavLink>
                    )}
                    {islogin && (
                      <NavLink className="homeloginbtn" href="/dashboard">
                        Dashboard
                      </NavLink>
                    )}
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>

          <div className="row m-0">
            <div className="col p-0 m-0 heading p-5">
              <p className="heading-title  w-100">Makes Education Simple...</p>
            </div>

            <div className="col m-0 pr-5">
              <div className="w-100 h-lotie">
                {" "}
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: wellcome,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  // height={550}
                  // width={550}
                />
              </div>
            </div>

            {/* <div >
<UncontrolledCarousel items={items} class="custom-shape-divider-bottom-1620022822" /> 
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
    </svg>
</div> */}
          </div>

          <div class="custom-shape-divider-bottom-1620027004">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
            </svg>
          </div>

          {/* <div>
          <img className="bannerImg" src="https://cdn-images-1.medium.com/max/2600/1*gOwMfjZn3odOcYdCatiHCw.png" alt="" />

        </div> */}

          <section className="pb-0">
            <div class="container">
              <div class="row text-center about">
                <h5 class="uppercase  text-center w-100 h-heading mt-3 ">
                  <span className="headstyle ">About Us</span>
                </h5>
                <p className="about-content"> Edu Group is a cloud based solution to digitize and manage the group of educational institutions or Individual institutes and Schools. It helps institute of any size to manage the students, teachers, exams,courses, academic programs, graduation/transfer of students, students performance monitoring by parent in one window</p>
                {/* <div class="col-md-6 col-sm-6">
            <Lottie options={{
      loop: true,
      autoplay: true, 
      animationData: company,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }}
              height={400}
              width={400}
        /> */}
                {/* <img src="/assets/images/screen1.png" alt="" /> */}
                {/* </div>
              <div class="col-md-6 col-sm-6 card-border">
                <h5 class="uppercase mb16 text-center">
                  <span className="headstyle ">About Us</span>
                </h5>

                <p>
                  Prematix Software Solution has started at Hosur in 2009 and registered in 2015 at Chennai, has cross-functional alliance with some of the most successful technology companies like
                  Almawiz Technologies Pvt. Ltd., CILICO Microelectronics Ltd., Wipro Technologies, Google Inc. and Microsoft Corporation.
                </p>
                <p>
                  Creators of Software Products using the latest technologies - Artificial Intelligence, Machine Learning (ML), Deep Learning (DL), Natural Language Processing (NLP), Robotic Process
                  Automation and Customized Web/Mobile Application Software Development & Maintenance catering to various Industries like Government, Manufacturing, Energy, Automotive, Electronics,
                  Education, etc. Additional to the sophisticated development centre at Hosur, we have a development centre at Bangalore and Research Centre at Goa.
                </p>

     
              </div> */}
              </div>
            </div>
          </section>

          <section>
            <div class="container">
              <h5 class="uppercase  text-center w-100 h-heading  mb-4">
                <span className="headstyle  ">Our System made for</span>
              </h5>
              <div class="container">
                <div class="row">
                  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="our-team">
                      <div class="team-content">
                        <h3 class="headstyle">Students</h3>
                        {/* <h4 class="title">Web Developer</h4> */}
                      </div>
                      <div class="picture">
                        {/* <img class="img-fluid" src="https://picsum.photos/130/130?image=1027" /> */}
                        <img class="img-fluid" src={student} />
                      </div>

                      {/* <ul class="social">
          <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-facebook" aria-hidden="true"></a></li>
          <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-twitter" aria-hidden="true"></a></li>
          <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-google-plus" aria-hidden="true"></a></li>
          <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-linkedin" aria-hidden="true"></a></li>
        </ul> */}
                    </div>
                  </div>
                  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="our-team">
                      <div class="team-content">
                        <h3 class="headstyle">Staffs</h3>
                      </div>
                      <div class="picture">
                        {/* <img class="img-fluid" src="https://picsum.photos/130/130?image=839" /> */}
                        <img class="img-fluid" src={staff} />
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="our-team">
                      <div class="team-content">
                        <h3 class="headstyle">Parents</h3>
                      </div>
                      <div class="picture">
                        {/* <img class="img-fluid" src="https://picsum.photos/130/130?image=856" /> */}
                        <img class="img-fluid" src={parent} />
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="our-team">
                      <div class="team-content">
                        <h3 class="headstyle">Admin</h3>
                      </div>
                      <div class="picture">
                        {/* <img class="img-fluid" src="https://picsum.photos/130/130?image=836" /> */}
                        <img class="img-fluid" src={admin} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bgwhite pt-0">
            <div class="container p-4">
              <div class="row">
                <div class="col-md-6 col-sm-6 center-all p-1 pt-3">
                  <div>
                    <h5 class="uppercase mb16 text-center h-heading mb-4">
                      <span className="headstyle">Features</span>
                    </h5>
                    <p>Automates institution’s diversified operations from student, staff, attendance, exams, mark / grade, time table, fees collection to event / course management</p>
                    <p>
                      {/* <i className="tickmark">&#10004;</i> */}
                      <i className="fa fa-eercast tickmark"></i>
                      Assignment and Homework Management
                    </p>
                    <p>
                      <i className="fa fa-eercast tickmark"></i>
                      Attendance and HoliDay Management
                    </p>
                    <p>
                      <i className="fa fa-eercast tickmark"></i>
                      Staff and Student Management
                    </p>

                    <p>
                      <i className="fa fa-eercast tickmark"></i>
                      Exam and Fees Management
                    </p>
                    <p>
                      <i className="fa fa-eercast tickmark"></i>
                      Notification Management
                    </p>
                    <p>
                      <i className="fa fa-eercast tickmark"></i>
                      Roles Management
                    </p>
                    {/* <p>
                  <i className="tickmark">&#10004;</i>
                  Exam Management
                </p> */}
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 ">
                  <div className="w-100">
                    <Lottie
                      options={{
                        loop: true,
                        autoplay: true,
                        animationData: lesson,
                        rendererSettings: {
                          preserveAspectRatio: "xMidYMid slice",
                        },
                      }}
                      // height={500}
                      // width={500}
                    />
                  </div>

                  {/* <img src="/assets/images/screen2.png" alt="" /> */}
                </div>
              </div>
            </div>
          </section>

          <section
          //  className="modulessectionbg"
          >
            <div class="container">
              <div>
                <h5 className="uppercase mb16 text-center h-heading mb-3">
                  <span className="headstyle">Modules</span>
                </h5>
              </div>
              <div class="row">
                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24 mb64">
                    <div class="left">
                      <i class="ti-user icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">Student</h5>
                      <p>Helps a school to manage student's data, reports, communications and scheduling </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24 mb64">
                    <div class="left">
                      <i class="ti-user icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">Staff</h5>
                      <p>Manage the staff data, time table scheduling and work allocation</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24">
                    <div class="left">
                      <i class="ti-shield icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">User Roles and Access</h5>
                      <p>Manage different role based access to the students, parents, staff and admin.</p>
                    </div>
                  </div>
                </div>

                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24 mb64">
                    <div class="left">
                      <i class="ti-pencil-alt icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">{/* Schedule */}Exam</h5>
                      <p>Exam scheduling, questionnaire, mark / grade sheet and ranking maintenance.</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24 mb64">
                    <div class="left">
                      <i class="ti-book icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">Assignment and Homework</h5>
                      <p>Allows to maintain assignment / homework / evaluation mark at student level. </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24 mb64">
                    <div class="left">
                      <i class="ti-calendar icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">Attendance</h5>
                      <p>Maintains attendance details of student's against his / her class time table.</p>
                    </div>
                  </div>
                </div>

                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24 mb64">
                    <div class="left">
                      <i class="ti-widgetized icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">Time Table</h5>
                      <p>Allows to maintain study / exam time table at class level and staff level. </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24 mb64">
                    <div class="left">
                      <i class="ti-bookmark-alt icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">Course</h5>
                      <p>Helps to manage multiple courses and batches according to the institute plan. </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24 mb64">
                    <div class="left">
                      <i class="ti-medall icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">Branch</h5>
                      <p>Institute can manage their multiple branches under one umbrella.</p>
                    </div>
                  </div>
                </div>

                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24">
                    <div class="left">
                      <i class="ti-infinite icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">Leave</h5>
                      <p>Helps to manage the leaves and approval records of students and staff.</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24">
                    <div class="left">
                      <i class="ti-dashboard icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">Online Exam</h5>
                      <p>Allows teachers to conduct online exams, skill tests as per the schedule.</p>
                    </div>
                  </div>
                </div>

                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24">
                    <div class="left">
                      <i class="ti-settings icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">Settings</h5>
                      <p>Allows to setup the group, institute and branch level required master data.</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24 mb64">
                    <div class="left">
                      <i class="ti-star icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">CCE and GPA System</h5>
                      <p>Allows teachers to evaluate and grade the students as per the institute grading system. </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24">
                    <div class="left">
                      <i class="ti-bell icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">Notification</h5>
                      <p>Allows communication between institute and student / staff / parents.</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24 mb64">
                    <div class="left">
                      <i class="ti-notepad  icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">Event</h5>
                      <p>Event organization, participation nomination, schedule and fees maintenance. </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24 mb64">
                    <div class="left">
                      <i class="ti-credit-card icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">Fees</h5>
                      <p>Assign, collect and maintain the fee details of students for all the applicable courses and events </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24">
                    <div class="left">
                      <i class="ti-layers-alt icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">Reports</h5>
                      <p>Generate reports for attendance, fees, homework status and exam / assignment marks.</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6">
                  <div class="feature feature-3 mb-xs-24">
                    <div class="left">
                      <i class="ti-clipboard icon-sm"></i>
                    </div>
                    <div class="right">
                      <h5 class="uppercase mb16">Question Paper</h5>
                      <p>Allows to create, modify, preview, delete and print subject / course wise question paper.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <h5 className="uppercase text-center h-heading mb-5 mt-4">
              <span className="headstyle">Across all Devices</span>
            </h5>
            <div className="row w-100 devices" style={{ position: "relative" }}>
              {/* <div className="col laptop">
        <div style={{width:"70%"}} className=" mt-5 container d-flex  flex-column justify-content-center align-item-center vertical-center">
       <UncontrolledCarousel items={screenshots} />
                </div>
                </div> */}
              {/* <div class="col-md-6 col-sm-6">
              <Lottie options={{
      loop: true,
      autoplay: true, 
      animationData: live,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }}
              height={400}
              width={600}
        /> */}
              {/* <img src="/assets/images/screen2.png" alt="" /> */}
              {/* </div> */}
              <div className="col-3 ml-3">
                {/* <div  className="mobile container d-flex  flex-column justify-content-left align-item-left"> */}
                <div className="mobile  ml-auto">
                  {/* <UncontrolledCarousel items={mobiles} /> */}
                  <img src={this.state.selectedMobile || m1} id="MobileImg" alt="" />
                </div>
              </div>
              <div class="col-7 pl-0">
                <div className=" pl-0 laptop container d-flex  flex-column justify-content-center align-item-center vertical-center">
                  {/* <UncontrolledCarousel items={screenshots} /> */}
                  <img src={this.state.selectedLap || image1} id="LapImg" alt="" />
                </div>
                {/* <UncontrolledCarousel items={screenshots} /> */}
              </div>

              <div className="deviceloti" style={{ position: "absolute", right: "0", bottom: "20px", width: "20%" }}>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: wphone,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  // height={200}
                  // width={250}
                />
              </div>
            </div>
          </section>
          {/* <div className="screenshotDiv">
        
          <UncontrolledCarousel items={screenshots} />
        </div> */}
          {/* "#e0e5eb" */}
          <div className="" style={{ width: "100%", backgroundColor: "#cfe4fc", color: "#4d4d4d" }}>
            <div className="row p-4 mx-auto" style={{ width: "100%" }}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.493758889838!2d77.80971441503708!3d12.746414223227651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae70e0d185bcb5%3A0x793afe538d273fed!2sPrematix+Software+Solution+Private+Limited!5e0!3m2!1sen!2sin!4v1551953577004" width="600" height="450" frameborder="0" style={{ border: 0, width: "100%" }} allowfullscreen title="Map"></iframe>
              {/* 
            <div class="col">
              <div class="footer-title">
                <h6>
                  <i class="fa fa-map-marker icongradient" aria-hidden="true"></i>&nbsp;Location
                </h6>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.493758889838!2d77.80971441503708!3d12.746414223227651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae70e0d185bcb5%3A0x793afe538d273fed!2sPrematix+Software+Solution+Private+Limited!5e0!3m2!1sen!2sin!4v1551953577004"
                title="Map"
                width="280"
                height="280"
                frameborder="0"
                style={{ border: 0, width: "100%" }}
                allowfullscreen
              ></iframe>
            </div> */}

              {/* <div className="col">
              <h6>Feedback</h6>
              <FeedBack />
            </div> */}
            </div>

            {/* <section className="getintouch-section"> 
           <div class="container">
            <div class="row">
              <div class="col-md-6 col-sm-6">
              </div>
              <div class="col-md-4 col-sm-4">
                <div className="getintouchdiv">
                  <h4>Get in Touch</h4>
                  <div>
                    <div className="inputdiv">
                      <Input type="text" name="name" placeholder="Name" />
                    </div>
                    <div className="inputdiv">
                      <Input type="text" name="email" placeholder="Email" />
                    </div>
                    <div className="inputdiv">
                      <Input type="text" name="phone" placeholder="Phone" />
                    </div>
                    <div className="inputdiv">
                      <Input type="textarea" name="message" rows="6" placeholder="Message" />
                    </div>
                    <div className="text-right">
                      <Button color="primary" size="sm">Send Message</Button>
                    </div>
                  </div>
                </div>

              </div>
              <div class="col-md-2 col-sm-2">
              </div>
            </div>
          </div> 
        </section>*/}

            <section className="p-0">
              <div class="container">
                <div class="row">
                  <div class="col-md-3 col-sm-3">
                    <div>
                      <h5 class="uppercase mb16">
                        <i class="ti-map icon-sm icongradient"></i> Address
                      </h5>
                      <p>Address : 51, Step colony, Dharga, Hosur - 635 126, Tamilnadu, India.</p>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-3">
                    <div>
                      <h5 class="uppercase mb16">
                        <i class="ti-mobile icon-sm icongradient"></i> Phone
                      </h5>
                      <p>
                        +91 9344270900
                        <br />
                        Mon-Fri 9:30am - 06:30pm
                      </p>
                    </div>
                  </div>

                  <div class="col-md-3 col-sm-3">
                    <div>
                      <h5 class="uppercase mb16">
                        <i class="ti-email icon-sm icongradient  "></i> Email
                      </h5>
                      <p>
                        info@prematix.com
                        <br />
                        24*7 Online Support
                      </p>
                    </div>
                  </div>

                  <div class="col-md-3 col-sm-3">
                    <div>
                      {/* <h5 class="uppercase mb16"> */}
                      {/* <i class="fa fa-mobile icongradient "></i> */}
                      {/* Follow us on */}
                      {/* </h5> */}
                      <div className="socialicons m-0 p-0" style={{ color: "white" }}>
                        <div class="follow mb-1" style={{ width: "20%", marginLeft: "-10px" }}>
                          <Lottie
                            options={{
                              loop: true,
                              autoplay: true,
                              animationData: follow,
                              rendererSettings: {
                                preserveAspectRatio: "xMidYMid slice",
                              },
                            }}
                            className="m-0"
                            height={60}
                            width={60}
                          />

                          {/* <img src="/assets/images/screen2.png" alt="" /> */}
                        </div>

                        <i class="ti-twitter icon-sm"></i>
                        <i class="ti-facebook icon-sm"></i>
                        <i class="ti-linkedin icon-sm"></i>
                        <i class="ti-youtube icon-sm"></i>
                        <i class="ti-google icon-sm"></i>
                      </div>
                    </div>
                  </div>
                  {/* <div class="col-md-3 col-sm-3">
                  <div>
                 
               
                    <p color="danger"
                    //  onClick={() => this.toggle("isTerms")
                     >
                     terms and condition
              
                    </p>
                  </div>
                  <div className="socialicons" style={{ color: "white" }}>
                    <i class="ti-twitter icon-sm"></i>
                    <i class="ti-facebook icon-sm"></i>
                    <i class="ti-linkedin icon-sm"></i>
                    <i class="ti-youtube icon-sm"></i>
                    <i class="ti-google icon-sm"></i>
                  </div>
                </div> */}
                </div>
              </div>
            </section>
            <div style={{ width: "12rem" }} className="mx-auto">
              <VisibilitySensor
                onChange={(isVisible) => {
                  this.setState({ visibility: isVisible });
                }}
              >
                <p className="m-0 p-1 home text-center counter">
                  <i>
                    No of Visitors:
                    {this.state.visibility ? (
                      <Count
                        // number={`${this.state.Visitors}`}
                        number={`20`}
                        duration={"1"}
                      />
                    ) : (
                      0
                    )}
                  </i>
                </p>
              </VisibilitySensor>
              {/* <p className="card m-0 p-2 home text-center">No of Visitors:<Count
    // number={`${this.state.Visitors}`}
    number={`20`}

     duration={"1"}/></p> */}
            </div>
            <div className="designedbydiv">
              <p>Design and Developed by Prematix Software Solution</p>
            </div>
          </div>

          <>
            {/* terms and condition model */}
            <Modal isOpen={this.state.isTerms} toggle={() => this.toggle("isTerms")} className={this.props.className}>
              <ModalHeader toggle={() => this.toggle("isTerms")}>Terms & Conditions</ModalHeader>
              <ModalBody>
                <p>
                  <i className="tickmark">&#10004;</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p>
                  <i className="tickmark">&#10004;</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p>
                  <i className="tickmark">&#10004;</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p>
                  <i className="tickmark">&#10004;</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p>
                  <i className="tickmark">&#10004;</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p>
                  <i className="tickmark">&#10004;</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </ModalBody>
            </Modal>
            {/* request demo model */}
            <Modal isOpen={this.state.isRequestDemo} toggle={() => this.toggle("isRequestDemo")} className="">
              <ModalHeader toggle={() => this.toggle("isRequestDemo")}> Request Demo</ModalHeader>
              <ModalBody>
                <RequestDemo toggle={() => this.toggle("isRequestDemo")} />
              </ModalBody>

              {/* reach us modal */}
            </Modal>
            <Modal isOpen={this.state.isReachUs} toggle={() => this.toggle("isReachUs")} className="">
              <ModalHeader toggle={() => this.toggle("isReachUs")}> Reach Us</ModalHeader>
              <ModalBody>
                <ReachUs toggle={() => this.toggle("isReachUs")} />
              </ModalBody>
            </Modal>
          </>
        </div>
      </Fragment>
    );
  }
}

export default Home;

import ProtectedRoute from 'components/common/protectedRoute';
import { ToastContainer, } from 'react-toastify';
import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';
import auth from 'services/authService';
import Routes from 'components/common/Routes';
import Header from 'components/common/header';
import SideNav from 'components/common/sideNav';
import ForgotPassword from 'components/core/forgotForm';
import Home from 'components/home/Home';
import Login from 'components/core/loginForm';
import Loading from 'components/common/loading';
import 'react-toastify/dist/ReactToastify.css';
// import Timetable from 'components/timetable';

import { subDirectory } from '../config.json'


class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  

  async componentDidMount() {
    await this.init()
  }

  init = async () => {
    const user = await auth.getCurrentUser();
    await this.setState({ session: user })
  }

  isPageLoadingFalse = async () => {
    await this.setState({ isPageLoading: false })
  }

  isPageLoadingTrue = async () => {
    await this.setState({ isPageLoading: true })
  }


  render() {
    const { session, isPageLoading } = this.state;
    let props = { "session": session }

    return (
      <Router>
        <>
        <ToastContainer />
        {(session && session !== null) ?
          <div>
        
            {isPageLoading &&
              <Loading ></Loading>}
            <div className="row no-gutters bg-white page-user page-client">
              <Header props={props} />
              <div className="col-3 col-md-2">
                <SideNav props={props} />
              </div>
              <div className="col-9 col-md-10 content">

                <div className="pad20">
                  <Routes session={session} isPageLoadingFalse={this.isPageLoadingFalse} isPageLoadingTrue={this.isPageLoadingTrue} />
                </div>
              </div>
            </div>
          </div> :
          <Router basename="/ims" >
            
            <Router>
     


              <Switch>
                {/* HOME PAGE  */}

                <Redirect from={`${subDirectory}/`} to={`${subDirectory}/home`} exact />


                <Route path={`${subDirectory}/home`} component={Home} />
                <Route path={`${subDirectory}/login`} component={Login} />
                <Route path={`${subDirectory}/forgotpassword`} component={ForgotPassword} />
              </Switch>
            </Router>
          </Router>
        }
        </>
      </Router>
    );
  }
}

export default App;

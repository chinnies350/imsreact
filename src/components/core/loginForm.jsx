import Joi from "joi-browser";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Alert, FormGroup } from "reactstrap";

import auth from "services/authService";
import Form from "components/common/form";
import Loading from "components/common/loading";
// import Logo from 'components/common/logo';
import { subDirectory } from "../../config.json";
import Lottie from "react-lottie";

import login from "../../assets/images/home/login.json";
import avathar from "../../assets/images/avathar.png";
class Login extends Form {
  state = {
    data: { username: "", password: "", ref: "", next: "" },
    errors: {},
    isLoading: false,
  };

  schema = {
    username: Joi.string().required().label("Email/UserId"),
    password: Joi.string().required().label("Password"),
    ref: Joi.string().empty("").optional(),
    next: Joi.string().empty("").optional(),
  };

  componentWillMount() {}
  componentDidMount() {
    let tokenkey = localStorage.length;
    if (tokenkey !== 0) {
      localStorage.clear();
      window.location.reload();
    } else {
    }
  }

  doSubmit = async () => {
    try {
      this.setState({ isLoading: true, errors: {} });
      const { data } = this.state;
      const result = await auth.login(data.username, data.password, data.ref, data.next);

      let role = result && result.data && result.data.role;
      let uid = result && result.data && result.data.uid;

      if (role === "sadmin") {
        window.location = `${subDirectory}/dashboard`;
      } else {
        if (uid) window.location = `${subDirectory}/${uid}/profile`;
        else window.location = `${subDirectory}/dashboard`;
      }
      //window.location = `/dashboard`
    } catch (ex) {
      this.setState({ isLoading: false });
      if (ex.response && ex.response.data) {
        const errors = { ...this.state.errors, ...ex.response.data };
        this.setState({ errors });
      } else {
        const errors = { ...this.state.errors, message: "Sorry some error occurred. Please try again", class: "danger" };
        this.setState({ errors });
      }
    }
  };

  render() {
    const { isLoading, errors } = this.state;
    return (
      <Fragment>
        <div className="row page-login page-login-bg p-0 m-0">
          <div className="col home" style={{ minWidth: "50%" }}>
            <div className="w-100 container d-flex justify-content-center align-item-center vertical-center">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: login,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                // height={600}
                // width={600}
              />
            </div>
          </div>

          <div className="col">
            <div className="container d-flex  flex-column justify-content-center align-item-center vertical-center" style={{ maxWidth: "500px", minWidth: "250px" }}>
              <h6 className="login-heading pb-4">Institute Management System</h6>

              <div className="col-10 col-sm-12 col-md-12 bg-white p-4 logindivbg ">
                <div className="text-center">
                  {/* <Logo className="d-block" /> */}
                  <label className="loginacctxt">Login to access your account</label>
                  <div>
                    <img
                      alt="login"
                      className="loginavatar"
                      // src="https://cdn4.iconfinder.com/data/icons/men-avatars-icons-set-1/256/6-512.png"
                      src={avathar}
                    />
                  </div>
                </div>
                <form className="form-container form-container--login" onSubmit={this.handleSubmit}>
                  {this.renderInput("username", "UserId / Email *")}
                  {this.renderInput("password", "Password *", "password")}
                  <FormGroup className="d-flex font-13">
                    {/* <NavLink to="/forgotpassword" key="Hello">Forgot Password?</NavLink> */}
                    <NavLink to={`${subDirectory}/forgotpassword`} key="Hello">
                      Forgot Password?
                    </NavLink>
                  </FormGroup>
                  <div className="d-block my-md-3 text-right">{this.renderButton(isLoading ? <Loading color="white" /> : "Login", "submit", "btn btn-primary loginbtn font-13")}</div>
                  {errors && errors.message && <Alert color={errors.class}>{errors.message}</Alert>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;

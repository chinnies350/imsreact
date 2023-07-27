import { Col, Row, Container } from "reactstrap";
import Header from "components/common/header";
import SideNav from "components/common/sideNav";
import React, { Component, Fragment } from "react";
import DashboardList from "components/dashboard/dashboard";
import "styles/App.scss";

export default class Dashboard extends Component {
  state = {
    data: [],
    dasboard: false,
  };

  async componentWillMount() {
    await this.props.isPageLoadingTrue();
  }
  async componentDidMount() {
    console.log("dashboard page came")
    let userType = this.props.session.data.userType;
    let name = this.props.session.data.name;
    await this.setState({ dashboard: true, userType, name });
  }

  render() {
    const { session } = this.props;
    const { dashboard, userType, name } = this.state;

    return (
      <div className="">
        <Fragment>
          <Container fluid>
            <br />
            <Row>
              <Col sm={12}>
                <h5>Dashboard</h5>
              </Col>
              <Col sm={12} className="dashboarduser">
                <h5>WELLCOME - {name} </h5>
                <p>
                  You have logged in as <strong>{userType}</strong>
                </p>
              </Col>
            </Row>
            {dashboard && <DashboardList props={this.props} />}
          </Container>
        </Fragment>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Chart from 'react-google-charts';


import DashboardItem from 'components/common/dashboardItem';

import bluebg from './../../images/blue.png';
import greenbg from './../../images/green.png';
import purple from './../../images/purple.png';

import './style.scss';


export default class Dashboard extends Component {
  render() {
    return (
      <Container fluid>
        <br />
        <Row>
          <h6>Dashboard</h6>
        </Row>
        <Row>
          <Col sm="4">
            <DashboardItem value="250" title="Total No of Users" bg={purple} />
          </Col>
          <Col sm="4">
            <DashboardItem value="250" title="Total Course" bg={greenbg} />
          </Col>
          <Col sm="4">
            <DashboardItem value="250" title="Total Batch" bg={bluebg} />
          </Col>
        </Row>

        {/* <Row className="flex-column">

          <h5>Daily Attendance Overview</h5>
          <div style={{ display: 'flex', maxWidth: 900 }}>
            <Chart
              width={600}
              height={300}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['x', 'dogs', 'cats'],
                [0, 0, 0],
                [1, 10, 5],
                [2, 23, 15],
                [3, 17, 9],
                [4, 18, 10],
                [5, 9, 5],
                [6, 11, 3],
                [7, 27, 19],
              ]}
              
            />
          </div>


        </Row> */}
      </Container >

    );
  }
}


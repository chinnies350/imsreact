import React, { Component } from 'react';
import * as FAIcons from 'react-icons/fa';
import { Container, Row, Col } from 'reactstrap';
// import CustomCard from 'components/common/customCard';
import TabsItem from 'components/common/tabItem';

import 'react-picky/dist/picky.css';

import {subDirectory} from '../../../config.json'

export default class ViewSchedule extends Component {

  constructor(props, context) {

    super(props, context);
    this.state = {}

  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }




  render() {

    return (
      <div>
        <Container fluid> <br />
          <Row>
            <h6> View Schedule</h6><br />
          </Row>

          <Row>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaHourglassHalf />} text="Add Schedule" to={`${subDirectory}/main/add_schedule`} />
            </Col>
            <Col sm="3">
              <TabsItem icon={<FAIcons.FaUserClock />} text="View Schedule" active={true} to={`${subDirectory}/main/view_schedule`} />
            </Col>
          </Row>


        </Container>
      </div>
    );
  }
}



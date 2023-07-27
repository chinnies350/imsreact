import React, { Component } from 'react';
import {Row, Container} from 'reactstrap'; 

 
export default class ViewEventDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentWillMount() {
    
  }

  render() {
    return (
      <Container fluid>
        <br />
        <Row>
          <h6>View Event Details</h6>
        </Row>
        
      </Container>
    );
  }
}
import React, { Component } from 'react';
import { Container, Row,Col} from 'reactstrap';
import CustomCard from 'components/common/customCard'

import './style.scss'

import {subDirectory} from '../../../config.json'

export default class CourseDetails extends Component {
  constructor(props) {
    super(props);     
    
    if(this.props.location.state.ViewCourseData !== undefined){
      this.state = {
        selectedCourseDetails: this.props.location.state.ViewCourseData,
      }
    }
   
  }

  componentDidMount(){
   
  }

   

  render() {
    return (
      <div>
        <Container fluid> <br />         
          <Row>
            <h6>View Course Details</h6>
          </Row> 
          <br /> 
            
        
         
        <CustomCard >  
          <Row>
          <h5 style={{textAlign: 'center',width: '100%'}}>Course Details</h5>
          </Row>
            <Row >
              <br/>
                <Col sm="6">
                <div>
                <h6  color="primary" style={{fontSize: '25px'}}>{this.state.selectedCourseDetails.displayName}</h6> <br/>
                 <Row>
                   <Col sm="6"><h6>Code</h6></Col> 
                   <Col sm="6">: {this.state.selectedCourseDetails.code}</Col>
                 </Row><br/>
                 <Row>
                   <Col sm="6"><h6>Fee</h6></Col>
                   <Col sm="6">: ₹ {this.state.selectedCourseDetails.fee}</Col>
                 </Row>
                 </div>
                </Col>
                
                <Col sm="6" style={{textAlign:"center"}}>
                <div>
                <img  src={this.state.selectedCourseDetails.banner.path} style={{height: '200px',width: '200px'}} />
                </div>
               
               
                </Col>
            </Row><br/>
            <Row>
          <h5 style={{textAlign: 'center',width: '100%'}}>Staff Details</h5>
          </Row><br/>
            <Row  >
              <br/>
              <Col sm="6" style={{textAlign:"center"}}>
                <img src={this.state.selectedCourseDetails.author[0].pictureUrl} style={{height: '200px',width: '200px'}} />
               
                </Col>
                <Col sm="6">
                <Row>
                   <Col sm="6"><h6>Title</h6></Col>
                   <Col sm="6">: {this.state.selectedCourseDetails.author[0].title}</Col>
                 </Row><br/>
                 <Row>
                   <Col sm="6"><h6>Name</h6></Col>
                   <Col sm="6">{this.state.selectedCourseDetails.author[0].displayName}</Col>
                 </Row>
                 <br/>
                 <Row>
                   <Col sm="6"><h6>Description</h6></Col>
                   <Col sm="6">{this.state.selectedCourseDetails.author[0].desc}</Col>
                 </Row>
                </Col>
                
            </Row>
 
            
          </CustomCard>   
          </Container>      
    </div>
    );
  }
 }
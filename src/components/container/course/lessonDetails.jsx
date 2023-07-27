import React, { Component } from 'react';
import { Container, Row,Col} from 'reactstrap';
import CustomCard from 'components/common/customCard';

import './style.scss'


export default class LessonDetails extends Component {
  constructor(props) {
    super(props);     
      
    if(this.props.location.state.ViewLessonData !== undefined){
      this.state = {
        selectedlessonDetails: this.props.location.state.ViewLessonData,
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
            <h6>View Lesson Details</h6>
          </Row> 
          <br /> 
             
         
        <CustomCard > 
        <Row>
          <h5 style={{textAlign: 'center',width: '100%'}}>Lesson Details</h5>
          </Row><br/> 
              <Row>
                   <Col sm="6"><h6>Subject Code</h6></Col> 
                   <Col sm="6">: {this.state.selectedlessonDetails.SubjectCode}</Col>
                 </Row><br/>
                 <Row>
                   <Col sm="6"><h6>Subject Name</h6></Col> 
                   <Col sm="6">: {this.state.selectedlessonDetails.subjectName}</Col>
                 </Row><br/>
                 <Row>
                   <Col sm="6"><h6>Lesson Name</h6></Col> 
                   <Col sm="6">: {this.state.selectedlessonDetails.chapterName}</Col>
                 </Row><br/>
             
          </CustomCard>   
          </Container>      
    </div>
    );
  }
 }
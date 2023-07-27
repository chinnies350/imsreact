import React, { Component } from 'react';
import { Container, Row,Col} from 'reactstrap';
 
import CustomCard from 'components/common/customCard'
 



import './style.scss'


export default class SubjectDetails extends Component {
  constructor(props) {
    super(props);   
    
    if(this.props.location.state.ViewsubjectData !== undefined){
      this.state = {
        selectedsubjectDetails: this.props.location.state.ViewsubjectData,
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
            <h6>View Subject Details</h6>
          </Row> 
         
        <CustomCard >  
        <Row>
          <h5 style={{textAlign: 'center',width: '100%'}}>Subject Details</h5>
          </Row><br/>
          <Row >
              <br/>
                <Col sm="6">
                <div>
                <h6  color="primary" style={{fontSize: '25px'}}>{this.state.selectedsubjectDetails.displayName}</h6> <br/>
                 <Row>
                   <Col sm="6"><h6>Code</h6></Col> 
                   <Col sm="6">: {this.state.selectedsubjectDetails.code}</Col>
                 </Row><br/>
                 
                 </div>
                </Col>
                 
            </Row><br/>

             <Row>
          <h5 style={{textAlign: 'center',width: '100%'}}>Author Details</h5>
          </Row><br/>
            <Row  >
              <br/>
              <Col sm="6" style={{textAlign:"center"}}>
                <img src={this.state.selectedsubjectDetails.author[0].pictureUrl} style={{height: '200px',width: '200px'}} />
               
                </Col>
                <Col sm="6">
                <Row>
                   <Col sm="6"><h6>Title</h6></Col>
                   <Col sm="6">: {this.state.selectedsubjectDetails.author[0].title}</Col>
                 </Row><br/>
                 <Row>
                   <Col sm="6"><h6>Name</h6></Col>
                   <Col sm="6">{this.state.selectedsubjectDetails.author[0].displayName}</Col>
                 </Row>
                 <br/>
                 <Row>
                   <Col sm="6"><h6>Description</h6></Col>
                   <Col sm="6">{this.state.selectedsubjectDetails.author[0].desc}</Col>
                 </Row>
                </Col>
                
            </Row>
          </CustomCard>   
          </Container>      
    </div>
    );
  }
 }
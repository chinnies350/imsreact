import React, { Component, Fragment } from 'react'
import { Container } from 'reactstrap';
import Header from 'components/common/header';
import Loading from 'components/common/loading';
import SideNav from 'components/common/sideNav';

import GPA from 'components/markentry/form/gpa'
import CCE from 'components/markentry/form/cce'

export default class MarkForm extends Component {

  state = {
    data: {},
    isPageLoading: true,
    isLoading: true,
  }

  componentDidMount = async () => {
    this.setState({ isLoading: false, isPageLoading: false })
  }

  renderForm = (actionType, formType) => {
 
    switch (formType) {
      case 'gpa':
        return <GPA formType={formType} actionType={actionType} props={this.props} />
      case "cce":
        return <CCE formType={formType} actionType={actionType} props={this.props} />
      default:
        return null;
    }
  }

  render() {
    const { isPageLoading, isLoading } = this.state;
    const { action, formType } = this.props.match.params;
    const { session } = this.props;
    return (
      <Fragment >
       
              {isPageLoading && <Loading />}
              {!isPageLoading && !isLoading &&
                <Fragment>
                  <Container fluid>
                    <div className="mb-4">

                    </div>
                    <div>
                      {this.renderForm(action, formType)}
                    </div>

                  </Container>
                </Fragment>
              }
           
      </Fragment >
    )
  }
}

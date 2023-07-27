import React from "react";
import { Form } from "informed";

import { Input, Textarea,CustomSelect } from "../common/forms";
import { Col, Row } from "reactstrap";
import { validateProperty } from "../Validation/JoiValidation";
import { addRequestDemo } from "../../services/homeService";
import ToastService from '../../services/toastService';

class RequestDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      types: [
        { name: 'School', code: 'School' },
        { name: 'College', code: 'College' },
        { name: 'Institute', code: 'Institute' },
        { name: 'University', code: 'University' },

      ],
    };
  }

  // validateProperty = (name, value) => {
  //     const schema = Joi.reach(Joi.object(this.schema), name)
  //     const { error } = Joi.validate(value, schema);
  //     return error ? error.details[0].message : null;
  //   };

  //   schema = {
  //     branch: Joi.string().required().label("Branch"),
  //     client: Joi.string().required().label("Client"),
  //     entity: Joi.string().required().label("Entity")
  //   };

  setFormApi = (formApi) => {
    this.formApi = formApi;
  };
  onSubmit =async () => {
    console.log(this.formApi.getState().values,this.props);
    let data=this.formApi.getState().values;
    const res = await addRequestDemo(data)
    console.log(res)
    this.props.toggle()
    if (res.data.statusCode === 1) {
    
     await ToastService.Toast(`${res.data.message}`, "default")
    } else {
     await  ToastService.Toast(`${res.data.message}`, "default")
    }
  };
  render() {
    return (
      <>
        <div>
          <Form getApi={this.setFormApi} onSubmit={this.onSubmit}>
            {({ formApi, formState }) => (
              <div className="">
                <Row>
                  <Col>
                    <Input faClass={"fa fa-user icongradient"} field="fullName" label="Name" name="Name" validateOnBlur validate={(e) => validateProperty(true, "personname", e, "First Name")} />
                  </Col>
                  <Col>
                    <Input faClass={"fa fa-envelope icongradient"} field="emailId" label="Email" name="Email" validateOnBlur validate={(e) => validateProperty(true, "email", e, "Last Name")} />
                  </Col>
                  {/* <Col>
                    <Input faClass={"fa fa-user icongradient"} field="lastname" label="Last Name" name="Last Name" validateOnBlur validate={(e) => validateProperty(true, "personname", e, "Last Name")} />
                  </Col> */}
                </Row>

                <Row>
                  {/* <Col>
                    <Input faClass={"fa fa-envelope icongradient"} field="email" label="Email" name="Email" validateOnBlur validate={(e) => validateProperty(true, "email", e, "Last Name")} />
                  </Col> */}

                  <Col >
                    <Input faClass={"fa fa-phone icongradient"} field="contactNo" label="Contact" name="Contact" validateOnBlur 
                    validate={(e) => validateProperty(true, "contact", e, "Contact")}
                     />
                  </Col>
                  <Col>
                  <CustomSelect field="instituteType"
                   faClass={"fa fa-building icongradient"} 
                   label="Institute Type*" name="instituteType" 
                   getOptionValue={option => option.code} 
                   getOptionLabel={option => option.name} 
                   validateOnBlur validate={(e) => validateProperty(true, "other", e, "Institute Type")} options={this.state.types}  />

                     {/* <Input list="instituteType" faClass={"fa fa-building icongradient"} id="instituteType" field="instituteType" label="Institute Type" name=" instituteType" validateOnBlur validate={(e) => validateProperty(true, "other", e, "Institute Type")} /> */}

                  </Col>
                  <Col>
                    <Input faClass={"fa fa-user icongradient"} field="noOfStudents" label="No of Students" name="No of Students" validateOnBlur validate={(e) => validateProperty(true, "number", e, "No of Students")} />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Input
                      faClass={"fa fa-building icongradient"}
                      field="instituteName"
                      label="Institute Name"
                      name="Institute Name"
                      validateOnBlur
                      validate={(e) => validateProperty(true, "other", e, "Institute Name")}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Input faClass={" fa fa-map-marker icongradient"} field="locationName" label="Address" name="Address" validateOnBlur validate={(e) => validateProperty(true, "address", e, "Address")} />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Textarea faClass={"fa fa-edit icongradient"}  field="requirement" label="Your Requirement" name="requirement" validate={(e) => validateProperty(true, "other", e, "Requierement")} />
                  </Col>
                </Row>

                <div className="text-right">
                  <button type="submit" className="btn btn-primary btn-sm">
                    Submit
                  </button>
                </div>
              </div>
            )}
          </Form>
        </div>
      </>
    );
  }
}

export default RequestDemo;

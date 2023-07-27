import React from "react";
import { Form } from "informed";

import { Input, Textarea } from "../common/forms";
import { Col, Row } from "reactstrap";
import { validateProperty } from "../Validation/JoiValidation";
import ToastService from '../../services/toastService';
import { addReachUs } from "../../services/homeService";
class ReachUs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount=()=>{
    console.log(this.props)
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
const res = await addReachUs(data)

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
                    <Input faClass={"fa fa-user icongradient"} field="name" label="Name" name="Name" validateOnBlur validate={(e) => validateProperty(true, "personname", e, "Name")} />
                  </Col>
                  <Col>
                    <Input faClass={"fa fa-envelope icongradient"} field="emailId" label="Email" name="Email" validateOnBlur validate={(e) => validateProperty(true, "email", e, "Last Name")} />
                  </Col>
                </Row>

                <Row>
               

                  <Col>
                    <Input faClass={"fa fa-phone icongradient"} field="contactNo" label="Contact" name="Contact" validateOnBlur validate={(e) => validateProperty(true, "contact", e, "Contact")} />
                  </Col>
                  
                  <Col>
                    <Input faClass={"fa fa-edit icongradient"} field="subject" label="Subject" name="subject" validateOnBlur validate={(e) => validateProperty(true, "other", e, "Contact")} />
                  </Col>
                </Row>

   

                <Row>
                  <Col>
                    <Input faClass={" fa fa-map-marker icongradient"} field="address" label="Address" name="Address" validateOnBlur validate={(e) => validateProperty(true, "address", e, "Address")} />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Textarea faClass={"fa fa-comment icongradient"}field="message" label="Message" name="message" validate={(e) => validateProperty(true, "other", e, "Requierement")} />
                  </Col>
                </Row>

                <div className="text-right">
                  <button type="submit"  className="btn btn-primary btn-sm">
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

export default ReachUs;

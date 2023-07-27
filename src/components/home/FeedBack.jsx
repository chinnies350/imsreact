import React from "react";
import { Form } from "informed";

import { Input, Textarea } from "../common/forms";
import { Col, Row } from "reactstrap";
import { validateProperty } from "../Validation/JoiValidation";
class FeedBack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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
  onSubmit = () => {
    console.log(this.formApi.getState().values,this.props);
    this.formApi.reset()
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
            </Row>

                <Row>
               

                  
                  <Col>
                    <Input faClass={"fa fa-phone icongradient"} field="contact" label="Contact" name="Contact"
                     validateOnBlur validate={(e) => validateProperty(true, "contact", e, "Contact")} />
                  </Col>
                </Row>

   

            

                <Row>
                  <Col>
                    <Textarea faClass={"fa fa-comment icongradient"}field="comment" label="Comment" name="Comment" validate={(e) => validateProperty(true, "other", e, "Requierement")} />
                  </Col>
                </Row>

                <div className="text-left">
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

export default FeedBack;

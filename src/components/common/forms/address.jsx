import { Input, SimpleAutoSuggest } from "components/common/forms";
import { Scope } from "informed";
import Joi from "joi-browser";
import React, { Component, Fragment } from "react";
import { Col, Row } from "reactstrap";
import { Form } from "informed";
export const addressSchema = {
  no: Joi.string().empty("").optional(),
  street: Joi.string().empty("").optional(),
  address1: Joi.string().required().label("Address Line 1"),
  address2: Joi.string().empty("").optional(),
  // city: Joi.object(this.optionSchema).label("City"),
  //    state: Joi.object(this.optionSchema).label("State"),
  // country: Joi.object(this.optionSchema).label("Country"),
  city: Joi.string().required().label("City"),
  state: Joi.string().required().label("State"),
  district: Joi.string().required().label("District"),
  country: Joi.string().required().label("Country"),
  pincode: Joi.number().required().label("Pin code"),
  email: Joi.string().required().label("Email ID"),
  contactno: Joi.string().required().label("Contact Number"),
  fax: Joi.string().empty("").optional(),
};

export class AddressComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pincode: "",
    };
  }
  
  getPincodeValues = async (pinCode, scope) => {
    let response = "";
    await fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
      .then((res) => res.text())
      .then((text) => (response = JSON.parse(text)));
    console.log("pincode", response);

    if (response[0]["Status"] === "Success") {
      if (scope == "primary") {
        if (this.formApi) {
          let values = this.formApi.getState().values;
          if (values.primary) {
            values.primary.city = response[0]["PostOffice"][0]["Block"];
            values.primary.pincode = response[0]["PostOffice"][0]["Pincode"];
            values.primary.state = response[0]["PostOffice"][0]["State"];
            values.primary.district = response[0]["PostOffice"][0]["District"];
            this.formApi.setValues(values);
            console.log(values);
          }
        }
        // let data = {
        //   primary: {
        //     city: response[0]["PostOffice"][0]["Block"],
        //     pincode: response[0]["PostOffice"][0]["Pincode"],
        //     state: response[0]["PostOffice"][0]["State"],
        //     district: response[0]["PostOffice"][0]["District"],
        //   },
        // };
        // console.log(data);
        // this.formApi.setValues(data);
        // this.formApi.setValues({ primary: data.primary });
      } else if (scope == "secondary") {
        if (this.formApi) {
          let values = this.formApi.getState().values;
          if (values.secondary) {
            values.secondary.city = response[0]["PostOffice"][0]["Block"];
            values.secondary.pincode = response[0]["PostOffice"][0]["Pincode"];
            values.secondary.state = response[0]["PostOffice"][0]["State"];
            values.secondary.district = response[0]["PostOffice"][0]["District"];
            this.formApi.setValues(values);
            console.log(values);
          }
        }
        // let data = {
        //   secondary: {
        //     city: response[0]["PostOffice"][0]["Block"],
        //     pincode: response[0]["PostOffice"][0]["Pincode"],
        //     state: response[0]["PostOffice"][0]["State"],
        //     district: response[0]["PostOffice"][0]["District"],
        //   },
        // };
        // console.log(data);
        // this.formApi.setValues({});
      }

      // this.formApi.setValues({
      // city: response[0]["PostOffice"][0]["Block"],
      //   pincode: response[0]["PostOffice"][0]["Pincode"],

      //   state: response[0]["PostOffice"][0]["State"],
      //   district: response[0]["PostOffice"][0]["District"],
      // });
    }
  };

  pincodeChange = async (e, scope) => {
    console.log(e.target.value, { scope });
    if (e.target.value.length < 6) {
      return false;
    }
    await this.getPincodeValues(e.target.value, scope);
  };
  // getPincodeValues = async (pinCode) => {
  //   let response = "";
  //   await fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
  //     .then((res) => res.text())
  //     .then((text) => (response = JSON.parse(text)));
  //   console.log("pincode", response);

  //   if (response[0]["Status"] === "Success") {
  //     this.formApi.setValues({
  //       city: response[0]["PostOffice"][0]["Block"],
  //       pincode: response[0]["PostOffice"][0]["Pincode"],

  //       state: response[0]["PostOffice"][0]["State"],
  //       district: response[0]["PostOffice"][0]["District"],
  //     });
  //   }
  // };
  // pinCodeChange = async (e) => {
  //   if (e.target.value.length < 6) {
  //     return false;
  //   }
  //   await this.getPincodeValues(e.target.value);
  // };
  setFormApi = (formApi) => {
    this.formApi = formApi;
    console.log(this.formApi);
  };
  render() {
    const { scope, validateProperty, isDisabled, ...rest } = this.props;
    return (
      <Fragment>
        {!isDisabled && (
          <Scope scope={scope}>
            {console.log({ scope }, "scope")}
            {/* <Form getApi={this.setFormApi}>
                     {({ formApi, formState }) => (*/}
            <>
              <Row>
                <Col sm={12} md={3}>
                  <Input label="No" field="no" validateOnBlur validate={(e) => validateProperty(`${scope}.no`, e)} {...rest} />
                </Col>
                <Col sm={12} md={9}>
                  <Input label="Street" field="street" validateOnBlur validate={(e) => validateProperty(`${scope}.street`, e)} {...rest} />
                </Col>
              </Row>
              <Input label="Address Line 1*" field="address1" validateOnBlur validate={(e) => this.props.validateProperty(`${scope}.address1`, e)} {...rest} />
              <Input label="Address Line 2" field="address2" validateOnBlur validate={(e) => this.props.validateProperty(`${scope}.address2`, e)} {...rest} />

              <Row>
                <Col sm={12} md={2}>
                  <Input
                    label="Pin Code*"
                    field="pincode"
                    //   onChange={this.pinCodeChange}
                    validateOnBlur
                    validate={(e) => validateProperty(`${scope}.pincode`, e)}
                    {...rest}
                    onChange={(e) => this.pincodeChange(e, scope)}
                  />
                </Col>
                <Col sm={12} md={6}>
                  {/* <SimpleAutoSuggest label="City" field="city" suggestType="city" validateOnBlur validate={e => validateProperty(`${scope}.city`, e)} /> */}
                  <Input label="City*" field="city" validateOnBlur validate={(e) => this.props.validateProperty(`${scope}.city`, e)} {...rest} />
                </Col>
                <Col sm={12} md={4}>
                  <Input
                    label="District*"
                    field="district"
                    suggestType="District"
                    // getOptionValue={(option) => (option['label'])}
                    validateOnBlur
                    validate={(e) => validateProperty(`${scope}.district`, e)}
                    {...rest}
                  />
                </Col>
                <Col sm={12} md={4}>
                  <Input
                    label="State*"
                    field="state"
                    suggestType="state"
                    // getOptionValue={(option) => (option['label'])}
                    validateOnBlur
                    validate={(e) => validateProperty(`${scope}.state`, e)}
                    {...rest}
                  />
                </Col>
                {/* <Col sm={12} md={2}>
                  <Input
                    label="Pin Code*"
                    field="pincode"
                    //   onChange={this.pinCodeChange}
                    validateOnBlur
                    validate={(e) => validateProperty(`${scope}.pincode`, e)}
                    {...rest}
                    onChange={(e) => this.props.pincodeChange(e, scope)}
                  />
                </Col> */}
              </Row>
            </>
            {/* //  )}
                    // </Form> */}
          </Scope>
        )}

        {isDisabled && (
          <Scope scope={scope}>
            <Row>
              <Col sm={12} md={3}>
                <Input label="No" field="no" {...rest} />
              </Col>
              <Col sm={12} md={9}>
                <Input label="Street" field="street" {...rest} />
              </Col>
            </Row>
            <Input label="Address Line 1*" field="address1" {...rest} />
            <Input label="Address Line 2" field="address2" {...rest} />
            <Row>
              <Col sm={12} md={2}>
                <Input label="Pin Code*" field="pincode" {...rest} />
              </Col>
              <Col sm={12} md={6}>
                <Input label="City*" field="city" {...rest} />
              </Col>
              <Col sm={12} md={4}>
                <SimpleAutoSuggest label="State*" field="state" suggestType="state" getOptionValue={(option) => option["label"]} {...rest} isDisabled />
              </Col>
              {/* <Col sm={12} md={2}>
                <Input label="Pin Code*" field="pincode" {...rest} />
              </Col> */}
            </Row>
          </Scope>
        )}
      </Fragment>
    );
  }
}

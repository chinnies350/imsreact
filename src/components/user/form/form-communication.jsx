import Joi from "joi-browser";
import React, { Fragment, Component } from "react";

import { Form } from "informed";
import { CustomCheckBox } from "components/common/forms";
import { AddressComponent, addressSchema } from "components/common/forms/address";
import { saveUser, getsuserListData } from "services/userService";
import ToastService from "services/toastService";

import { subDirectory } from "../../../config.json";
import _ from "lodash";

export default class CommunicationForm extends Component {
  state = {
    uid: "",
    data: {
      primary: {},
      sameAsPrimary: true,
      secondary: {},
    },

    errors: {},
    requiredfield: ["address1", "city", "pincode", "state"],
    isLoading: true,
  };

  schema = {
    primary: Joi.object(addressSchema),
    sameAsPrimary: Joi.boolean(),
    secondary: Joi.object(addressSchema),
  };

  async componentDidMount() {
    let { uid, user } = this.props;
    user = await this.getSampleData();
    this.setState({ uid });
    this.formApi.setValues(user);
  }

  getSampleData = async () => {
    const { uid, data } = this.props;
    let params = `usersList?uid=${uid}&type=user&client=${data.clientid}&entity=${data.entityid}&branch=${data.branch}`;
    const userListData = await getsuserListData(params);
    let userData = userListData.data.data[0];
    let communicationData = userData && userData.communication && userData.communication[0];
    this.setState({
      client: userData.client,
      entity: userData.entity,
      branch: userData.branch,
      uid: userData.uid,
    });

    if (communicationData && communicationData.primary && communicationData.primary[0]) {
      return {
        primary: communicationData.primary[0] || "",
        secondary: communicationData.secondary[0] || "",
      };
    }
    return {
      primary: "",
      secondary: "",
    };
  };

  mapToViewModel(user) {
    return {
      primary: user.address ? user.address : {},
      sameAsPrimary: user.sameAsPrimary ? user.sameAsPrimary : false,
      secondary: user.secondary ? user.secondary : {},
    };
  }

  validateProperty = (name, value) => {
    const schema = Joi.reach(Joi.object(this.schema), name);
    const { error } = Joi.validate(value, schema);
    return error ? error.details[0].message : null;
  };

  handleSameAsPrimary = (e) => {
    if (e.target.checked === true) {
      if (this.formApi) {
        let values = this.formApi.getState().values;
        if (values.primary) {
          values["secondary"] = values.primary;
          this.formApi.setValues(values);
        }
      }
    } else {
      if (this.formApi) {
        let values = this.formApi.getState().values;
        if (values.primary) {
          values["secondary"] = {};
          this.formApi.setValues(values);
        }
      }
    }
    this.setState({});
  };

  setFormApi = (formApi) => {
    this.formApi = formApi;
  };

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
  onSubmit = async () => {
    const { props } = this.props;
    const { client, entity, branch, uid } = this.state;
    const data = this.formApi.getState().values;
    const { primary, secondary } = data;

    let primaryfulladdress;
    primaryfulladdress = (primary.no || "") + "," + primary.street + "," + primary.address1 + "," + (primary.address2 || "") + primary.city + "," + primary.state.label + "," + primary.pincode + ".";
    if (primary.address2) primaryfulladdress = (primary.no || "") + "," + primary.street + "," + primary.address1 + "," + primary.city + "," + primary.state.label + "," + primary.pincode + ".";

    let secondaryfulladdress;

    secondaryfulladdress = (secondary.no || "") + "," + secondary.street + "," + secondary.address1 + "," + (secondary.address2 || "") + "," + secondary.city + "," + secondary.state.label + "," + secondary.pincode + ".";

    if (secondary.address2) secondaryfulladdress = (secondary.no || "") + "," + secondary.street + "," + secondary.address1 + "," + secondary.city + "," + secondary.state.label + "," + secondary.pincode + ".";

    data.primary.displayFullAddress = primaryfulladdress;
    data.secondary.displayFullAddress = secondaryfulladdress;
    let params = `client=${client}&entity=${entity}&branch=${branch}&uid=${uid}`;
    const result = await saveUser("communication", params, data);
    if (result.data.statusCode === 1) {
      ToastService.Toast(`Communication Details Updated Successfully`, "default");
      props.history.push(`${subDirectory}/${client}/${entity}/${branch}/${uid}/edit/education`);
    } else if (result.data.statusCode === 0) ToastService.Toast(result.data.message, "default");
    else ToastService.Toast(`Failed to update Communication Details`, "default");
  };

  render() {
    return (
      <Fragment>
        <Form getApi={this.setFormApi} onSubmit={this.onSubmit} initialValues={""}>
          {({ formApi, formState }) => (
            <Fragment>
              <section>
                <h6>Primary Address ( Permanent Address )</h6>
                <AddressComponent scope="primary" validateProperty={this.validateProperty} pincodeChange={this.pincodeChange} />
              </section>

              <section>
                <h6>Secondary Address ( Temporary Address )</h6>
                <CustomCheckBox field="sameAsPrimary" checkboxLabel="Same As Primary" validateOnBlur validate={(e) => this.validateProperty("sameAsPrimary", e)} onChange={this.handleSameAsPrimary} />

                <AddressComponent scope="secondary" validateProperty={this.validateProperty} pincodeChange={this.pincodeChange} />
              </section>
              <div className="text-right">
                {console.log(formState)}

                {/* {console.log(formState.values.primary?_.isEqual(Object.keys(formState.values.primary),this.state.requiredfield):null)} */}
                {/*              
                {formState.values.primary&&formState.values.secondary?console.log(((!(this.state.requiredfield.map(field=>{
             return     Object.keys(formState.values.primary).some(requiredfield=>{
               
return requiredfield==field
                  })
                })).includes(false))&&((!(this.state.requiredfield.map(field=>{
                  return     Object.keys(formState.values.secondary).some(requiredfield=>{
                     
     return requiredfield==field
                       })
                     })).includes(false))))):false


      
                     
                      */}

                {/* //when we enter the all required than only save button visible  */}
                {formState.values.primary && formState.values.secondary ? (
                  !this.state.requiredfield
                    .map((field) => {
                      return Object.keys(formState.values.primary).some((requiredfield) => {
                        return requiredfield == field;
                      });
                    })
                    .includes(false) &&
                  !this.state.requiredfield
                    .map((field) => {
                      return Object.keys(formState.values.secondary).some((requiredfield) => {
                        return requiredfield == field;
                      });
                    })
                    .includes(false) ? (
                    <button type="submit" className="btn btn-primary btn-sm">
                      Save & Next
                    </button>
                  ) : null
                ) : (
                  false
                )}
                {/* 
                <button type="submit" className="btn btn-primary btn-sm">
                  Save & Next
                </button> */}
              </div>
            </Fragment>
          )}
        </Form>
      </Fragment>
    );
  }
}

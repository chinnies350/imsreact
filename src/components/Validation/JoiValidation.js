import Joi from "joi-browser";

export const validateProperty = (
  required,
  name,
  value,
  label = "Current Field",
  anyVal = null
) => {
  let Joischema = {};
  if (required) {
    Joischema = {
      personname: Joi.string()
        .regex(/^[a-zA-Z,. ]*$/)
        .label(label)
        .error(() => {
          return { message: "Name should be string" };
        })
        .required(),
      address: Joi.string().label(label).required(),
      name: Joi.string().label(label).required(),
      postalCode: Joi.number()
        .integer()
        .min(100000)
        .max(999999)
        .label(label)
        .error(() => {
          return { message: "Enter Correct Postal Code" };
        })
        .required(),
      url: Joi.string().label(label).required(),
      password: Joi.string().label(label).required(),
      email: Joi.string().email().label(label).required(),
      age: Joi.number().integer().min(0).max(99).required(),
      Aadharno: Joi.number()
        .integer()
        .min(100000000000)
        .max(999999999999)
        .label(label)
        .error(() => {
          return { message: "Enter Correct Aadhar No" };
        })
        .required(),
      contact: Joi.number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        .label(label)
        .error(() => {
          return { message: "Enter Correct Mobile Number" };
        })
        .required(),
      loc: Joi.number()
        .label(label)
        .error(() => {
          return { message: "Choose from map" };
        })
        .required(),
      time: Joi.string()
        .label(label)
        .error(() => {
          return { message: "Choose the time" };
        })
        .required(),
      other: Joi.string().label(label).required(),
      number: Joi.number().integer().min(0).label(label).required(),
      otherNumber: Joi.number().integer().min(1).max(5).label(label).required(),
      select: Joi.any().label(label).required(),
      otherInt: Joi.number().label(label).required(),
      file: Joi.string().label(label).required(),
      date: Joi.string().label(label).required(),
      radio: Joi.string()
        .label(label)
        .error(() => {
          return { message: "Select any one" };
        })
        .required(),
      numberRange: Joi.number()
        .integer()
        .min(anyVal ? anyVal["min"] : 0)
        .max(anyVal ? anyVal["max"] : 10)
        .label(label)
        .required(),
      checkboxgroup: Joi.array()
        .min(1)
        .error(() => {
          return { message: `Select at least one ${label}` };
        })
        .required(),
      gst: Joi.string()
        .min(15)
        .max(15)
        .label(label)
        .error(() => {
          return { message: "Enter Correct GST Number" };
        })
        .required(),
      percentNumber: Joi.number().min(0).max(100).label(label).required(),
    };
  } else {
    Joischema = {
      personname: Joi.string()
        .regex(/^[a-zA-Z,. ]*$/)
        .label(label)
        .error(() => {
          return { message: "Name should be string" };
        })
        .allow(null),
      name: Joi.string().label(label).allow(null),
      address: Joi.string().label(label).allow(null),
      postalCode: Joi.number()
        .integer()
        .min(100000)
        .max(999999)
        .label(label)
        .error(() => {
          return { message: "Enter Correct Postal Code" };
        })
        .allow(null),
      url: Joi.string().label(label).allow(null),
      password: Joi.string().label(label).allow(null),
      email: Joi.string().email().label(label).allow(null),
      age: Joi.number().integer().min(0).max(99).allow(null),
      contact: Joi.number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        .label(label)
        .error(() => {
          return { message: "Enter Correct Mobile Number" };
        })
        .allow(null),
      loc: Joi.number()
        .label(label)
        .error(() => {
          return { message: "Choose from map" };
        })
        .allow(null),
      time: Joi.string()
        .label(label)
        .error(() => {
          return { message: "Choose the time" };
        })
        .allow(null),
      other: Joi.string().label(label).allow(null),
      number: Joi.number()
        .integer()
        .min(0)
        .label(label)
        .error(() => {
          return { message: "Enter the number" };
        })
        .allow(null),
        numberRange: Joi.number()
        .integer()
        .min(anyVal ? anyVal["min"] : 0)
        .max(anyVal ? anyVal["max"] : 10)
        .label(label)
        .error(() => {
          return { message: "Enter the number" };
        })
        .allow(null),
      otherNumber: Joi.number()
        .integer()
        .min(1)
        .max(50)
        .label(label)
        .allow(null),
      select: Joi.any().label(label).allow(null),
      otherInt: Joi.string().label(label).allow(null),
      file: Joi.string().label(label).allow(null),
      date: Joi.string().label(label).allow(null),
      radio: Joi.string()
        .label(label)
        .error(() => {
          return { message: "Select any one" };
        })
        .allow(null),
      gst: Joi.string()
        .min(15)
        .max(15)
        .label(label)
        .error(() => {
          return { message: "Enter Correct GST Number" };
        })
        .allow(null),
      Aadharno: Joi.number()
        .integer()
        .min(100000000000)
        .max(999999999999)
        .label(label)
        .error(() => {
          return { message: "Enter Correct Aadhar No" };
        })
        .allow(null),
      percentNumber: Joi.number().min(0).max(100).label(label).allow(null),
    };
  }
  const schema = Joi.reach(Joi.object(Joischema), name);
  const { error } = Joi.validate(value, schema);
  return error ? error.details[0].message : undefined;
};

const fileTypes = {
  image: ["jpg", "png", "jpeg"],
  xl: ["xlsx", "xlsm", "xls", "xlsx", "xlsm", "xlsb", "ods"],
  doc: ["doc", "docx", "odt", "txt"],
};
const Messages = {
  image: "Upload only Images",
  xl: "Upload only Images",
  doc: "Upload only Images",
};

export const fileSizeValidation = (
  file,
  fileType = "image",
  size = 200,
  required = false
) => {
  console.log(file);
  console.log(file.size / 1024);
  if (file.size / 1024 > 200) {
    return {
      status: false,
      message: "Uploading File should be less than " + size + "",
      file: file,
    };
  }
  if (!fileTypes["image"].includes(file.name.split(".")[1].toLowerCase())) {
    return { status: false, message: Messages["image"], file: file };
  }
  return { status: true, message: "Success", file: file };
};

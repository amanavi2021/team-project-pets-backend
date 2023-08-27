const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");
// eslint-disable-next-line
const dateRegexp = /^(0[1-9]|[12][0-9]|3[01])\-(0[1-9]|1[0-2])\-\d{4}$/;
// eslint-disable-next-line
const cityRegexp =/^[a-zA-Z\u0080-\u024F]+(?:([\\ \\-\\']|(\\.\\ ))[a-zA-Z\u0080-\u024F]+)*$/;



const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  token: {
    type: String,
    default: "",
  }, 
  refreshToken: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  phone: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  birthday: {
    type: String,
    match: [dateRegexp, "Use date format DD-MM-YYYY"],
    default: '01-01-2001',
  },
  avatarURL: {
    type: String,
    default: '',
  },
  favorite: [{
    type: Schema.Types.ObjectId,
    default: [],
    ref: 'notice',
  }],
},{versionKey:false, timestamps: true});

userSchema.post("save", handleMongooseError);


//  Joi schemas

const registrationSchema = Joi.object({
// eslint-disable-next-line
  password: Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,16}$/).messages({
    'string.base': 'The password must be a string.',
    'any.required': 'The password field is required',
    'string.pattern.base': 'The password must includes at least one capital letter, lowercase letter and number, and consist of minimum 6 and maximum 16 characters.',
  }),
// eslint-disable-next-line
  email: Joi.string().required().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).min(2).max(255).messages({
    'string.base': 'Email must be a string.',
    'any.required': 'Email field is required',
    'string.min': 'Email must be not less 2 symbols.',
    'string.pattern.base': 'Email must be in valid form.',
  }),
// eslint-disable-next-line
  name: Joi.string().required().pattern(/^[a-zA-zа-яіїєА-ЯІЇЄ-]{2,16}$/).messages({
    'string.base': 'The name must be a string.',
    'any.required': 'The name field is required',
    'string.pattern.base': 'The name can consist of English and Ukrainian letters and must be not less 2 and no more than 16 symbols.',
  }),
});


const loginSchema = Joi.object({
// eslint-disable-next-line
  password: Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,16}$/).messages({
    'string.base': 'The password must be a string.',
    'any.required': 'The password field is required',
    'string.pattern.base': 'The password must includes at least one capital letter, lowercase letter and number, and consist of minimum 6 and maximum 16 characters.',
  }),
// eslint-disable-next-line
  email: Joi.string().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).min(2).max(255).required().messages({
    'string.base': 'Email must be a string.',
    'string.min': 'Email must be not less 2 symbols.',
    'any.required': 'Email field is required',
    'string.pattern.base': 'Email must be in valid form.',
  }),
});

const updateSchema = Joi.object({
// eslint-disable-next-line
  email: Joi.string().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).min(2).max(255).messages({
    'string.base': 'Email must be a string.',
    'string.min': 'Email must be not less 2 symbols.',
    'string.pattern.base': 'Email must be in valid form.',
  }),
// eslint-disable-next-line
  name: Joi.string().pattern(/^[a-zA-zа-яіїєА-ЯІЇЄ-]{2,16}$/).messages({
    'string.base': 'The name must be a string.',
    'string.pattern.base': 'The name can consist of English and Ukrainian letters and must be not less 2 and no more than 16 symbols.',
  }),
// eslint-disable-next-line
  phone: Joi.string().pattern(/^\+\d{12}$/).messages({
    'string.base': 'The phone must be a string.',
    'string.pattern.base': 'The phone must start with '+' and consist of 12 digits',
  }),
// eslint-disable-next-line
  birthday: Joi.string().pattern(/^\d{1,2}\-\d{1,2}\-\d{4}$/).messages({
    'string.base': 'The birthday must be a string.',
    'string.pattern.base': 'The birthday must be in the format: day-month-year',
  }),
// eslint-disable-next-line
  city: Joi.string().pattern(cityRegexp).messages({
    'string.base': 'The city must be a string.',
    'string.pattern.base': 'The city must accepts only letters, spaces and dashes(-).',
  }),
})


const schemas = {
  registrationSchema,
  loginSchema, 
  updateSchema,
};


const User = model("user", userSchema);


module.exports = {
    User,
    schemas
}
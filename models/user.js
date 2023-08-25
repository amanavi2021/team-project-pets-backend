const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

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
    default: null,
  }, 
  refreshToken: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  phone: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  birthday: {
    type: String,
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


// ////// Joi schemas

const registrationSchema = Joi.object({
// eslint-disable-next-line
  password: Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,16}$/),
// eslint-disable-next-line
  email: Joi.string().required().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).min(2).max(255),
// eslint-disable-next-line
  name: Joi.string().required().pattern(/^[a-zA-zа-яіїєА-ЯІЇЄ-]{2,16}$/),
});


const loginSchema = Joi.object({
// eslint-disable-next-line
  password: Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,16}$/),
// eslint-disable-next-line
  email: Joi.string().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).min(2).max(255).required(),
});

const updateSchema = Joi.object({
// eslint-disable-next-line
  email: Joi.string().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).min(2).max(255),
// eslint-disable-next-line
  name: Joi.string().pattern(/^[a-zA-zа-яіїєА-ЯІЇЄ-]{2,16}$/),
// eslint-disable-next-line
   phone: Joi.string().pattern(/^\+\d{12}$/),
// eslint-disable-next-line
   birthday: Joi.string().pattern(/^\d{1,2}\-\d{1,2}\-\d{4}$/),
// eslint-disable-next-line
   city: Joi.string(),
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
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
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: {
        type: String,
        default: null,
      }, 
      avatarURL: {
        type: String,
        
      },
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
      }
},{versionKey:false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registrationSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email({minDomainSegments:2}).required(),

});

const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email({minDomainSegments:2}).required(),
 });

 const updateSubscriptionSchema = Joi.object({
  subscription: Joi.valid(...['starter', 'pro', 'business']).required(),
});

 const emailSchema = Joi.object({
  email: Joi.string().email({minDomainSegments:2}).required(),
 })

 const schemas = {
    registrationSchema,
    loginSchema, 
    updateSubscriptionSchema,
    emailSchema
 };

 const User = model("user", userSchema);

 module.exports = {
    User,
    schemas
 }
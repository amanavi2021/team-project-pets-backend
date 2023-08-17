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

 const schemas = {
    registrationSchema,
    loginSchema, 
    updateSubscriptionSchema,
   };

 const User = model("user", userSchema);

 module.exports = {
    User,
    schemas
 }
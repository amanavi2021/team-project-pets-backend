const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi= require("joi");

const dateRegexp = /^(0[1-9]|[12][0-9]|3[01])\-(0[1-9]|1[0-2])\-\d{4}$/;
const cityRegexp =/^[a-zA-Z\u0080-\u024F]+(?:([\\ \\-\\']|(\\.\\ ))[a-zA-Z\u0080-\u024F]+)*$/;

const noticeSchema = new Schema(
  {
    category: {
      type:String,
      enum: ["sell", "lost-found", "in-good-hands"],
      default: "sell",
    },
    name: {
      type: String,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [16, "Name can't exceed 16 characters"],
      required: [true, "Set name for your pet"],
    },
    date: {
      type: String,
      match: [dateRegexp, "Use date format DD.MM.YYYY"],
      required: [true, "Set birthday for your pet"],
    },
    type: {
      type: String,
      minlength: [2, "Type must be at least 2 characters"],
      maxlength: [16, "Type can't exceed 16 characters"],
      required: [true, "Set type for your pet"],
    },
    imageURL: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      maxlength: [120, "Comment can't exceed 120 characters"],
    },
    sex: {
      type:String,
      enum: ["male", "female"],
      default: "male",
      required: [true, "Set sex for your pet (male/female)"],
    },
    location: {
      type: String,
      required: [true, "Set location for your pet"],

    },
    price: {
      type: Number, 
      min: 0,
      default: 0, 
         
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    userIds: [{
      type:Schema.Types.ObjectId,
      ref: "user",
      default:[],
    }]
  },
  { versionKey: false, timestamps: true }
);

noticeSchema.post("save", handleMongooseError);

const Notice = model("notice", noticeSchema);

const addNoticeSchema = Joi.object({
  category: Joi.string().valid("sell", "lost-found", "in-good-hands").required(),
  name: Joi.string().min(2).max(16).required(),
  date: Joi.string().pattern(dateRegexp, "DD-MM-YYYY").required(),
  type: Joi.string().min(2).max(16).required(),
  comments: Joi.string().max(120),
  sex: Joi.string().valid("male", "female").required(),
  location: Joi.string().pattern(cityRegexp).required(),
  price: Joi.number().integer().when("category", {
    is: "sell",
    then: Joi.number().integer().required().min(1),
    otherwise: Joi.number().integer().default(0),
  }),
});

const schemas = {
    addNoticeSchema,
}

module.exports = {
    Notice,
    schemas
}



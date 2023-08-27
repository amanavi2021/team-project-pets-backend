const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const Joi = require("joi");
// eslint-disable-next-line
const dateRegexp = /^(0[1-9]|[12][0-9]|3[01])\-(0[1-9]|1[0-2])\-\d{4}$/;
// eslint-disable-next-line
const cityRegexp =
  /^[a-zA-Z\u0080-\u024F]+(?:([\\ \\-\\']|(\\.\\ ))[a-zA-Z\u0080-\u024F]+)*$/;

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["sell", "lost-found", "in-good-hands"],
      default: "sell",
    },
    title: {
      type: String,
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [100, "Title can't exceed 16 characters"],
      required: [true, "Set title for notice about your pet"],
    },
    name: {
      type: String,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [16, "Name can't exceed 16 characters"],
      required: [true, "Set name for your pet"],
    },
    date: {
      type: String,
      match: [dateRegexp, "Use date format DD-MM-YYYY"],
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
      type: String,
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
      required: () => {
        return this.category === "sell";
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    userIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
        default: [],
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

noticeSchema.post("save", handleMongooseError);

const Notice = model("notice", noticeSchema);

const addNoticeSchema = Joi.object({
  category: Joi.string()
    .valid("sell", "lost-found", "in-good-hands")
    .required()
    .messages({
      "string.base": "The category must be a string.",
      "any.required": "The category field is required",
      "any.allowOnly":
        'The category must be "sell" or "lost-found" or "in-good-hands"',
    }),
  title: Joi.string().min(2).max(100).required().messages({
    "string.base": "The title must be a string.",
    "string.min": "The title must be not less 2 symbols.",
    "string.max": "The title must be no more than 100 symbols.",
    "any.required": "The title field is required",
  }),
  name: Joi.string().min(2).max(16).required().messages({
    "string.base": "The name must be a string.",
    "string.min": "The name must be not less 2 symbols.",
    "string.max": "The name must be no more than 16 symbols.",
    "any.required": "The name field is required",
  }),
  date: Joi.string().pattern(dateRegexp, "DD-MM-YYYY").required().messages({
    "string.base": "The date must be a string.",
    "any.required": "The date field is required",
    "string.pattern.base": "The date must be in the format: day-month-year",
  }),
  type: Joi.string().min(2).max(16).required().messages({
    "string.base": "The type must be a string.",
    "string.min": "The type must be not less 2 symbols.",
    "string.max": "The type must be no more than 16 symbols.",
    "any.required": "The type field is required",
  }),
  comments: Joi.string().max(120).required().messages({
    "string.base": "The comments must be a string.",
    "string.max": "The comments must be no more than 120 symbols.",
    "any.required": "The name field is required",
  }),
  sex: Joi.string().valid("male", "female").required().messages({
    "string.base": "The sex must be a string.",
    "any.required": "The sex field is required",
    "any.allowOnly": 'The sex must be "male" or "female"',
  }),
  location: Joi.string().pattern(cityRegexp).required().messages({
    "string.base": "The location must be a string.",
    "any.required": "The location field is required",
    "string.pattern.base":
      "The location must accepts only letters, spaces and dashes(-).",
  }),
  price: Joi.number()
    .integer()
    .when("category", {
      is: "sell",
      then: Joi.number().integer().required().min(1).messages({
        "number.base": "The price must be a number.",
        "number.integer": "The price must be integer.",
        "number.greater": "The price must be higher or equal to 1",
        "any.required": "The price field is required",
      }),
      otherwise: Joi.number().integer().default(0).messages({
        "number.base": "The price must be a number.",
        "number.integer": "The price must be integer.",
        "number.greater": "The price must be higher or equal to 1",
      }),
    }),
});

const schemas = {
  addNoticeSchema,
};

module.exports = {
  Notice,
  schemas,
};

const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

// eslint-disable-next-line
const dateRegexp = /^(0[1-9]|[12][0-9]|3[01])\-(0[1-9]|1[0-2])\-\d{4}$/;


const petSchema = new Schema(
  {
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

petSchema.post("save", handleMongooseError);

const Pet = model("pet", petSchema);

const addPetSchema = Joi.object({
  name: Joi.string().min(2).max(16).required().messages({
    'string.base': 'The name must be a string.',
    'string.min': 'The name must be not less 2 symbols.',
    'string.max': 'The name must be no more than 16 symbols.',
    'any.required': 'The name field is required',
  }),
  date: Joi.string().pattern(dateRegexp, "DD-MM-YYYY").required().messages({
    'string.base': 'The date must be a string.',
    'any.required': 'The date field is required',
    'string.pattern.base': 'The date must be in the format: day-month-year',
  }),
  type: Joi.string().min(2).max(16).required().messages({
    'string.base': 'The type must be a string.',
    'string.min': 'The type must be not less 2 symbols.',
    'string.max': 'The type must be no more than 16 symbols.',
    'any.required': 'The type field is required',
  }),
  comments: Joi.string().max(120).required().messages({
    'string.base': 'The comments must be a string.',
    'string.max': 'The comments must be no more than 120 symbols.',
    'any.required': 'The name field is required',
  }),
});

const schemas = {
  addPetSchema,
};

module.exports = {
  Pet,
  schemas,
};

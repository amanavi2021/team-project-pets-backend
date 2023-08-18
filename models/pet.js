const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const dateRegexp = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

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
      required: [true, "Set comment for your pet"],
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
  name: Joi.string().min(2).max(16).required(),
  date: Joi.string().pattern(dateRegexp, "DD.MM.YYYY").required(),
  type: Joi.string().min(2).max(16).required(),
  comments: Joi.string().max(120).required(),
});

const schemas = {
  addPetSchema,
};

module.exports = {
  Pet,
  schemas,
};

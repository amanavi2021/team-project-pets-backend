const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const newSchema = new Schema({
    title: {
        type: String,
        default: "",
    },
    text: {
        type: String,
        default: "",
    },
    date: {
        type: String,  
        default: "",
    },
    imgUrl: {
        type: String,
        default: "",
    },
    url: {
        type: String,
        default: "",
    }
}, 
{ versionKey: false, timestamps: true }
);

newSchema.post("save", handleMongooseError);

const New = model("new", newSchema);

module.exports = New;
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

// const workSchema  = new Schema({
//     isOpen: {
//         type: Boolean,
//         default: false,
//     },
//     from: {
//         type: String,
//         default: "",
//     },
//     to: {
//         type: String,
//         default: "",
//     }
// });

const serviceSchema = new Schema({
    title: {
        type: String,
        default: "",
    },
    url: {
        type: String,
        default: "",
    },
    addressUrl: {
        type: String,
        default: "",
    },
    imageUrl: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    workDays: [{
        isOpen: {
            type: Boolean,
            default: false,
        },
        from: {
            type: String,
            default: "",
        },
        to: {
            type: String,
            default: "",
        }
    }],
    phone: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },

}, { versionKey: false, timestamps: true }
);

serviceSchema.post("save", handleMongooseError);

const Service = model("service", serviceSchema);

module.exports = Service;
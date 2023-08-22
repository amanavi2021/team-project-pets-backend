const getServices = require("./getServices");
const { ctrlWrapper } = require("../../helpers");

module.exports = {
    getServices: ctrlWrapper(getServices),
}
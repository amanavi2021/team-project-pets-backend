const addNotice = require("./addNotice");
const getNoticeById = require("./getNoticeById");
const  { ctrlWrapper } = require("../../helpers");

module.exports = {
    addNotice: ctrlWrapper(addNotice),
    getNoticeById: ctrlWrapper(getNoticeById),
}
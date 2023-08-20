const addNotice = require("./addNotice");
const getNoticeById = require("./getNoticeById");
const getNotices = require("./getNotices");
const removeNotice = require("./removeNotice");
const  { ctrlWrapper } = require("../../helpers");

module.exports = {
    addNotice: ctrlWrapper(addNotice),
    getNoticeById: ctrlWrapper(getNoticeById),
    getNotices: ctrlWrapper(getNotices),
    removeNotice: ctrlWrapper(removeNotice),
}
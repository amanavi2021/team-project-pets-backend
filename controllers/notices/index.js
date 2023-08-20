const addNotice = require("./addNotice");
const getNoticeById = require("./getNoticeById");
const getFavoriteNotices = require("./getFavoriteNotices");
const favoriteNotices = require("./favoriteNotices");
const getNotices = require("./getNotices");
const removeNotice = require("./removeNotice");
const  { ctrlWrapper } = require("../../helpers");

module.exports = {
    addNotice: ctrlWrapper(addNotice),
    getNoticeById: ctrlWrapper(getNoticeById),
    getFavoriteNotices: ctrlWrapper(getFavoriteNotices),
    favoriteNotices: ctrlWrapper(favoriteNotices),
    getNotices: ctrlWrapper(getNotices),
    removeNotice: ctrlWrapper(removeNotice),
}
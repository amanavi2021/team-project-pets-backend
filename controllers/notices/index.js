const addNotice = require("./addNotice");
const getNoticeById = require("./getNoticeById");
const getFavoriteNotices = require("./getFavoriteNotices");
const favoriteNotices = require("./favoriteNotices");
const getOwnNotices = require("./getOwnNotices");
const removeNotice = require("./removeOwnNotice");
const  { ctrlWrapper } = require("../../helpers");

module.exports = {
    addNotice: ctrlWrapper(addNotice),
    getNoticeById: ctrlWrapper(getNoticeById),
    getFavoriteNotices: ctrlWrapper(getFavoriteNotices),
    favoriteNotices: ctrlWrapper(favoriteNotices),
    getOwnNotices: ctrlWrapper(getOwnNotices),
    removeNotice: ctrlWrapper(removeNotice),
}
const getNews = require('./getNews');
const { ctrlWrapper } = require("../../helpers")

module.exports = {
    getNews: ctrlWrapper(getNews)
}
const { Notice } = require("../../models/notice");
const {HttpError} = require("../../helpers");

const removeNotice = async (req, res) => { 
    const {noticeId} = req.params;
    console.log("noticeId", noticeId);
    const result = await Notice.findByIdAndRemove(noticeId);
    if (!result){
      throw HttpError(404, "Not found");
    }
    res.status(204).json({
      message: "Notice deleted"
    })
};

module.exports = removeNotice;
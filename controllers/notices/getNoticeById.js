const { Notice } = require("../../models/notice");
const {HttpError} = require("../../helpers");

const getNoticeById = async (req, res) => {
    const { noticeId } = req.params;
    
    const result = await Notice.findById(noticeId);

    if (!result) {
        throw HttpError(404,"Not found");
    };

    res.status(200).json({
        code: 200,
        status: "success",
        notice: result,
    });
};

module.exports = getNoticeById;
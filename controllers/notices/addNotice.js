const { Notice } = require("../../models/notice");
const {HttpError} = require("../../helpers");

const addNotice = async (req, res) => {
    const {_id: owner} = req.user;
    const imageURL = req.file.path;
    const {category} = req.params;
    const categories = ["sell", "lost-found", "in-good-hands"];
    if (!categories.includes(category)) {
        throw HttpError(404,"Not found");
    }

    const result  = await Notice.create({...req.body, category, imageURL, owner});
    res.status(201).json({
        code: 201,
        status: "success",
        notice: result,
    }
    );
};

module.exports = addNotice;
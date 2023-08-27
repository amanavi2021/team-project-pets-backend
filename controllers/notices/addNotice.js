const { Notice } = require("../../models/notice");

const addNotice = async (req, res) => {
    const {_id: owner} = req.user;
    const imageURL = req.file.path;
   
    const result = await Notice.create({ ...req.body, imageURL, owner });
    
    res.status(201).json({
        code: 201,
        status: "success",
        notice: result,
    }
    );
};

module.exports = addNotice;
const { Notice } = require("../../models/notice");

const getNotices = async (req, res) => {
    const {_id: owner} = req.user;
    const ownerID = { owner };
    const result = await Notice.find(ownerID, "-createdAt -updatedAt").populate("owner", "name");
 
     res.status(200).json({
        code:200,
        status:"success",
        notices:result,
     }
    );    
};

module.exports = getNotices;
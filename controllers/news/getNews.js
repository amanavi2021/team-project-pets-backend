const New = require("../../models/new");

const getNews = async (req, res) => {
      const {page=1, limit=20} = req.query;
      const skip= (page - 1) * limit;
      const result = await New.find({}, "-createdAt -updatedAt", {skip, limit});
      res.status(200).json({
        code: 200,
        status: "success",
        news: result
        });    
  };

  module.exports = getNews;
  
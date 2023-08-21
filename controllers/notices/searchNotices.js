const { Notice } = require("../../models/notice");

const searchNotices = async (req, res) => {
  const { category = "sell", searchQuery } = req.query;

  const customSearchRequest = {};

  if (searchQuery) {
    customSearchRequest.name = { $regex: searchQuery, $options: "i" };
  }

  if (category) {
    customSearchRequest.category = category;
  }

  const result = await Notice.find(
    customSearchRequest,
    "-createdAt -updatedAt"
  );

  res.status(200).json({
    code: 200,
    status: "success",
    notices: result,
  });
};

module.exports = searchNotices;

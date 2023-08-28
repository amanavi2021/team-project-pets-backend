const { Notice } = require("../../models/notice");

const searchNotices = async (req, res) => {
  const { page = 1, limit = 12, searchQuery, category } = req.query;

  const skip = (page - 1) * limit;

  const customSearchRequest = {};

  if (searchQuery) {
    customSearchRequest.title = { $regex: searchQuery, $options: "i" };
  }

  if (category) {
    customSearchRequest.category = category;
  }

  const result = await Notice.find(
    customSearchRequest,
    "-createdAt -updatedAt",
    {
      skip,
      limit,
      sort: { createdAt: -1 },
    }
  ).populate("owner", "name email phone");

  res.status(200).json({
    code: 200,
    status: "success",
    notices: result,
  });
};

module.exports = searchNotices;

const { Notice } = require("../../models/notice");
const { HttpError } = require("../../helpers");

const removeOwnNotice = async (req, res) => {
  const { noticeId } = req.params;
  const { _id: owner } = req.user;

  const result = await Notice.findByIdAndRemove(noticeId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  if (result.owner === owner) {
    throw HttpError(403, "You can't delete other users notice");
  }

  await result.remove();

  res.json({
    message: "Notice deleted",
    id: noticeId,
  });
};

module.exports = removeOwnNotice;

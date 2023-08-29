const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const removeOwnNotice = async (req, res) => {
  const { noticeId } = req.params;
  const { _id: owner } = req.user;
   // remove own notice
  const result = await Notice.findByIdAndRemove(noticeId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  if (result.owner !== owner) {
    throw HttpError(403, "You can't delete other users notice");
  }

  await result.remove();

  // remove own notice from favorite if it is there
  const user = await User.findById(owner);

  const isNoticeInFavorite = user.favorite.find((id) => id.toString() === noticeId);

  if (isNoticeInFavorite) {
    user.favorite = user.favorite.filter((id) => id.toString() !== noticeId);

    await user.save();
  };

  res.json({
    message: "Notice deleted",
    id: noticeId,
  });
};

module.exports = removeOwnNotice;

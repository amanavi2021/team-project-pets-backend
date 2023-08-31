const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const removeOwnNotice = async (req, res) => {
  const { noticeId } = req.params;
  const { _id: owner } = req.user;
   
  // remove own notice
  const result = await Notice.findById(noticeId);

  if (!result) {
    throw HttpError(404, "Not found");
  };

  if (result.owner.toString() !== owner.toString()) {
    throw HttpError(403, "You can't delete other users notice");
  };

  const results = await Notice.findByIdAndRemove(noticeId);

  await results.remove();

  // remove own notice from favorite if it is there
  await User.findByIdAndUpdate(owner, {
    $pull: { favorite: noticeId }
  });


  res.json({
    message: "Notice deleted",
    id: noticeId,
  });
};

module.exports = removeOwnNotice;

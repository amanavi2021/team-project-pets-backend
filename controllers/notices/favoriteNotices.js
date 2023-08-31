const { User } = require("../../models/user");
const { Notice } = require("../../models/notice");

const favoriteNotices = async (req, res) => {
  const { noticeId } = req.params;
  const { _id } = req.user;

  const user = await User.findById(_id);
  // is current notice in favorite notices
  const isNotice = user.favorite.find((id) => id.toString() === noticeId);

  if (isNotice) {
    // delete from favorite
    console.log("favorite before", user.favorite);
    user.favorite = user.favorite.filter((notice) => notice.toString() !== noticeId);
    console.log("favorite", user.favorite);

    await user.save();

    await Notice.findByIdAndUpdate(noticeId, {
      $pull: { userIds: _id }
    });
   
  } else {
    // add into favorite
    user.favorite.push(noticeId);

    await user.save();

    const notice = await Notice.findById(noticeId);

    notice.userIds.push(_id);

    await notice.save();
  }

  const notices = await Notice.find({}, "-createdAt -updatedAt");
  const notice = await Notice.findById(noticeId);

  res.status(200).json({
    code: 200,
    status: "success",
    message: "Success operation",
    id: noticeId,
    notice,
    notices,
    user,
  });
};

module.exports = favoriteNotices;

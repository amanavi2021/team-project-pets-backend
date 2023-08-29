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

    user.favorite = user.favorite.filter(
      (notice) => notice.toString() !== noticeId
    );

    await user.save();

    const notice = await Notice.findById(noticeId);

    notice.userIds = notice.userIds.find((userId) => userId.toString() !== _id);

    await notice.save();
  } else {
    // add into favorite
    user.favorite.push(noticeId);

    await user.save();

    const notice = await Notice.findById(noticeId);

    notice.userIds.push(_id);

    await notice.save();
  }

  const currentNotice = await Notice.findById(noticeId);

  const notices = await Notice.find(
    currentNotice.category,
    "-createdAt -updatedAt"
  );

  res.status(200).json({
    code: 200,
    status: "success",
    message: "Success operation",
    id: noticeId,
    notices,
    user,
  });
};

module.exports = favoriteNotices;

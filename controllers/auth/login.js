const bcrypt = require("bcrypt");

const { User } = require("../../models/user");
const { tokens } = require("../../helpers/tokens");
const { HttpError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(409, "User with this email not found");
  }

  const passwordCompare = bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { token, refreshToken } = await tokens(user._id);

  await User.findByIdAndUpdate(user._id, { token, refreshToken });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    code: 200,
    status: "success",
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      city: user.city,
      birthday: user.birthday,
      avatarURL: user.avatarURL,
      favorite: user.favorite,
    },
  });
};

module.exports = login;

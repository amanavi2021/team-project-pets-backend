const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const { User } = require('../../models/user');
const { tokens } = require('../../helpers/tokens');
const { HttpError} = require('../../helpers');


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
        throw HttpError(409, "User with this email not found");
    };
    
    const { token, refreshToken } = await tokens(user._id);

    await User.findByIdAndUpdate(user._id, { token, refreshToken });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        code: 200,
        status: "success",
        token,
        refreshToken,
        user: {
            email: newUser.email,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            city: newUser.city,
            birthday: newUser.birthday,
            avatarURL: newUser.avatarURL,
        },
    });
};


module.exports = login;

const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');

const refresh = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        throw HttpError(401, "Not authorized");
    };

    const { email } = req.body;

    const user = await User.findOne({ email });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
        code: 200,
        status: 'success',
        refreshToken,
        user: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            city: user.city,
            birthday: user.birthday,
            avatarURL: user.avatarURL,
        },
    });
};

module.exports = {
    refresh: ctrlWrapper(refresh),
};
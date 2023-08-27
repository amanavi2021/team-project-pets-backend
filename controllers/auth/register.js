const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const { User } = require('../../models/user');
const { tokens } = require('../../helpers/tokens');
const { HttpError} = require('../../helpers');


const register = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (user) {
        throw HttpError(409, "Email in use");
    };

    const hashPassword = await bcrypt.hash(password, 10);
    
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
    });
    
    const { token, refreshToken } = await tokens(newUser._id);

    await User.findByIdAndUpdate(newUser._id, { token, refreshToken });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
        code: 201,
        status: "success",
        token,
        user: {
            email: newUser.email,
            name: newUser.name,
            phone: newUser.phone,
            city: newUser.city,
            birthday: newUser.birthday,
            avatarURL: newUser.avatarURL,
        },
    });
};


module.exports = register;
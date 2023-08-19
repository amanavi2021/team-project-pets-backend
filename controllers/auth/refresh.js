const jwt = require("jsonwebtoken");

const { REFRESH_SECRET_KEY } = process.env;
const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');
const { tokens } = require('../../helpers/tokens');


const refresh = async (req, res) => {
    const reqRefToken = req.cookies.refreshToken;

    if (!reqRefToken) {
        throw HttpError(401, "Not authorized");
    };
    
    try {
        const { id } = jwt.verify(reqRefToken, REFRESH_SECRET_KEY);
        const isExist = await User.findOne({ reqRefToken});

        if (!isExist) {
            throw HttpError(403, "Refresh Token invalid");
        };

        const { token, refreshToken } = await tokens(id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.json({
            code: 200,
            status: 'success',
            token,
        });

    } catch (error) {
        throw HttpError(403, error.message);
    }
};

module.exports = refresh;
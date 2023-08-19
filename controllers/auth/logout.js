const { User } = require('../../models/user');


const logout = async (req, res) => {
    const { _id } = req.user;
    
    await User.findByIdAndUpdate(_id, { token: '', refreshToken: '' });
    
    res.status(204).json();
};

module.exports = logout;

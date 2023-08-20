const { User } = require('../../models/user');
const { Notice } = require('../../models/notice');


const getFavoriteNotices = async (req, res) => {
    
    const { _id } = req.user;
   
    const { favorite } = await User.findById(_id);
   
    const favoriteUserData = favorite.map((noticeId) => noticeId.toString());

    const notices = await Notice.find({});

    const favoriteNotices = favoriteUserData.map(id => {
        return notices.find(notice => notice._id.toString() === id);
    });
    
    res.json({
        code: 200,
        status: 'success',
        notices: favoriteNotices,
    });
};

module.exports = getFavoriteNotices;
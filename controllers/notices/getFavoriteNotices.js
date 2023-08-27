const { Notice } = require('../../models/notice');


const getFavoriteNotices = async (req, res) => {
    
    const favoriteNotices = await Notice.find({ userIds: req.user.id });
    
    res.json({
        code: 200,
        status: 'success',
        notices: favoriteNotices,
    });
};

module.exports = getFavoriteNotices;
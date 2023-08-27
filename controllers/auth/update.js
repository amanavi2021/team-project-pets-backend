const { User } = require('../../models/user');


const update = async(req, res) => {
    const { _id } = req.user;
    const { name, email, birthday, phone, city } = req.body;
    const avatarURL = req.file ? req.file.path : req.user.avatarURL;
  
  const updateData = await User.findOneAndUpdate(_id,
    {
      name,
      email,
      birthday,
      phone,
      city,
      avatarURL,
    },
    {
      new: true,
    }
  );
    
    res.json({
        code: 200,
        status: 'success',
        user: {
            name: updateData.name,
            email: updateData.email,
            phone: updateData.phone,
            city: updateData.city,
            birthday: updateData.birthday,
            avatarURL: updateData.avatarURL,
        },
    });
};



module.exports = update;
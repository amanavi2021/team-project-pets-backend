// get current user date 
const { Pet } = require("../../models/pet");

const current = async (req, res) => {
    const { email, name, phone, city, birthday, avatarURL, favorite } = req.user;
    const { _id: owner } = req.user;
  
    const ownerID = { owner };
  
    const result = await Pet.find(ownerID, "-createdAt -updatedAt").populate(
          "owner",
          "name"
    );
  
    res.status(200).json({
      code: 200,
      status:"success",
      user:{
        name,
        email,
        phone,
        city,
        birthday,
        avatarURL,
        favorite
      },
      pets: [...result],  
      
    });
};
  
module.exports = current;

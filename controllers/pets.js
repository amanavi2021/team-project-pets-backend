
const { HttpError, ctrlWrapper } = require("../helpers");
const { Pet } = require("../models/pet");


const addPet = async (req, res) => {
const { _id: owner } = req.user;
 const imageURL = req.file.path;

  const result = await Pet.create({ ...req.body, imageURL, owner });
  res.status(201).json(result);
};

const removePet = async (req, res) => {
  const { petId } = req.params;
  const result = await Pet.findByIdAndRemove(petId);
  if (!result) {
    throw HttpError(404, "Pet with this id not found");
  }
  res.json({
    message: "Delete success",
  });
};

const getAllPets = async (req, res) => {
  const { _id: owner } = req.user;
  const customPets = { owner };

  const result = await Pet.find(customPets, "-createdAt -updatedAt").populate(
    "owner",
    "name"
  );
  res.json(result);
};

// const updatePetAvatar = async (req, res) => {
//   const { _id } = req.user;
//   const { path: tempUpload, originalname } = req.file;
//   const filename = `${_id}_${originalname}`;
//   const petAvatarUpload = path.join(petsAvatarsDir, filename);

//   await fs.rename(tempUpload, petAvatarUpload);

//   const image = await Jimp.read(petAvatarUpload);
//   await image.resize(250, 250);
//   await image.writeAsync(petAvatarUpload);

//   const imageURL = path.join("pets", filename);

//   await User.findByIdAndUpdate(_id, { imageURL });

//   res.json({
//     imageURL,
//   });
// };

module.exports = {
  addPet: ctrlWrapper(addPet),
  removePet: ctrlWrapper(removePet),
  getAllPets: ctrlWrapper(getAllPets),
  //   updatePetAvatar: ctrlWrapper(updatePetAvatar),
};

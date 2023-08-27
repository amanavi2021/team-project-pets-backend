
const { HttpError, ctrlWrapper } = require("../../helpers");
const { Pet } = require("../../models/pet");

// add pet
const addPet = async (req, res) => {
const { _id: owner } = req.user;
 const imageURL = req.file.path;

  const result = await Pet.create({ ...req.body, imageURL, owner });

  res.status(201).json({
      code: 201,
      status: "success",
      pet: result,
      }
    );
};

// delete pet
const removePet = async (req, res) => {
  const { petId } = req.params;

  const result = await Pet.findByIdAndRemove(petId);

  if (!result) {
    throw HttpError(404, "Pet with this id not found");
  };

  res.json({
    message: "Delete success",
    id: petId,
  });
};

module.exports = {
  addPet: ctrlWrapper(addPet),
  removePet: ctrlWrapper(removePet),
};

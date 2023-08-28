const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidPetId = (req, res, next) => {
  const { petId: id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidPetId;

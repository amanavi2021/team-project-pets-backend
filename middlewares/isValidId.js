const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { noticeId, petId } = req.params;

  if (!isValidObjectId(noticeId) || !isValidObjectId(petId)) {
    next(HttpError(400, `${noticeId || petId} is not valid id`));
  }
  next();
};

module.exports = isValidId;

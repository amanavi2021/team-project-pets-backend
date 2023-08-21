const { HttpError } = require("../helpers");

const isValidCategory = (req, res, next) => {
  const { category } = req.params;
  if (
    category !== "sell" &&
    category !== "lost-found" &&
    category !== "in-good-hands"
  ) {
    next(
      HttpError(
        400,
        `${category} is not valid. Use sell, lost-found or in-good-hands`
      )
    );
  }
  next();
};

module.exports = isValidCategory;

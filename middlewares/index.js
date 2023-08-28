const isValidId = require("./isValidId");
const isValidPetId = require("./isValidPetId");
const authenticate = require("./authenticate");
const validateBody = require("./validateBody");
const upload = require("./upload");

module.exports = {
  isValidId,
  isValidPetId,
  authenticate,
  validateBody,
  upload,
};

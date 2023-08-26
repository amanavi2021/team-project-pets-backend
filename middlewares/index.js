const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const validateBody = require("./validateBody");
const isValidIdPet = require("./isValidIdPet");
const upload = require("./upload");

module.exports = {
  isValidId,
  isValidIdPet,
  authenticate,
  validateBody,
  upload,
};

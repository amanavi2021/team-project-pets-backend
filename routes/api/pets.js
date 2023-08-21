const express = require("express");

const ctrl = require("../../controllers/pets/pets");
const { schemas } = require("../../models/pet");
const {
  isValidId,
  authenticate,
  validateBody,
  upload,
} = require("../../middlewares");

const router = express.Router();

// ендпоінт для додавання улюбленьця авторизованим користувачем
router.post(
  "/",
  authenticate,
  upload.single("image"),
  validateBody(schemas.addPetSchema),
  ctrl.addPet
);

// ендпоінт для видалення улюбленьця авторизованим користувачем
router.delete("/:petId", authenticate, isValidId, ctrl.removePet);

module.exports = router;

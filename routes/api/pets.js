const express = require("express");

const ctrl = require("../../controllers/pets");
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

router.delete("/:petId", authenticate, isValidId, ctrl.removePet);

// router.patch(
//   "/avatars",
//   authenticate,
//   upload.single("avatar"),
//   ctrl.updatePetAvatar
// );

module.exports = router;

const express = require("express");

const ctrl = require("../../controllers/pets");
const { schemas } = require("../../models/pet");
const { isValidId, authenticate, validateBody } = require("../../middlewares");

const router = express.Router();

router.post(
  "/",
  authenticate,
  validateBody(schemas.addPetSchema),
  upload.single("avatar"),
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

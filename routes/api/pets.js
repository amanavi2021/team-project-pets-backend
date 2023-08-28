const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/pets/pets");
const { schemas } = require("../../models/pet");
const {
  authenticate,
  validateBody,
  upload,
  isValidPetId,
} = require("../../middlewares");

// Add pet by authorized user endpoint
router.post(
  "/",
  authenticate,
  upload.single("image"),
  validateBody(schemas.addPetSchema),
  ctrl.addPet
);

// Delete pet by authorized user endpoint
router.delete("/:petId", authenticate, isValidPetId, ctrl.removePet);

module.exports = router;

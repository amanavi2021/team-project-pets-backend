const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/pets/pets");
const { schemas } = require("../../models/pet");
const {
  isValidIdPet,
  authenticate,
  validateBody,
  upload,
} = require("../../middlewares");



// Add pet by authorized user endpoint 
router.post("/", authenticate, upload.single("image"), validateBody(schemas.addPetSchema), ctrl.addPet);

// Delete pet by authorized user endpoint 
router.delete("/:petId", authenticate, isValidIdPet, ctrl.removePet);



module.exports = router;

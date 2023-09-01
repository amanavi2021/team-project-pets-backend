const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");


// User registration endpoint
router.post("/register", validateBody(schemas.registrationSchema), ctrl.register);

// User login endpoint 
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

// User logout endpoint
router.post("/logout", authenticate, ctrl.logout);

// Token refresh endpoint
router.get('/refresh', ctrl.refresh);

// Update user data endpoint 
router.patch('/update', authenticate, upload.single('avatarURL'), validateBody(schemas.updateSchema),  ctrl.update);

// Get current user data endpoint 
router.get("/current", authenticate, ctrl.current);



module.exports = router;

const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");
const {schemas} = require("../../models/user")
const router = express.Router();

// ендпоінтт реєстрації користувача
router.post("/register", validateBody(schemas.registrationSchema), ctrl.register);

// ендпоінт логінізації користувача
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

// ендпоінт для логаута користувача
router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch("/subscription", authenticate, validateBody(schemas.updateSubscriptionSchema), ctrl.updateSubscription);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar)

module.exports = router;

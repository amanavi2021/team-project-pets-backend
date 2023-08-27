const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");
const {schemas} = require("../../models/user")
// ендпоінтт реєстрації користувача
router.post("/register", validateBody(schemas.registrationSchema), ctrl.register);

// ендпоінт логінізації користувача
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

// ендпоінт для логаута користувача
router.post("/logout", authenticate, ctrl.logout);

// ендпоінт рефрешу токена (якщо токен доступу протух)
router.get('/refresh', ctrl.refresh);

// ендпоїнт оновлення даних користувача
router.patch('/update', authenticate, validateBody(schemas.updateSchema), upload.single('avatarURL'), ctrl.update);

// ендпоінт даних поточного користувача
router.get("/current", authenticate, ctrl.current);



module.exports = router;

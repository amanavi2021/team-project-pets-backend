const express = require('express');
const ctrl = require("../../controllers/notices");
const router = express.Router();
const { isValidId, authenticate, validateBody, upload } = require("../../middlewares");
const { schemas } = require('../../models/notice');

// ендпоінт для додавання оголошення авторизованим користувачем в
router.post('/:category', authenticate,
upload.single("image"),
validateBody(schemas.addNoticeSchema),
ctrl.addNotice);

// ендпоінт для отримання оголошення по Id
router.get('/:noticeId', isValidId, ctrl.getNoticeById);

// eндпоінт для отримання обраних оголошень
router.get('/favorites', authenticate, ctrl.getFavoriteNotices);

// eндпоінт для додавання і видалення оголошення в обрнані
router.patch('/:noticeId', authenticate, isValidId, ctrl.favoriteNotices);
// router.get('/', authenticate, ctrl.listContacts);

// ендпоінт для отримання оголошеннь, автором яких є авторизований користувач
router.get('/', authenticate, ctrl.getNotices);

// ендпоінт для видалення оголошення, автором якого є авторизований користувач
router.delete('/:noticeId', authenticate, isValidId, ctrl.removeNotice);


module.exports = router;


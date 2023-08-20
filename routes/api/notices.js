const express = require('express');
const ctrl = require("../../controllers/notices");
const router = express.Router();
const { isValidId, authenticate, validateBody, upload } = require("../../middlewares");
const { schemas } = require('../../models/notice');

// ендпоінт для додавання оголошення авторизованим користувачем в обрану категорію
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

// router.post('/', authenticate, ctrl.addContact);

// router.put('/:contactId', authenticate, isValidId, ctrl.updateContact);

// router.patch('/:contactId/favorite', authenticate, isValidId, ctrl.updateStatusContact);

// router.delete('/:contactId', authenticate, isValidId, ctrl.removeContact);


module.exports = router;


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

// router.get('/', authenticate, ctrl.listContacts);

// router.get('/:contactId', authenticate, isValidId, ctrl.getContactById);

// router.post('/', authenticate, ctrl.addContact);

// router.put('/:contactId', authenticate, isValidId, ctrl.updateContact);

// router.patch('/:contactId/favorite', authenticate, isValidId, ctrl.updateStatusContact);

// router.delete('/:contactId', authenticate, isValidId, ctrl.removeContact);


module.exports = router;


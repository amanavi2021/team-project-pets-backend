const express = require('express');
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { isValidId, authenticate } = require("../../middlewares");

router.get('/', authenticate, ctrl.listContacts);

router.get('/:contactId', authenticate, isValidId, ctrl.getContactById);

router.post('/', authenticate, ctrl.addContact);

router.put('/:contactId', authenticate, isValidId, ctrl.updateContact);

router.patch('/:contactId/favorite', authenticate, isValidId, ctrl.updateStatusContact);

router.delete('/:contactId', authenticate, isValidId, ctrl.removeContact);

module.exports = router;

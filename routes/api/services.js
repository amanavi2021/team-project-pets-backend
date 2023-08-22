const express = require('express');
const router = express.Router();

const ctrl = require("../../controllers/services");

// ендпоінт для отримання отримання контактної інформації про сервіси
router.get('/', ctrl.getServices);

module.exports = router;
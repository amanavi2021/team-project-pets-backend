const express = require('express');
const router = express.Router();

const ctrl = require("../../controllers/news");

// ендпоінт для отримання новин
router.get('/', ctrl.getNews);

module.exports = router;
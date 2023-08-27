const express = require('express');
const router = express.Router();

const ctrl = require("../../controllers/news");

// Get news endpoint
router.get('/', ctrl.getNews);

module.exports = router;
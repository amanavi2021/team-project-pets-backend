const express = require('express');
const router = express.Router();

const ctrl = require("../../controllers/services");

// Get contact services information endpoint 
router.get('/', ctrl.getServices);

module.exports = router;
// clapCount.routes.js
const express = require('express');
const router = express.Router();
const { getClapCount, addClapCount } = require('../controllers/clapCount.controller');

router.get('/clapCount', getClapCount);
router.post('/clapCount', addClapCount);

module.exports = router;
// clapCount.routes.js
const express = require('express');
const router = express.Router();
const { getClapCount, addClapCount, clearClapCount } = require('../controllers/clapCount.controller');

router.get('/clapCount', getClapCount);
router.post('/clapCount', addClapCount);
router.delete('/clapCount', clearClapCount);

module.exports = router;
const express = require('express')
const router = express.Router();
const cors = require('cors');
const { sendEmail } = require('../controllers/email.controller');

router.use(cors());

// Send Email
router.post('/contact', sendEmail);

module.exports = router;
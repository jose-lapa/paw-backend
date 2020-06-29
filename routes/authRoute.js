const express = require('express');
const router = express.Router();

const auth = require('../controllers/authController');

router.post('/login', (req, res) => auth.login );
router.post('/register', (req, res) => auth.register );
router.post('/logout', (req, res) => auth.logout)

module.exports = router;
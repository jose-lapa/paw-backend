const express = require('express');
const router = express.Router();

const auth = require('../controllers/authController');

router.post('/login', (req, res) => auth.login( req, res ) );

router.post('/register/buyer', (req, res) => auth.registerBuyer( req, res ) );

router.post('/register/seller', (req, res) => auth.registerSeller( req, res ) );

router.post('/logout', (req, res) => auth.logout( req, res ) );

module.exports = router;
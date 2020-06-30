const express = require('express');
const router = express.Router();

const AuthRouter = require('./authRoute');
const ComplaintRouter = require('../controllers/complaintController');

module.exports = router;
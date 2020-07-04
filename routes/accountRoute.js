const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');
const AccountController = require('../controllers/accountController');

router.get( '/', ( req, res ) => AccountController.show( req, res ) );

router.get( '/:id', ( req, res ) => AccountController.getById( req, res ) );

router.put( '/:id', ( req, res ) => AccountController.editById( req, res ) );

router.delete( '/:id', ( req, res ) => AccountController.deleteById( req, res ) );

module.exports = router;

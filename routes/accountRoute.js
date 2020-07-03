const express = require('express');
const router = express.Router();

const AuthRouter = require('./authRoute');
const AccountController = require('../controllers/accountController');

router.get( '/', ( req, res, next ) => AccountController.show );

router.get( '/:id', ( req, res, next ) => AccountController.getById );

router.post( '/', ( req, res, next ) => AccountController.save );

router.put( '/:id', ( req, res, next ) => AccountController.editById );

router.delete( '/:id', ( req, res, next ) => AccountController.deleteById );

module.exports = router;

const express = require('express');
const router = express.Router();

const AuthRouter = require('./authRoute');
const AccountController = require('../controllers/accountController');

router.get( '/', ( req, res, next ) => AccountController.show );

router.get( '/buyer/:id', ( req, res, next ) => AccountController.getBuyerById );

router.get( '/seller/:id', ( req, res, next ) => AccountController.getSellerById );

router.put( '/buyer/:id', ( req, res, next ) => AccountController.editBuyer );

router.put( '/seller/:id', ( req, res, next ) => AccountController.editSeller );

router.delete( '/buyer/:id', ( req, res, next ) => AccountController.deleteBuyerById );

router.delete( '/seller/:id', ( req, res, next ) => AccountController.deleteSellerById );

module.exports = router;

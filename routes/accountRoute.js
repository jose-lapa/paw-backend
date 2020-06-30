const express = require('express');
const router = express.Router();

const AccountController = require('../controllers/accountController');

router.get( '/', ( req, res, next ) => AccountController.show );

router.get( '/buyer', ( req, res, next ) => AccountController.getBuyerById );

router.get( '/seller', ( req, res, next ) => AccountController.getSellerById );

router.put( '/buyer', ( req, res, next ) => AccountController.editBuyer );

router.put( '/seller', ( req, res, next ) => AccountController.editSeller );

router.put( '/buyer', ( req, res, next ) => AccountController.editBuyer );

router.delete( '/seller', ( req, res, next ) => AccountController.deleteSeller );

module.exports = router;

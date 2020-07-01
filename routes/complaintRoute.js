const express = require('express');
const router = express.Router();

const AuthRouter = require('./authRoute');
const ComplaintController = require('../controllers/complaintController');

router.get( '/', ( req, res, next ) => ComplaintController.show );

router.get( '/:id', ( req, res, next ) => ComplaintController.getById );

router.post( '/', ( req, res, next ) => ComplaintController.create );

router.put( '/:id', ( req, res, next ) => ComplaintController.updateById );

router.delete( '/:id', ( req, res, next ) => ComplaintController.deleteById );

module.exports = router;
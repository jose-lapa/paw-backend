const express = require('express');
const router = express.Router();

const ComplaintController = require('../controllers/complaintController');

router.get( '/', ( req, res ) => ComplaintController.show( req, res ) );

router.get( '/:id', ( req, res ) => ComplaintController.getById( req, res ) );

router.post( '/', ( req, res ) => ComplaintController.create( req, res ) );

router.put( '/:id', ( req, res ) => ComplaintController.updateById( req, res ) );

router.delete( '/:id', ( req, res ) => ComplaintController.deleteById( req, res ) );

module.exports = router;
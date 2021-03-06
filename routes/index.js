const express = require('express');
var router = express.Router();

const AuthRouter = require('./authRoute');
const BuyerRouter = require('./buyerRoute');
const SellerRouter = require('./sellerRoute');
const ProductRouter = require('./productRoute');
const OrderRouter = require('./orderRoute');
const ComplaintRouter = require('./complaintRoute');

router.get( '/', ( _, res ) => {
	res.status( 200 ).send( { message: 'Up and running.' } );
});

router.use( '/auth', AuthRouter );
router.use( '/buyer', BuyerRouter );
router.use( '/seller', SellerRouter );
router.use( '/products', ProductRouter );
router.use( '/order', OrderRouter );
router.use( '/complaint', ComplaintRouter );

module.exports = router;
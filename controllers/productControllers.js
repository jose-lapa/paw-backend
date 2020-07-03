const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Product = require('../models/productModel');

const ProductController = {};

ProductController.create = function ( req, res ) {
    
    const randomBasedUuid = uuidv4();
    const productInfo = {
        uuid: randomBasedUuid,
        seller: req.body.seller,
        name: req.body.name,
        description: req.body.description,
        stock: req.body.stock
    }

    Product.create( productInfo, function ( error, product ) {
        if ( error ) {
            return res.status( 500 ).send( { message: 'Server error.' } );
        }

        if ( !product ) {
            return res.status( 500 ).send( { message: 'Server error.' } );
        } else {
            return res.status( 200 ).send( 
                {
                    message: 'Product created.',
                    product: product
                }
            );
        }
    });
}

ProductController.getByName = function (req, res) {
    
    Product.find( { name: req.param.name } , function ( error, products ) {
        if ( error ) {
            return res.status( 500 ).send( { message: 'Server Error' } );
        }

        if ( !product ) {
            return res.status( 404 ).send( { message: 'Not found.' } );
        } else {
            return res.status( 200 ).send( { products: products } );
        }
    })
} 

module.exports = ProductController;

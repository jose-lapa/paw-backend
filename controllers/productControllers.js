const { v4: uuidv4 } = require('uuid');

const Product = require('../models/productModel');

var ProductController = {};

ProductController.show = function ( _, res ) {
    console.log('Cheguei');
    Product.find( {}, function ( error, products ) {
        if ( error ) {
            return res.status( 500 ).send( { message: 'Server Error.' } );
        }

        if ( !products ) {
            return res.status( 500 ).send( { message: 'Server Error.' } );
        } else {
            return res.status( 200 ).send( { products: products } );
        }
    });
}

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
            return res.status( 500 ).send( { message: 'Server Error.' } );
        }

        if ( !product ) {
            return res.status( 404 ).send( { message: 'Not found.' } );
        } else {
            return res.status( 200 ).send( { products: products } );
        }
    });
} 

ProductController.getById = function (req, res) {
    
    Product.find( { uuid: req.param.id } , function ( error, products ) {
        if ( error ) {
            return res.status( 500 ).send( { message: 'Server Error.' } );
        }

        if ( !product ) {
            return res.status( 404 ).send( { message: 'Not found.' } );
        } else {
            return res.status( 200 ).send( { products: products } );
        }
    });
} 

ProductController.getBySeller = function ( req, res ) {
    
    Product.find( { seller: req.param.id } , function ( error, products ) {
        if ( error ) {
            return res.status( 500 ).send( { message: 'Server Error.' } );
        }

        if ( !product ) {
            return res.status( 404 ).send( { message: 'Not found.' } );
        } else {
            return res.status( 200 ).send( { products: products } );
        }
    });
} 

ProductController.updateById = function ( req, res ) {
    Product.findOneAndUpdate( { uuid: req.param.id }, req.body, { new: true }, 
        function ( error, product ) {
            if ( error ) {
                return res.status( 500 ).send( { message: 'Server Error.'} );
            }

            if ( !doc ) {
                return res.status( 500 ).send( { message: 'Server Error.'} );
            } else {
                return res.status( 200 ).send( { product: product } );
            }
        });
}

ProductController.deleteById = function ( req, res ) {
    Product.deleteOne( { uuid: req.param.id }, function ( error ) {
        if ( error ) {
            return res.status( 500 ).send( { message: 'Server Error.'} );
        }
    });
}

module.exports = ProductController;

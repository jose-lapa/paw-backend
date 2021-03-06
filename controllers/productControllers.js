const { v4: uuidv4 } = require('uuid');

const Product = require('../models/productModel');

var ProductController = {};

ProductController.show = function ( _, res ) {
    Product.find( {}, function ( error, products ) {
        if ( error ) {
            return res.status( 500 ).send( { message: 'Server Error.' } );
        }

        if ( !products ) {
            return res.status( 404 ).send( { message: 'Not found.' } );
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
            return res.status( 500 ).send( 
                {
                    message: 'Server error.',
                    error: error 
                } );
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
    
    Product.find( { name: req.params.name } , function ( error, products ) {
        if ( error ) {
            return res.status( 500 ).send( 
                {
                    message: 'Server Error.',
                    error: error
                }
            );
        }

        if ( !product ) {
            return res.status( 404 ).send( { message: 'Not found.' } );
        } else {
            return res.status( 200 ).send( { products: products } );
        }
    });
} 

ProductController.getById = function (req, res) {
    
    Product.find( { uuid: req.params.id } , function ( error, products ) {
        if ( error ) {
            return res.status( 500 ).send( 
                {
                    message: 'Server Error.',
                    error: error
                }
            );
        }

        if ( !product ) {
            return res.status( 404 ).send( { message: 'Not found.' } );
        } else {
            return res.status( 200 ).send( { products: products } );
        }
    });
} 

ProductController.getBySeller = function ( req, res ) {
    
    Product.find( { seller: req.params.id } , function ( error, products ) {
        if ( error ) {
            return res.status( 500 ).send( 
                {
                    message: 'Server Error.',
                    error: error
                }
            );
        }

        if ( !product ) {
            return res.status( 404 ).send( { message: 'Not found.' } );
        } else {
            return res.status( 200 ).send( { products: products } );
        }
    });
} 

ProductController.updateById = function ( req, res ) {
    Product.findOneAndUpdate( { uuid: req.params.id }, req.body, { new: true }, 
        function ( error, product ) {
            if ( error ) {
                return res.status( 500 ).send( 
                    {
                        message: 'Server Error.',
                        error: error
                    }
                );
            }

            if ( !product ) {
                return res.status( 500 ).send( { message: 'Server Error.'} );
            } else {
                return res.status( 200 ).send( { product: product } );
            }
        });
}

ProductController.deleteById = function ( req, res ) {
    Product.remove( { uuid: req.params.id }, function ( error ) {
        if ( error ) {
            return res.status( 500 ).send( 
                {
                    message: 'Server Error.',
                    error: error
                }
            );
        } else {
            return res.status( 200 ).send( { message: 'Deleted.' } );
        }
    });
}

module.exports = ProductController;

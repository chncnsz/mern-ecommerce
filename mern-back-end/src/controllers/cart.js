const Cart = require('../models/cart');

exports.addItemToCart = (req, res) => {

    // res.status(200).json({ message: 'cart'});

    Cart.findOne({ user: req.user._id })
        .exec((error, cart) => {
            if (error) return res.status(400).json({ error });
            if (cart) {
                //if cart already exists then update cart by quantity

                const product = req.body.cartItems.product;
                const item = cart.cartItems.find(c => c.product == product);
                let condition, upload;
                if(item){
                    condition = { "user": req.user._id, "cartItems.product": product};
                    upload = { 
                        "$set": {
                            "cartItems.$": {
                                ...req.body.cartItems,
                                quantity: item.quantity + req.body.cartItems.quantity
                                
                            }
                        }
                    };

                    Cart.findOneAndUpdate(condition, upload)
                    .exec((error, _cart) => {
                        if(error) return res.status(400).json({ error });
                        if(_cart){
                            return res.status(201).json({ cart:_cart });
                        }
                    })
                }else{
                    condition = { user: req.user._id };
                    upload = {
                        "$push":{
                            "cartItems": req.body.cartItems
                        }
                    };
                }
                Cart.findOneAndUpdate(condition, upload)
                .exec((error, _cart) => {
                    if(error) return res.status(400).json({ error });
                    if(_cart){
                        return res.status(201).json({ cart:_cart });
                    }
                })

            } else {
                //if cart not exists then create a new cart
                const cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
                });

                cart.save((error, cart) => {
                    if (error) return res.status(400).json({ error });
                    if (cart) {
                        return res.status(201).json({ cart });
                    }
                });
            }
        });

};
// logic app registration
// import express
const {Router} = require('express');
// create object
const router = Router();
// import schema user from models
const Product = require('../models/Product');
// import express-validator
const {check, validationResult} = require('express-validator');

// Post request registation
router.post('/addProduct',
    // connect middleware
    [
        check('title', 'empty').isLength({min: 1}),
        check('price', 'empty').isLength({min: 1}),
        check('color', 'empty').isLength({min: 1}),
    ],
    async (req, res) => {
        try {
            // before receiving data from the request, need to analyze it from the beginning
            const errors = validationResult(req)
            // error checking
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid data registration"
                })
            }

            // sending email and password to back
            const {title, price, color} = req.body;

            // checking for user existence
            // const isHave = await User.findOne({title})

            // if (isHave) {
            //     // response message in back
            //     return res.status(300).json({message: 'Already product exists'})
            // }


            // create new user
            const product = new Product({
                titleProduct: title, priceProduct: price, colorProduct: color,
            })
        
            // save new user in back (await - work with bd)
            await product.save();

            // response message in back 
            res.status(201).json({message: "Product is created"})
            
        } catch (err) {
            console.log(err)
        }
    })
module.exports = router;
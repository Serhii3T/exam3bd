// logic app registration
// import express
const {Router} = require('express');
// create object
const router = Router();
// import schema user from models
const User = require('../models/User');
// import express-validator

router.post('/addToCart', async (req, res) => {
    try {
        const {idProduct, userId} = req.body;

        const cart = await User.find({userId});
        await cart.save();
        res.json(cart);

    } catch (err) {
        console.log(err);
    }
})

// export router
module.exports = router;
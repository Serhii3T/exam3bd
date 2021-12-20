// logic app registration
// import express
const {Router} = require('express');
// create object
const router = Router();
// import schema user from models
const User = require('../models/User');
// import express-validator
const {check, validationResult} = require('express-validator');
// import bcrypts for work
const bcrypt = require('bcryptjs');
// import jsonwebtoken for create token
const jwt = require('jsonwebtoken');

// Post request registation
router.post('/registration',
    // connect middleware
    [
        check('email', 'Invalid Email').isEmail(),
        check('password', 'Invalid Password').isLength({min: 8}),
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
            const {email, password} = req.body;

            // checking for user existence
            const isUsed = await User.findOne({email})

            if (isUsed) {
                // response message in back
                return res.status(300).json({message: 'Already email exists'})
            }

            // create before user, async 
            const hashedPassword = await bcrypt.hash(password, 12);

            // create new user
            const user = new User({
                email, password: hashedPassword,
            })

            // save new user in back (await - work with bd)
            await user.save();

            // response message in back 
            res.status(201).json({message: "User is created"})
            
        } catch (err) {
            console.log(err)
        }
    })
// Post request login
router.post('/login',
    // connect middleware
    [
        check('email', 'Invalid Email').isEmail(),
        check('password', 'Invalid Password').exists(),
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
            const {email, password} = req.body;

            // find and checking user
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: 'User is not defind'});
            }

            // unhashed password and checking
            const isMatch = bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Password not match'});
            }

            // create new token for login(sign up) in system
            // unique key - random string
            const jwtSecret = 'fasdfav4354t234f134v45435t13rsv54t';
            // create token
            const token = jwt.sign(
                // coder date param in token
                {userId: user.id},
                // unique key
                jwtSecret,
                // time work     token
                {expiresIn: '1h'},
            )
            // response for front
            res.json({token, userId: user.id, email});

        } catch (err) {
            console.log(err)
        }
    })

// export router
module.exports = router;
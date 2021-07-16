const express = require('express');
const { signup, signin, requireSignIn } = require('../controllers/auth');

const { validateSignupResult, validateSigninResult, isRequestValidated } = require('../validators/auth');
const router = express.Router();


router.post('/signup',validateSignupResult, isRequestValidated, signup);
router.post('/signin', validateSigninResult, isRequestValidated, signin);

// router.post('/profile', requireSignIn, (req, res) => {
//     res.status(200).json({ user: 'profile'});
// });

module.exports = router;
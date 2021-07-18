const express = require('express');
const { signup, signin, signout } = require('../../controllers/admin/auth');
const { validateSigninResult,validateSignupResult, isRequestValidated } = require('../../validators/auth');
const { requireSignin } = require('../../common-middleware'); 
const router = express.Router();



router.post('/admin/signup', validateSignupResult, isRequestValidated, signup);
router.post('/admin/signin', validateSigninResult, isRequestValidated, signin);
router.post('/admin/signout', requireSignin, signout);

module.exports = router;
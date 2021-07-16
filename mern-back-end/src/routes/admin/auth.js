const express = require('express');
const { signup, signin, requireSignIn } = require('../../controllers/admin/auth');
const router = express.Router();
const User = require('../../models/user');
const { validateSigninResult,validateSignupResult, isRequestValidated } = require('../../validators/auth');


router.post('/admin/signup', validateSignupResult, isRequestValidated, signup);
router.post('/admin/signin', validateSigninResult, isRequestValidated, signin);

module.exports = router;
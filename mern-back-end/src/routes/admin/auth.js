const express = require('express');
const { signup, signin} = require('../../controllers/admin/auth');
const { validateSigninResult,validateSignupResult, isRequestValidated } = require('../../validators/auth');
const router = express.Router();


router.post('/admin/signup', validateSignupResult, isRequestValidated, signup);
router.post('/admin/signin', validateSigninResult, isRequestValidated, signin);

module.exports = router;
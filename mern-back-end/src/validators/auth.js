const {check, validationResult} = require('express-validator');

exports.validateSignupResult = [
    check('firstName')
    .notEmpty()
    .withMessage('firstName gerekli'),
    check('lastName')
    .notEmpty()
    .withMessage('lastName gerekli'),
    check('email')
    .isEmail()
    .withMessage('email gerekli'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Parola 6 karakterden az olamaz')
];

exports.validateSigninResult = [
    check('email')
    .isEmail()
    .withMessage('email gerekli'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Parola 6 karakterden az olamaz')
];


exports.isRequestValidated = (req,res,next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next();
}
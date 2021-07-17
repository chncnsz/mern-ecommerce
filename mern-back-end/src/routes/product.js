const express = require('express');
// const { addCategory, getCategories } = require('../controllers/category');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createProduct } = require('../controllers/product');
const multer = require('multer');
//const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const shortid = require('shortid');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + file.originalname)
    }
})

const upload = multer({ storage });

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);


// router.post('/product/create', requireSignin, adminMiddleware, addCategory);
// router.get('/product/getproduct', getCategories);

module.exports = router;
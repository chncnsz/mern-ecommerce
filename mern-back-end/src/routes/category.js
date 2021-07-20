const express = require('express');
const { addCategory, getCategories, updateCategories } = require('../controllers/category');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + file.originalname)
    }
})
const upload = multer({ storage });

router.get('/category/getcategory', getCategories);
router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory);
router.post('/category/update', upload.single('categoryImage'), updateCategories);

module.exports = router;
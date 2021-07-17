const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//routes
const userRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

//environment variable or you can say constants
env.config(); 

// mongodb connection
//mongodb://localhost:27017/ecommerce?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
mongoose.connect(
    'mongodb://localhost:27017/ecommerce?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database connected');
});


app.use(express.json());
app.use('/public', express.static(path.join(__dirname,'uploads')));
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
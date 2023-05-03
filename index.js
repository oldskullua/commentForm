const express = require("express") 
const bodyParser = require("body-parser");
const path = require('path');

const { productController, productMiddleware } = require('./controllers/productController');
const commentController = require('./controllers/commentController');

const app = express();
    
app.use(bodyParser.json());

app.use('/product/:id', express.static(path.resolve(__dirname, 'public/product')));
app.use('/', express.static(path.resolve(__dirname, 'public/home')));

app.use('/api/product/:productId', productMiddleware, commentController);
app.use('/api', productController);

app.listen(3000, () => {
    console.log('Server has started and listen on 127.0.0.1:3000');
})

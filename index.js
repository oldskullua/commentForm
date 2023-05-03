const express = require("express") 
const bodyParser = require("body-parser");
const path = require('path');

const { productController, productMiddleware } = require('./controllers/productController');
const commentController = require('./controllers/commentController');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('layout.ejs', {title: null, page: 'pages/index.ejs'});
});
app.use('/api/products/:productId', productMiddleware, commentController);
app.use('/products', productController);

app.listen(3000, () => {
    console.log('Server has started and listen on 127.0.0.1:3000');
})

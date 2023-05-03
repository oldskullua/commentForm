const { Router } = require("express");
const db = require('../db/models');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await db.Product.findAll({ limit: req.query.pageSize });
        res.render('layout.ejs', {
            page: 'pages/products.ejs',
            title: 'Продукція магазину',
            products: products.map(item => item.dataValues),
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500);
    }
});
router.get('/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id) 
        if (Number.isNaN(id) || id < 1)
            return res.status(400).send({
                status: 'Bad Request',
                reason: 'The `id` shoud be UNSIGNED INTEGER greater than 0'
            });
        const product = await db.Product.findOne({ where: { id, } });
        res.render('layout.ejs', {
            page: 'pages/product.ejs',
            title: 'Продукція магазину',
            product: product.dataValues,
            commetsHandler: '/loader.js'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
});

async function productMiddleware(req, res, next) {
    const id = Number.parseInt(req.params.productId);
    if (Number.isNaN(id) || id < 1)
        return res.status(400).send({
            status: 'Bad Request',
            reason: 'The `id` shoud be UNSIGNED INTEGER greater than 0'
        });
    req.productId = id;
    return next();
}

module.exports = {
    productController: router,
    productMiddleware
}
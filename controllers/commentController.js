const { Router } = require("express");
const db = require('../db/models');

const router = Router();

router.get('/comments', async (req, res) => {
    try {
        const comments = await db.Comment.findAll({
            where: {
                ProductId: req.productId,
            },
            order: [[req.query.sortBy, req.query.order == 'descending'?'DESC':'ASC']],
            limit: req.query.limit
        })
        res.status(200).send(comments.map(item => item.dataValues));
    }
    catch (error) {
        console.error(error);
    }
});

router.post('/comments', async (req, res) => {
    try {
        const comment = await db.Comment.create({
            ...req.body,
           ProductId: req.productId
        });
        return res.status(200).send(comment);
    }
    catch (error) {
        console.error(error.message)
        return res.status(400).send({
            status: 'Bad Request',
            reason: error.message 
        });
    }
});

module.exports = router;
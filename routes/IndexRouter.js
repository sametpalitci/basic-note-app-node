const express = require('express');
const router = express.Router();

const articleModel = require('../models/ArticleModel');
router.get('/', async (req, res) => {
    const articleData = await articleModel.find({});
    res.render('index', { articleData });
})

module.exports = router;
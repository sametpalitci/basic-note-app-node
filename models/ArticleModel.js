const mongoose = require('mongoose');

const ArticleModel = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('articleModel', ArticleModel);
const mongoose = require('mongoose');

//Article Schema
const articleSchema = mongoose.Schema({
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    category: {
        type: String
    },
    body: {
        type: String
    },
    author: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    comments: [{
        comment_subject: {
            type: String
        },
        comment_body: {
            type: String
        },
        comment_author: {
            type: String
        },
        comment_email: {
            type: String
        },
        comment_date: {
            type: String
        }
    }]
});

const Article = module.exports = mongoose.model('Article', articleSchema);

//Add Article
module.exports.addArticles = function (article, callback) {
    Article.create(article, callback);
}

//Get Article
module.exports.getArticles = function(callback, limit) {
    Article.find(callback).limit(limit).sort([['title', 'ascending']]);
}

//Get single article by Id
module.exports.getArticleById = function (id, callback) {
    Article.findById(id, callback);
}

//Update Article
module.exports.updateArticle = function (query, update, {}, callback) {
    Article.findOneAndUpdate(query,update, {}, callback)
}

//Remove Article
module.exports.removeArticle = function (query, callback) {
    Article.remove(query, callback);
}


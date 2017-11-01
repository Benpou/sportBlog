const express = require('express');
const router = express.Router();

Article = require('../models/article');

router.get('/', (req, res, next) => {
    res.render('articles', {title:'title'});
});


router.get('/show/:id', (req, res, next) => {
    res.render('article', {
        title: 'Article'
    });
});

router.get('/category/:category_id', (req, res, next) => {
    res.render('articles', {
        title: 'Category Articles'
    });
});

//POST - Add Article

router.post('/add', (req, res, next) => {
    let article = new Article();

    article.title = req.body.title;
    article.subtitle = req.body.subtitle;
    article.caegory = req.body.category
    article.body = req.body.body;
    article.author = req.body.author;

    Article.addArticles(article, (err, article) => {
        if (err) {
            res.send(err);
        }
        res.redirect('/manage/articles');
    });
});


module.exports = router;
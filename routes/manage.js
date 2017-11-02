const express = require('express');
const router = express.Router();

Category = require('../models/category');
Article = require('../models/article');

//GEt Articles
router.get('/articles', (req, res, next) => {
    Article.getArticles((err, articles) => {
        if (err) {
            res.send(err);
        }
        res.render('manage_articles', {
        title: 'Manage Articles',
        articles: articles
        });
    });

});


//Get Categories
router.get('/categories', (req, res, next) => {
    Category.getCategories((err, categories) => {
        if (err) {
            res.send(err)
        }

        res.render('manage_categories', {
            title: 'Categories',
            categories: categories
        });
    });
});

//Edit category
router.get('/articles/add', (req, res, next) => {
    Category.getCategories((err, categories) => {
        if (err) {
            res.send(err);
        }
        res.render('add_article',
        {title: 'Create Article', categories: categories});

    });
});

// Add Category
router.get('/categories/add', (req, res, next) => {
    res.render('add_categories', {title: 'Create Categories'});
});

// Edit Article
router.get('/articles/edit/:id', (req, res, next) => {
    var userID = req.params.id;

    Article.getArticleById(userID, (err, article) => {
        if (err) {
            res.send(err)
        }
        Category.getCategories((err, categories) => {
            res.render('edit_article',
            {title: 'Edit Articles', article: article, categories:categories});
        });
    });
});

//Edit Category

router.get('/categories/edit/:id', (req, res, next) => {
    var userID = req.params.id;
    Category.getCategoryById(userID, (err, category) => {
       if (err) {
           res.sendStatus(400).send(err);
       }
       res.render('edit_category', {
           title: 'Edit Category',
        category: category
       });
    });
});




module.exports = router;
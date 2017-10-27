const express = require('express');
const router = express.Router();

Category = require('../models/category');

router.get('/articles', (req, res, next) => {
    res.render('manage_articles', {
        title: 'Manage Articles'
    });
});

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

router.get('/articles/add', (req, res, next) => {
   res.render('add_article', {title: 'Create Article'});
});

router.get('/categories/add', (req, res, next) => {
    res.render('add_categories', {title: 'Create Categories'});
});

router.get('/articles/edit/:id', (req, res, next) => {
    res.render('edit_article', {title: 'Edit Articles'});
});


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
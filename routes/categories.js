const express = require('express');
const router = express.Router();

Category = require('../models/category');

router.get('/', (req, res, next) => {
    Category.getCategories((err, categories) => {
        //console.log(categories);
        if (err) {
            res.send(err);
        }
        res.render('categories', {
            title: 'Categories',
            categories: categories
        });
    });
});

//Add Category - POST
router.post('/add', (req, res, next) => {
    req.checkBody('title', 'Title is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.render('add_categories', {
            errors: errors,
            title: 'Create Category'
        });
    } else {
        let category = new Category();
        category.title = req.body.title;
        category.description = req.body.description;

        Category.addCategory(category, (err, category) => {
            if (err) {
                res.send(err);
            }
            res.redirect('/manage/categories');
        });
    }
});

//Edit Category - POST
router.post('/edit/:id', (req, res, next) => {
    let category = new Category();
    const query = {_id: req.params.id}
    const update = {title: req.body.title,
                    description: req.body.description
                }


    Category.updateCategory(query, update, {}, (err, category) => {
        if (err) {
            res.send(err);
        }
        res.redirect('/manage/categories');
    });
});


//Delete Category -Delete
router.delete('/delete/:id', (req, res, next) => {
    const query = {_id: req.params.id}

    Category.removeCategory(query, (err, category) => {
        if (err) {
            res.send(err);
        }
        res.status(200);
    });
});

module.exports = router;

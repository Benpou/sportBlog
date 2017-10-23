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



module.exports = router;

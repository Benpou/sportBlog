/**
 * Created by bpournasr on 10/17/17.
 */
const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.send('Manage');
});


router.get('/articles/add', (req, res, next) => {
   res.render('add_article', {title: 'Create Article'});
});

router.get('/categories/add', (req, res, next) => {
    res.render('add_categories', {title: 'Create Categories'});
});



module.exports = router;
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

//Add Article - POST

router.post('/add', (req, res, next) => {
    req.checkBody('title', 'Title is require').notEmpty();
    req.checkBody('author', 'Author is require').notEmpty();
    req.checkBody('category', 'Category is required').notEmpty();
    req.checkBody('body', 'Body is require').notEmpty();
    
    let errors = req.validationErrors();
    
    if (errors) {
      Category.getCategories((err, categories) => {
        res.render('add_article', {
            errors: errors,
            title: 'Create Article',
            categories: categories
        });
      });
    } else {
      
      let article = new Article();
  
      article.title = req.body.title;
      article.subtitle = req.body.subtitle;
      article.category = req.body.category
      article.body = req.body.body;
      article.author = req.body.author;
  
      Article.addArticles(article, (err, article) => {
        if (err) {
          res.send(err);
        }
        res.redirect('/manage/articles');
      });
    }
});

//Edit Article - POST

router.post('/edit/:id', (req, res, next) => {
  req.checkBody('title', 'Title is require').notEmpty();
  req.checkBody('author', 'Author is require').notEmpty();
  req.checkBody('category', 'Category is required').notEmpty();
  req.checkBody('body', 'Body is require').notEmpty();
  
  let errors = req.validationErrors();
  
  if (errors) {
    Category.getCategories((err, categories) => {
      res.render('add_article', {
        errors: errors,
        title: 'Edit Article',
        categories: categories
      });
    });
  } else {
    let article = new Article();
  
    const query = {_id: req.params.id}
    const update = {
      title : req.body.title,
      subtitle: req.body.subtitle,
      category: req.body.category,
      body: req.body.body,
      author: req.body.author
    }
    Article.updateArticle(query, update, {}, (err, article) => {
      if (err) {
        res.send(err);
      }
      res.redirect('/manage/articles');
    });
  }

});

// Delete Article
router.delete('/delete/:id', (req, res, next) => {
    let query = {_id: req.params.id}

    Article.removeArticle(query, (err, article) => {
        if (err) {
            res.send(err)
        }
        res.redirect('/manage/article')
    });
});

module.exports = router;



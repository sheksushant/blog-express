var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/articles', function(req, res, next) {
  res.render('manage_articles', { title: 'Manage Articles' });
});

router.get('/categories', function(req, res, next) {
  res.render('manage_categories', { title: 'Manage Categories' });
});

router.get('/articles/add', function(req, res, next) {
  res.render('add_article', { title: 'Create Article' });
});

router.get('/categories/add', function(req, res, next) {
  res.render('add_category.', { title: 'Create Category' });
});

module.exports = router;

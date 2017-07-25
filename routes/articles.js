var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('articles', { title: 'Articles' });
});

router.get('/show/:id', function(req, res, next) {
  res.render('article');
});

router.get('/category/:category_id', function(req, res, next) {
  res.render('articles');
});

module.exports = router;

var express = require('express');
var router = express.Router();

var Category = require('../models/category.js');
var Article = require('../models/article.js');

router.get('/articles', function(req, res, next) {
	Article.getArticles(function(err, articles){
		if(err){
			res.send(err);
		} else {
			res.render('manage_articles', {
				title: 'Manage Articles',
				articles: articles
			});
		}
	});

});

router.get('/categories', function(req, res, next) {
  Category.getCategories(function(err, categories){
		if(err){
			res.send(err);
		} else {
			res.render('manage_categories', {
				title: 'Manage Categories',
				categories: categories
			});
		}
	});
});

router.get('/articles/add', function(req, res, next) {
	Category.getCategories(function(err, categories){
		res.render('add_article', {
			title: 'Create Article',
			categories: categories });
	});
});

router.get('/categories/add', function(req, res, next) {
  res.render('add_category', { title: 'Create Category' });
});

router.get('/articles/edit/:id', function(req, res, next) {
Article.getArticleById([req.params.id], function(err, article){
  	if(err){
			res.send(err);
		} else {
			Category.getCategories(function(err, categories){
					res.render('edit_article', {
					title: 'Edit Article',
					article: article,
					categories: categories
				});
			});
		}
  })});

router.get('/categories/edit/:id', function(req, res, next) {
  Category.getCategoryById([req.params.id], function(err, category){
  	if(err){
			res.send(err);
		} else {
			res.render('edit_category', {
				title: 'Edit Category',
				category: category
			});
		}
  })
});


module.exports = router;

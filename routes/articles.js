var express = require('express');
var router = express.Router();

var Article = require('../models/article.js');
var Category = require('../models/category.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	Article.getArticles(function(err, articles){
		if(err){
			res.send(err);
		} else {
			res.render('articles', {
				title: 'All Articles',
				articles: articles
			 });
		}
	});
});

router.get('/show/:id', function(req, res, next) {
	Article.getArticleById([req.params.id], function(err, article){
		if(err){
			res.send(err);
		} else {
			res.render('article', {
				article: article
			 });
		}
	});
});

router.get('/category/:category_id', function(req, res, next) {
	Article.getArticles({category:req.params.category_id}, function(err, articles){
		if(err){
			console.log(err);
			res.send(err);
		} else {
            Category.getCategoryById(req.params.category_id, function(err, category){
                res.render('articles', {
                    "title": category.title,
                    "articles": articles
                });
            });
		}
	});
});

router.post('/add', function(req, res){
	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('author','Author field is required').notEmpty();
    req.checkBody('category','Category field is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		Category.getCategories(function(err, categories){
			res.render('add_article', {
				errors: errors,
				title: "Add Article",
				categories: categories
			});
		});
	} else {
		var article = new Article();
		article.title = req.body.title;
        article.subtitle = req.body.subtitle;
        article.category = req.body.category;
        article.body = req.body.body;
        article.author = req.body.author;

		Article.addArticle(article, function(err, article){
			if(err){
				res.send(err);
			} else {
				req.flash('success', 'Article Saved');
				res.redirect('/manage/articles');
			}
		});
	}
});


router.post('/edit/:id', function(req, res, next){
    // Validation Rules
    req.checkBody('title','Title field is required').notEmpty();
    req.checkBody('author','Author field is required').notEmpty();
    req.checkBody('category','Category field is required').notEmpty();
    // Check Errors
	var errors = req.validationErrors();

    if(errors){
         res.render('edit_article',{
			"errors": errors,
			"title": req.body.title,
            "subtitle": req.body.subtitle,
			"body": req.body.body,
            "author": req.body.author,
            "category": req.body.category
		});
    } else {
        var article = new Article();
        var query = {_id:[req.params.id]};
        var update = {
            title:req.body.title,
            subtitle:req.body.subtitle,
            category:req.body.category,
            author:req.body.author
        };

        Article.updateArticle(query, update, {}, function(err, article){
            if(err){
				res.send('Error: '+err);
			} else {
                req.flash('success','Article Updated');
                res.location('/manage/articles');
                res.redirect('/manage/articles');
            }
        });
    }
});


router.delete('/delete/:id', function (req, res){
    var query = {_id: [req.params.id]};
    Article.remove(query, function(err){
        if(err){
				res.send('Error: '+err);
        } else {
            res.status(204).send();
        }
    });
});

router.post('/comments/add/:id', function(req, res, next){
    // Validation Rules
    req.checkBody('comment_subject','Subject field is required').notEmpty();
    req.checkBody('comment_author','Author field is required').notEmpty();
    req.checkBody('comment_body','Body field is required').notEmpty();
    // Check Errors
	var errors = req.validationErrors();

    if(errors){
        Article.getArticleById([req.params.id], function(err, article){
            if(err){
                console.log(err);
                res.send(err);
            } else {
               res.render('article',{
                    "errors": errors,
                    "article": article,
                    "comment_subject": req.body.comment_subject,
                    "comment_author": req.body.comment_author,
                    "comment_body": req.body.comment_body,
                    "comment_email": req.body.comment_email
                });
            }
	   });
    } else {
        var article = new Article();
        var query = {_id:[req.params.id]};

        var comment = {
            "comment_subject":req.body.comment_subject,
            "comment_author":req.body.comment_author,
            "comment_body":req.body.comment_body,
            "comment_email":req.body.comment_email
        };

        Article.addComment(query, comment, function(err, article){
            if(err){
				res.send('Error: '+err);
			} else {
                Article.getArticleById([req.params.id], function(err, article){
                    if(err){
                        console.log(err);
                        res.send(err);
                    } else {
                       res.render('article',{
                            "article": article,
                            "successMsg": 'Comment Added'
                        });
                    }
               });
            }
        });
    }
});

module.exports = router;

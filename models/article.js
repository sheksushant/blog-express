var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
	title: {
		type: String
	},
	subtitle: {
		type: String
	},
	category: {
		type: String
	},
	body: {
		type: String
	},
	author: {
		type: String
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	comments: [{
		comment_subject:{
			type: String
		},
		comment_body:{
			type: String
		},
		comment_author:{
			type: String
		},
		comment_email:{
			type: String
		},
		comment_date:{
			type: String
		}
	}]
});

var Article = module.exports = mongoose.model('Article', articleSchema);

// Get Articles
module.exports.getArticles = function(query, callback, limit){
	Article.find(query, callback).limit(limit);
}

// Add Article
module.exports.addArticle = function(article, callback){
	Article.create(article, callback);
}

// Get Single Article
module.exports.getArticleById = function(id, callback){
	Article.findById(id, callback);
}

// Update Article
module.exports.updateArticle = function(query, update, options, callback){
	Article.findOneAndUpdate(query, update, options, callback);
}

// Add Comment
module.exports.addComment = function(query, comment, callback){
	Article.update(query,
		{ $push: {
			"comments": comment
		}

		},
		callback);
}

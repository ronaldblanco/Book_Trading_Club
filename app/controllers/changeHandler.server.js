'use strict';

var Users = require('../models/users.js');
var books = require('google-books-search');
var unhtml = require('unhtml');

function ChangeHandler () {

	this.getAllBooks = function (req, res) {
		Users
			.find({}, {})
			.exec(function (err, result) {
				if (err) { throw err; }
				
				var final = [];
				result.forEach(function(user){
					user.bookList.books.forEach(function(book){
						final.push({'user': user.github.id,'userName':user.github.username,'book':book});
					});
					
				});
				//console.log(final);
				//result.polls.push("hola");
				res.json(final);//Array

				//res.json(result.bookList.books);
			});
	};
	
	this.getChanges = function (req, res) {
		//console.log(req.body);
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.changeList.books);
			});
	};

	this.searchBook = function(req,res){
		
		var book = req.originalUrl.toString().split("/api/:id/search/")[1];//.split("_");
		books.search(book, function(error, results) {
    		if ( ! error ) {
        		//console.log(results);
        		res.send(results)
    		} else {
        		console.log(error);
    		}
		});
		
	}
	
	this.addChange = function (req, res) {
		//console.log(req.originalUrl.toString().split("/add/")[1]);
		var bookText = req.originalUrl.toString().split("/api/:id/changeadd/")[1];
		var book = bookText.split('*****');
		//console.log(book);
		var inData = {};
		/*if(book.length == 3) */inData = { title:unescape(book[0]), user:book[1], userName:book[2] };
		//else if(book.length < 3) inData = { title:unescape(book[0]), user:book[1]};
		
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $push: { 'changeList.books': inData } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.changeList.books);
				}
			);
			
	};
	
	this.delChange = function (req, res) {
		var bookTitle = req.originalUrl.toString().split("/api/:id/changedel/")[1];
		//var book = bookText.split('*****');
		//console.log(book);
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $pull: { 'changeList.books': { title:unescape(bookTitle)} } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.changeList.books);
				}
			);
	};

}

module.exports = ChangeHandler;

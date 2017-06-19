'use strict';

var Users = require('../models/users.js');
var books = require('google-books-search');

function BookHandler () {

	this.getBooks = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.bookList.books);
			});
	};

	/*this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};*/

	/*this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};*/
	
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
	
	this.addBook = function (req, res) {
		//console.log(req.originalUrl.toString().split("/add/")[1]);
		var bookText = req.originalUrl.toString().split("/api/:id/searchadd/")[1];
		var book = bookText.split('*****');
		console.log(book);
		var inData = {};
		if(book.length == 3) inData = { title:book[0], subtitle:book[1], thumbnail:book[2]};
		else if(book.length < 3) inData = { title:book[0], subtitle:undefined, thumbnail:book[1]};
		
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $push: { 'bookList.books': inData } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.bookList.books);
				}
			);
			
	};

}

module.exports = BookHandler;

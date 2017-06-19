'use strict';

var Users = require('../models/users.js');
var books = require('google-books-search');
var unhtml = require('unhtml');

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
		//console.log(book);
		var inData = {};
		if(book.length == 3) inData = { title:unhtml(book[0]).replace(/%20/g, " "), subtitle:unhtml(book[1]).replace(/%20/g, " "), thumbnail:unhtml(book[2]).replace(/%20/g, " ")};
		else if(book.length < 3) inData = { title:unhtml(book[0]).replace(/%20/g, " "), subtitle:undefined, thumbnail:unhtml(book[1]).replace(/%20/g, " ")};
		
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $push: { 'bookList.books': inData } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.bookList.books);
				}
			);
			
	};
	
	this.delBook = function (req, res) {
		var bookTitle = req.originalUrl.toString().split("/api/:id/searchdel/")[1];
		var book = unhtml(bookTitle).replace(/%20/g, " ");
		//console.log(bookTitle);
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $pull: { 'bookList.books': { title:book} } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.bookList.books);
				}
			);
	};

}

module.exports = BookHandler;

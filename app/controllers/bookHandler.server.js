'use strict';

var Users = require('../models/users.js');
var books = require('google-books-search');
var unhtml = require('unhtml');
//var bodyparser = require('simple-bodyparser');

function BookHandler () {

	this.getBooks = function (req, res) {
		console.log(req.body);
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.bookList.books);
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
	
	this.addBook = function (req, res) {
		console.log(req.originalUrl);
		//console.log(req.originalUrl.toString().split("/add/")[1]);
		var bookText = req.originalUrl.toString().split("/api/:id/searchadd?data=")[1];
		var book = bookText.split('*****');
		var inData = {};
		if(book.length == 3) inData = { title:unescape(book[0]), subtitle:unhtml(unescape(book[1])).replace(/%20/g, " "), thumbnail:unhtml(book[2]).replace(/%20/g, " ")};
		else if(book.length < 3) inData = { title:unescape(book[0]), subtitle:undefined, thumbnail:unhtml(book[1]).replace(/%20/g, " ")};
		
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
		var book = unescape(bookTitle);
		//console.log(bookTitle);
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $pull: { 'bookList.books': { title:book} } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.bookList.books);
				}
			);
	};
	
	this.getReq = function (req, res) {
		/*Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }*/
		//var result = JSON.stringify(req);
		//console.log(req);
				//res.send(result);
			//});
	};


}

module.exports = BookHandler;

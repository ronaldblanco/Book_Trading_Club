'use strict';

var Users = require('../models/users.js');
var Users1 = require('../models/users.js');
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
						final.push({'user': user.github.id,'userName':user.github.username,'book':book, 'geoLocation':user.geolocation});
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
	
	this.getAllChangesForUser = function (req, res) {
		
		var userId = req.originalUrl.toString().split("/api/:id/changesforme/")[1];
		console.log(userId);
		Users
			.find({}, {})
			.exec(function (err, result) {
				if (err) { throw err; }
				
				var final = [];
				result.forEach(function(user){
					user.changeList.books.forEach(function(book){
						if(book.user == userId) final.push({'user': user.github.id,'userName':user.github.username,'book':book});
					});
					
				});
				//console.log(final);
				//result.polls.push("hola");
				res.json(final);//Array

				//res.json(result.bookList.books);
			});
	};
	
	this.setA = function (req, res) {
		
		var bookTitle = req.originalUrl.toString().split("/api/:id/changesa/")[1].split('*****')[1];
		var user = req.originalUrl.toString().split("/api/:id/changesa/")[1].split('*****')[0];
		console.log(req.originalUrl.toString().split("/api/:id/changesa/")[1]);
		
		var state = undefined;
		Users
			.findOne({ 'github.id': user,'changeList.books.title': unescape(bookTitle), 'changeList.books.user': req.user.github.id }, { })
			.exec(function (err, result) {
					if (err) { throw err; }
					for(var a =0; a< result.changeList.books.length; a++){
						if(result.changeList.books[a].title == unescape(bookTitle)) state = result.changeList.books[a].approbed;
					}
					console.log(state);
					
					
					
					if (state === false) state = true;
					else if(state === true) state = false;
					else if (state === null) state = false;
					Users1
						.findOneAndUpdate({ 'github.id': user, 'changeList.books.title': unescape(bookTitle) /*,'changeList.books.user': req.user.github.id*/ }, { 'changeList.books.$.approbed': state })
						.exec(function (err, result) {
								if (err) { throw err; }
								//console.log(result.changeList)
								res.json(result);
							}
						);

				}
			);
			/*if (state === false) state = true;
			else if(state === true) state = false;
			else if (state === null) state = false;
			console.log(state);*/
			
		/*Users
			.findOneAndUpdate({ 'changeList.books.title': unescape(bookTitle) }, { 'changeList.books.$.approbed': state })
			.exec(function (err, result) {
					if (err) { throw err; }
					//console.log(result.changeList)
					res.json(result);
				}
			);*/
	};
	
	this.addChange = function (req, res) {
		//console.log(req.originalUrl.toString().split("/add/")[1]);
		var bookText = req.originalUrl.toString().split("/api/:id/changeadd/")[1];
		var book = bookText.split('*****');
		//console.log(book);
		var inData = {};
		/*if(book.length == 3) */inData = { title:unescape(book[0]), user:book[1], userName:book[2], approbed: false };
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
	
	this.setGeoLocation = function (req, res) {
		//console.log(req.originalUrl.toString().split("/add/")[1]);
		var bookText = req.originalUrl.toString().split("/api/:id/changesetgeo/")[1];
		var geoLocation = bookText.split('*****');
		//console.log(book);
		//var inData = {};
		/*if(book.length == 3) *///inData = { title:unescape(book[0]), user:book[1], userName:book[2], approbed: false };
		//else if(book.length < 3) inData = { title:unescape(book[0]), user:book[1]};
		
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'geolocation.city': geoLocation[0], 'geolocation.state': geoLocation[1]})
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.geolocation);
				}
			);
			
	};
	
	this.getGeoLocation = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.geolocation);
				}
			);
			
	};

}

module.exports = ChangeHandler;

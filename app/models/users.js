'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
      publicRepos: Number,
      photo: String
	},
	geolocation: {
		city: String,
		state: String
	},
	bookList: {
	    books: Array
	},
	changeList: {
	    books: Array
	},
   nbrClicks: {
      clicks: Number
   }
});

module.exports = mongoose.model('User', User);

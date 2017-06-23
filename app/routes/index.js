'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var BookHandler = require(path + '/app/controllers/bookHandler.server.js');
var ChangeHandler = require(path + '/app/controllers/changeHandler.server.js');

module.exports = function (app, passport, bodyParser) {
	
	app.use(bodyParser());

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();
	var bookHandler = new BookHandler();
	var changeHandler = new ChangeHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});
		
	app.route('/interchange')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/interchange.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
		
	app.route('/api/:id/search/*')
		.get(isLoggedIn, bookHandler.searchBook);
		
	/*app.route('/api/:id/searchadd/*')
		.post(isLoggedIn, bookHandler.addBook);*/
		
	app.route('/api/:id/searchadd')
		.post(isLoggedIn, bookHandler.addBook);
		
	app.route('/api/:id/searchdel/*')
		.get(isLoggedIn, bookHandler.delBook);
		
	app.route('/api/:id/mybooks')
		.get(isLoggedIn, bookHandler.getBooks)
		.post(isLoggedIn, bookHandler.getBooks);
		
	app.route('/api/:id/change')
		.get(isLoggedIn, changeHandler.getAllBooks);
		
	app.route('/api/:id/changesmy')
		.get(isLoggedIn, changeHandler.getChanges);
		
	app.route('/api/:id/changeadd/*')
		.get(isLoggedIn, changeHandler.addChange);
		
	app.route('/api/:id/changedel/*')
		.get(isLoggedIn, changeHandler.delChange);
		
	app.route('/api/:id/changesforme/*')
		.get(isLoggedIn, changeHandler.getAllChangesForUser);
		
	app.route('/api/:id/changesa/*')
		.get(isLoggedIn, changeHandler.setA);
		
	app.route('/api/:id/changesetgeo/*')
		.get(isLoggedIn, changeHandler.setGeoLocation);
		
	app.route('/api/:id/changegetgeo')
		.get(isLoggedIn, changeHandler.getGeoLocation);
};

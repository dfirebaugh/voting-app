'use strict';
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/users');
const configAuth = require('./auth');

module.exports = function (passport)  {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	},
	function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'githubId': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}
				
				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();
					
					newUser.githubId = profile.id;
					newUser.userName = profile.username;
					newUser.displayName = profile.displayName;
					newUser.publicRepos = profile._json.public_repos;
					newUser.avatar = profile._json.avatar_url;
					newUser.role="ADMIN";
	
	
					newUser.save(function (err) {
						if (err) {
							throw err;
						}
						
						return done(null, newUser);
					});
				}
			});
		});
	}));
};
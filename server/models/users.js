'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	githubId: String,
	userName: String,
	displayName: String,
	publicRepos: Number,
	avatar:String,
	role: String,
});

module.exports = mongoose.model('User', User);
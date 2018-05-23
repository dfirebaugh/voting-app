

const User = require('../models/users');
const Poll = require('../models/poll');

const path = process.cwd();
const apiDir = '/api/v1/';

module.exports = function (app, passport) {
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }

    app.route(`${apiDir}polls`)
        .get((req, res) => {
            const polls = Poll.find({}, (err, doc) => { res.send(doc); });
        })
        .post((req, res) => {
			console.log(req.body);

			const newPoll = new Poll({
                title: req.body.title,
                createdBy: req.body.createdBy,
            });

            newPoll.save((err, poll) => {
                if (err) {
                    res.json({
                        err: err.message,
                        // id: poll.id
                    });
                } else {
                    res.json({
                        message: 'success!',
                        id: poll.id
                    });
                }
            });
        });

    app.route(`${apiDir}polls/:pollid`)
	   .get(isLoggedIn, (req, res) => {
		   Poll.findById(req.params.pollid, (err, doc) => {
			   if (err) { res.send(err); }
			   res.json(doc);
		   });
	   })
	   .delete(isLoggedIn, (req, res) => {
		   Poll.remove({
			   _id: req.body._id
		   }, (err, poll) => {
			   if (err) { res.send(err); }

			   res.json({ message: 'Successfully deleted' });
		   });
        })
        .put(isLoggedIn, (req, res) => {
            Poll.findById(req.params.pollid, (err, poll) => {
                if (err) { res.send(err); }

                if (!poll._id) {
                    poll._id = new mongoose.mongo.ObjectID();
                }
            });
        });


    app.route(`${apiDir}polls/:pollid/:topicname/new`)
	   .post(isLoggedIn, (req, res) => {
		   Poll.findById(req.params.pollid, (err, poll) => {
                if (err) { res.send(err); }
                const topicName = req.params.topicname;

                const arr = poll.topics.map(i => i.topic);
                arr.indexOf(topicName) < 0 && poll.topics.push({ topic: topicName });

                poll.save((err, newPoll) => {
                    if (err) {
                        res.json({
                            err: err.message,
                            id: poll.id
                        });
                    } else {
                        res.json({
                            message: 'success!',
                            id: poll.id
                        });
                    }
                });
            });
	   });

    app.route(`${apiDir}polls/:pollid/:topicname/vote`)
        .post(isLoggedIn, (req, res) => {
            Poll.findById(req.params.pollid, (err, poll) => {
                if (err) { res.send(err); }
                const arr = poll.topics.map(i => i.topic);
                arr.indexOf(req.params.topicname) < 0 ?
                    console.log("topic doesn't exist") :
                    poll.topics[arr.indexOf(req.params.topicname)].votes += 1;

                poll.save((err, newPoll) => {
                    if (err) {
                        res.json({
                            err: err.message,
                            id: poll.id
                        });
                    } else {
                        res.json({
                            message: 'success!',
                            id: poll.id
                        });
                    }
                });
            });
        });


    app.route(`${apiDir}users/`)
        .get(isLoggedIn, (req, res) => {
            User.find({}, (err, doc) => res.send(doc));
        });

    app.route(`${apiDir}users/currentUser/`)
        .get(isLoggedIn, (req, res) => {
            res.send(req.user);
        });


    app.route('/')
        .get(isLoggedIn, (req, res) => req.app.render(req, res, '/index', {
            routeParam: req.params.routeParam
        }));

    app.get('/login', (req, res) => req.app.render(req, res, '/login', {
        routeParam: req.params.routeParam
    }));

    app.route('/logout')
        .get((req, res) => {
            req.logout();
            res.redirect('/login');
        });

    // auth stuff
    app.route('/auth/github')
        .get(passport.authenticate('github'));

    app.route('/auth/github/callback')
        .get(passport.authenticate('github', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
};

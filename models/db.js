var mongoose = require('mongoose');
var gracefulShutdown;
var dbUri = "mongodb://localhost:27017/cutup-headlines";
if  (process.env.NODE_ENV === 'production') {
	dbUri = 'mongodb://heroku_4ck42spc:i5lgl9ejtr1277t8egvqs9hfse@ds059804.mongolab.com:59804/heroku_4ck42spc';
}
mongoose.connect(dbUri);

mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dbUri);
});

mongoose.connection.on('error', function(err) {
	console.log('Mongoose error to ' + err);
});

mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});
var mongoose = require('mongoose');
var gracefulShutdown;
var dbUri = "mongodb://localhost:27017/cutup-headlines";
if  (process.env.NODE_ENV === 'production') {
	dbUri = 'mongodb://heroku_c4kt49qf:hj7ufpumgokdfkkmr3d36fmg8q@ds059654.mongolab.com:59654/heroku_c4kt49qf';
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
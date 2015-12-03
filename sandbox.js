var express = require('express');

var app = express();
var path = require('path');
var server = require('http').createServer(app).listen(8888);
var io = require('socket.io')(server);

// server.listen(8888);

// var handleCors = function(req, res, next) {
//   // res.set('Access-Control-Allow-Origin', '*');
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// };

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

// app.use(handleCors);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
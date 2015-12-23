var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Route
app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

// Socket
io.on('connection', function(socket){
  console.log('a user connected');
});

// Server
http.listen(3000, function(){
  console.log('listening on *:3000');
});

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
  socket.on('socket:message', function(socket){
    console.log('Receive a message');
  });
});

// Server
http.listen(3000, function(){
  console.log('listening on *:3000');
});

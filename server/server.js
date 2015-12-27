var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Route
app.get('/', function(req, res) {
  res.send('<h1>Hello world</h1>');
});

// Socket
var users = {}; // record all user info.
var socketIdToUserMap = {};
io.on('connection', function(socket) {
  // a user first time login
  socket.on('init', function(data) {
    console.log('Receive data' + JSON.stringify(data));
    socket.emit('syncCord', users); // send all current locations back

    // Add new user
    if (!users[data.id]) {
      users[data.id] = {};
      users[data.id].location = data.location;
      socketIdToUserMap[socket.id] = data.id;
    }

    console.log(JSON.stringify(users));
  });

  // a user update its location
  socket.on('sendCord', function(data) {
    console.log('Receive data' + JSON.stringify(data));

    socket.broadcast.emit('newCord', data);
  });

  socket.on('disconnect', function() {
    console.log('A user disconnect.' + socket.id);
    delete users[socketIdToUserMap[socket.id]];
    delete socketIdToUserMap[socket.id];
    console.log(JSON.stringify(users));
  });
});

// Server
http.listen(3000, function() {
  console.log('listening on *:3000');
});

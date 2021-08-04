 const express = require('express');
const { url } = require('inspector');
 const app = express()
 const server = require('http').Server(app)

 const io = require('socket.io')(server);


// const io = require('socket.io')({
//   cors: {
//     origin: ['http://localhost:3000']
//   }
// });

let message = [''];
let userCount = 0;

app.use(express.static(__dirname + '/../../build'))
io.on('connection', socket => {
  let addedUser = false;
  //When a user connects
  // This logs the connection
  console.log(`connect: ${socket.id}`);
  //Increases the user count
  userCount += 1;
  //Sends the messages to be displayed
  io.emit('message', message);
  //sends the user count
  // io.emit('user count', userCount);

  //Add user new user
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    console.log(username);
    // ++userCount;
    addedUser = true;
    io.emit('user count', {
        userCount: userCount,
        username: socket.username
      });
    io.emit('login', {
      userCount: userCount
    });
    // echo globally (all clients) that a person has connected
    let joining = socket.username + " Joined"
    message.push(joining);
    io.emit('user joined', message);
  });

  //When a user sends a new message
  socket.on('new message', (data) => {
    let str = socket.username + " : " + data;
    message.push(str);
    console.log(`hello from ${socket.id}`);
    //The message is added to the current list of messages and sent back to all users
    io.emit('message', message);
  });

  //When the user disconnects
  socket.on('disconnect', () => {
    --userCount;
    io.emit('user count', userCount);
    if (addedUser) {
      // echo globally that this client has left
      io.emit('user left', socket.username );
    }
  });
});

//Listens for the front end
server.listen(3001);

// io.listen(3001);
const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname,'public')));

// Run this when client connects
io.on('connection', socket => {

    // Welcome current user
    socket.emit('message', 'Welcome to Chit Chat!')

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Run when client DCs
    socket.on('disconnect', () => {
        io.emit('message', 'The user has left the chat');
    });

    // Listen to chat message
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    })
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log('Server running on port ' + PORT) )
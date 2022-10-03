const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const { Server } = require('socket.io'); 
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`);

    io.emit('connected', socket.id);

    socket.on('chat message', (msg) => io.emit('chat message', msg));
    socket.on('typing', userId => io.emit('typing', userId));
    socket.on('not typing', _ => io.emit('not typing'));
});

server.listen(8081, () => {
    console.log('listening on *:8081');
});
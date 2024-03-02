// Setup variables
const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});
// connect to database
mongo();
// listen for player connection
io.on('connection', (socket) => {
    console.log('a user connected');
    // Player Info Handler
    socket.on('start-game', async (info) => {
        console.log(info);

    });
});

// Setup variables
const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});
// connect to database
const mongo = require('./mongo');
const { sessionSecret, mongoPath, port } = require('./config.json');
mongo();
// listen for player connection
io.on('connection', (socket) => {
    console.log('a user connected');
    // Player Info Handler
    socket.on('start-game', async (info) => {
        console.log(info);

    });
});

const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const session = require('express-session');
const Store = require('connect-mongo');
const whitelist = ['http://127.0.0.1:3000', 'http://localhost:3000', "http://localhost:5500", "http://127.0.0.1:5500", "https://9d2a-206-196-126-250.ngrok-free.app"];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            if (origin !== undefined) {
                callback(new Error('Not allowed by CORS'))
            } else {
                callback(null, true)
            };
        }
    }
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
    secret: sessionSecret,
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: true,
    store: Store.create({ mongoUrl: mongoPath })
}))
app.use('/api', routes);


app.listen(port, () => console.log(`Listening on port ${port}!`))
console.log('MythoStock API client is live!');

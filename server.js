const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3009;
const gameRouter = require('./routers/gameRouter');
const mongoose = require('mongoose');
const passport = require('./utils/passport');

//Connect to database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('Connection to DB OK!')
});

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use('/game', gameRouter);

server.listen(port);


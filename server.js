const express = require('express');
const sessionMiddleware = require('./server-src/middlewares/sessionMiddleware');
const fs = require('fs');
const User = require('./server-src/models/userModel')

const authRouter = require('./server-src/routes/authRouter');
const userRouter = require('./server-src/routes/userRouter');
const friendRouter = require('./server-src/routes/friendRouter');
const messageRouter = require('./server-src/routes/messageRouter');
const groupRouter = require('./server-src/routes/groupRouter');
const avatarRouter = require('./server-src/routes/avatarRouter');
const imageRouter = require('./server-src/routes/imageRouter');
const { getIo, initIo } = require('./socket')

const server = express().use(express.json()).use(express.urlencoded({ extended: true })).use(sessionMiddleware);

server.use('/auth', authRouter);
server.use('/user', userRouter);
server.use('/friend', friendRouter);
server.use('/messages', messageRouter);
server.use('/group', groupRouter);
server.use('/img', imageRouter);
server.use('/src/assets/avatar', avatarRouter);

var options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}

const https = require('https').createServer(options, server).listen(8888);
initIo(https);
server.io = getIo();
console.log("Listen to 8888");

setAllUserOffline = async function () {
    await User.updateMany({}, {
        status: 'offline',
        socketId: ''
    })
}
setAllUserOffline();
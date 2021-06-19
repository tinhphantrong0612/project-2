const { Server } = require('socket.io');
const fs = require('fs');
const User = require('./server-src/models/userModel')
const Conversation = require('./server-src/models/conversationModel');
const mongoose = require('mongoose');
let io;

module.exports.initIo = (httpsServer) => {
    io = new Server(httpsServer, {
        cors: {
            origin: "*"
        }
    });

    io.on('connection', (socket) => {
        console.log(socket.id + " connected!");
        socket.on('init', async (userId) => {
            try {
                socket.join('room-' + userId);
                User.findByIdAndUpdate(userId, {
                    $set: { socketId: socket.id, status: 'online' }
                }, (error, user) => {
                    if (error) console.log(error);
                    else {
                        if (user) {
                            user.friends.forEach((friend) => { // Join friend conversations
                                socket.join('room-' + friend.conversationId);
                                socket.to('room-' + friend.conversationId).emit('online', userId); // Inform online
                            }) // Join group conversations
                            user.groups.forEach((group) => { socket.join('room-' + group.conversationId) })
                        }
                    }
                });
            } catch (error) {
                console.log("Init" + error);
            }
        });

        socket.on('online', async (userId) => {
            let user = await User.findById(userId);
            user.friends.forEach((friend) => {
                socket.to('room-' + friend.userId).emit('online', userId);
            })
        })

        socket.on('online-too', (data) => {
            socket.to('room-' + data.to).emit('online-too', data.from);
        })

        socket.on('joinConversation', (data) => {
            socket.join('room-' + data);
        })

        socket.on('seen', (data) => {
            try {
                Conversation.findOneAndUpdate({ _id: data.conversationId, 'seen.userId': { $ne: data.userId } }, {
                    $push: {
                        seen: {
                            userId: data.userId,
                            username: data.username,
                            at: Date.now()
                        }
                    }
                }, { new: true }, (error, doc) => {
                    if (error) console.log(error);
                    else if (doc) io.to('room-' + doc._id).emit('seen', doc.seen);
                })
            } catch (error) { console.log("seen" + error) }
        })

        socket.on('message', async (data) => {
            try {
                data.sent = Date.now();
                data._id = new mongoose.Types.ObjectId;
                io.to('room-' + data.conversationId).emit('message', data);
                io.to('room-' + data.conversationId).emit('seen', [{
                    userId: data.fromId,
                    username: data.from,
                    at: data.sent
                }])
                await Conversation.findByIdAndUpdate(data.conversationId, {
                    $push: {
                        messages: {
                            _id: data._id,
                            sent: data.sent,
                            from: data.from,
                            fromId: data.fromId,
                            messageType: data.messageType,
                            message: data.message,
                            messageExt: data.messageExt
                        }
                    },
                    $set: {
                        seen: [{
                            userId: data.fromId,
                            username: data.from,
                            at: data.sent
                        }]
                    }
                })
            } catch (error) { console.log(error) }
        })

        socket.on('file-message', async (data) => {
            try {
                data._id = new mongoose.Types.ObjectId;
                fs.appendFileSync('./server-src/conversations/' + data.conversationId + '/' + data.fromId + data.sent + data.messageExt, data.data, { encoding: 'base64' });
                delete data.data;
                if (data.chunkIndex + 1 >= data.chunks) {
                    io.to('room-' + data.conversationId).emit('message', data);
                    io.to('room-' + data.conversationId).emit('seen', [{
                        userId: data.fromId,
                        username: data.from,
                        at: data.sent
                    }])
                    await Conversation.findByIdAndUpdate(data.conversationId, {
                        $push: {
                            messages: {
                                _id: data._id,
                                sent: data.sent,
                                from: data.from,
                                fromId: data.fromId,
                                messageType: data.messageType,
                                message: data.message,
                                messageExt: data.messageExt
                            }
                        },
                        $set: {
                            seen: [{
                                userId: data.fromId,
                                username: data.from,
                                at: data.sent
                            }]
                        }
                    })
                }
            } catch (error) { console.log(error) }
        })

        socket.on('candidate', async (data) => {
            socket.to('room-' + data.to).emit('candidate', data);
        })

        socket.on('offer', data => {
            socket.to('room-' + data.to).emit('offer', data);
        })

        socket.on('reject', data => {
            socket.to('room-' + data.to).emit('reject', data);
        })

        socket.on('stop', data => {
            socket.to('room-' + data.to).emit('stop', data);
        })

        socket.on('answer', data => {
            socket.to('room-' + data.to).emit('answer', data);
        }) 

        socket.on('emptyLastContact', async (data) => {
            try {
                User.findByIdAndUpdate(data, {
                    $set: {
                        lastContact: {
                            contactType: null,
                            contactName: null,
                            contactId: null,
                            conversationId: null
                        }
                    }
                })
            } catch (error) { console.log(error) }
        })

        socket.on('disconnect', async () => {
            try {
                console.log(socket.id + " disconnected!")
                User.findOneAndUpdate({ socketId: socket.id }, {
                    $set: { status: 'offline', socketId: '' }
                }, (error, user) => {
                    if (user) user.friends.forEach((friend) => { io.to('room-' + friend.userId).emit('offline', user._id); })
                });
            } catch (error) { console.log(error) }
        })
    });
}

module.exports.getIo = () => {
    if (!io) {
        throw Error("io not initilized.")
    } else {
        return io;
    }
}
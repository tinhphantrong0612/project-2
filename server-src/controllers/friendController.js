const mongoose = require('mongoose');
const User = require('../models/userModel')
const Conversation = require('../models/conversationModel');
const fs = require('fs');
const path = require('path');

module.exports = {
    onSendRequest: async (req, res) => {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            let [from, to] = await Promise.allSettled([
                User.findOneAndUpdate({ _id: req.body.fromId, 'friends.userId': { $ne: req.body.toId }, 'sentRequests.userId': { $ne: req.body.toId }, 'receivedRequests.userId': { $ne: req.body.toId } }, {
                    $push: {
                        sentRequests: {
                            userId: req.body.toId,
                            username: req.body.to,
                            sent: Date.now()
                        }
                    }
                }, { new: true }),
                User.findOneAndUpdate({ _id: req.body.toId, 'friends.userId': { $ne: req.body.fromId }, 'sentRequests.userId': { $ne: req.body.fromId }, 'receivedRequests.userId': { $ne: req.body.fromId } }, {
                    $push: {
                        receivedRequests: {
                            userId: req.body.fromId,
                            username: req.body.from,
                            received: Date.now()
                        }
                    }
                })
            ])
            session.endSession();
            res.send({
                success: true,
                sentRequests: from.value.sentRequests
            })
            req.app.io.to('room-' + req.body.fromId).to('room-' + req.body.toId).emit('updateRequests');
        } catch (error) {
            console.log("Send error: " + error);
            res.status(500).send({ success: false, error: error })
        }
    },
    onAcceptRequest: async (req, res) => {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            let date = Date.now();
            let newConversation = await Conversation.createConversation([{
                userId: req.body.fromId,
                username: req.body.from,
                joint: date
            }, {
                userId: req.body.toId,
                username: req.body.to,
                joint: date
            }], req.body.from + ' accepted request from ' + req.body.to);
            if (!fs.existsSync(path.resolve('server-src/conversations/' + newConversation._id))) {
                fs.mkdir(path.resolve('server-src/conversations/' + newConversation._id), (error) => {
                    if (error) {
                        console.log(error);
                        throw error;
                    }
                });
            }
            let [from, to] = await Promise.allSettled([
                User.findOneAndUpdate({ _id: req.body.fromId, 'friends.userId': { $ne: req.body.toId }, 'sentRequests.userId': { $ne: req.body.toId } }, {
                    $push: {
                        friends: {
                            userId: req.body.toId,
                            username: req.body.to,
                            conversationId: newConversation._id
                        }
                    },
                    $pull: {
                        receivedRequests: {
                            userId: req.body.toId
                        }
                    }
                }, { new: true }),
                User.findOneAndUpdate({ _id: req.body.toId, 'friends.userId': { $ne: req.body.fromId }, 'receivedRequests.userId': { $ne: req.body.fromId } }, {
                    $push: {
                        friends: {
                            userId: req.body.fromId,
                            username: req.body.from,
                            conversationId: newConversation._id
                        }
                    },
                    $pull: {
                        sentRequests: {
                            userId: req.body.fromId
                        }
                    }
                })])
            session.endSession();
            res.send({
                success: true,
                receivedRequests: from.value.receivedRequests,
                friends: from.value.friends
            })
            req.app.io.to('room-' + req.body.fromId).to('room-' + req.body.toId).emit('updateFriends', newConversation._id);
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: "Internal Server Error!" })
        }
    },
    onCancelRequest: async (req, res) => {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            let [from, to] = await Promise.allSettled([
                User.findOneAndUpdate({ _id: req.body.fromId, 'friends.userId': { $ne: req.body.toId }, 'sentRequests.userId': req.body.toId, 'receivedRequests.userId': { $ne: req.body.toId } }, {
                    $pull: {
                        sentRequests: {
                            userId: req.body.toId
                        }
                    }
                }, { new: true }),
                User.findOneAndUpdate({ _id: req.body.toId, 'friends.userId': { $ne: req.body.fromId }, 'sentRequests.userId': { $ne: req.body.fromId }, 'receivedRequests.userId': req.body.fromId }, {
                    $pull: {
                        receivedRequests: {
                            userId: req.body.fromId
                        }
                    }
                })])
            session.endSession();
            res.send({
                success: true,
                sentRequests: from.value.sentRequests
            })
            req.app.io.to('room-' + req.body.fromId).to('room-' + req.body.toId).emit('updateRequests');
        } catch (error) {
            console.log("Cancel request: " + error);
            res.status(500).send({ success: false, error: "Internal Server Error!" })
        }
    },
    onRejectRequest: async (req, res) => {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            let [from, to] = await Promise.allSettled([
                User.findOneAndUpdate({ _id: req.body.fromId, 'friends.userId': { $ne: req.body.toId }, 'sentRequests.userId': { $ne: req.body.toId }, 'receivedRequests.userId': req.body.toId }, {
                    $pull: {
                        receivedRequests: {
                            userId: req.body.toId
                        }
                    }
                }, { new: true }),
                User.findOneAndUpdate({ _id: req.body.toId, 'friends.userId': { $ne: req.body.fromId }, 'sentRequests.userId': req.body.fromId, 'receivedRequests.userId': { $ne: req.body.fromId } }, {
                    $pull: {
                        sentRequests: {
                            userId: req.body.fromId
                        }
                    }
                })])
            res.send({
                success: true,
                receivedRequests: from.value.receivedRequests
            })
            req.app.io.to('room-' + req.body.fromId).to('room-' + req.body.toId).emit('updateRequests');
            session.endSession();
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: "Internal Server Error!" })
        }
    },
    onUnfriend: async (req, res) => {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            let [from, to] = await Promise.allSettled([
                User.findByIdAndUpdate(req.body.fromId, {
                    $pull: {
                        friends: {
                            userId: req.body.toId
                        }
                    },
                    $set: {
                        lastContact: {
                            contactType: null,
                            contactName: null,
                            contactId: null,
                            conversationId: null
                        }
                    }
                }, { new: true }),
                User.findByIdAndUpdate(req.body.toId, {
                    $pull: {
                        friends: {
                            userId: req.body.fromId
                        }
                    }
                }),
                Conversation.findByIdAndDelete(req.body.conversationId)
            ])
            req.app.io.to('room-' + req.body.conversationId).emit('unfriend', {
                fromId: req.body.fromId,
                toId: req.body.toId
            });
            if (fs.existsSync(path.resolve('server-src/conversations/' + req.body.conversationId))) {
                fs.rmdirSync(path.resolve('server-src/conversations/' + req.body.conversationId), { recursive: true });
            }
            res.send({ success: true, friends: from.value.friends })
            session.endSession();
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: "Internal Server Error!" })
        }
    },
    onGetFriendRequests: async (req, res) => {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            let user = await User.findById(req.session.userId);
            res.send({
                success: true,
                data: {
                    sentRequests: user.sentRequests,
                    receivedRequests: user.receivedRequests
                }
            })
            session.endSession();
        } catch (error) {
            console.log(error);
            res.send({ success: false, error: "Internal Server Error!" })
        }
    },
    onGetFriends: async (req, res) => {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            let user = await User.findById(req.session.userId);
            if (!user) {
                res.send({ success: false, error: "User doesn't exist!" })
            } else {
                res.send({ success: true, friends: user.friends })
            }
            session.endSession();
        } catch (error) {
            res.send({ success: false, error: error });
        }
    },
}
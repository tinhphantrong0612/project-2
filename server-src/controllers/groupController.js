const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');

module.exports = {
    onCreate: async (req, res) => {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            let date = Date.now();
            let newConversation = await Conversation.createConversation([{
                userId: req.body.fromId,
                username: req.body.from,
                joint: date
            }], req.body.from + ' create group ' + req.body.groupName);
            if (!fs.existsSync(path.resolve('server-src/conversations/' + newConversation._id))) {
                fs.mkdir(path.resolve('server-src/conversations/' + newConversation._id), (error) => {
                    if (error) {
                        console.log(error);
                        throw error;
                    }
                });
            }
            let user = await User.findOneAndUpdate({ _id: req.body.fromId }, {
                $push: {
                    groups: {
                        groupName: req.body.groupName,
                        conversationId: newConversation._id,
                        joint: date
                    }
                }
            });
            req.app.io.to('room-' + user._id).emit('joinConversation', newConversation._id);
            session.endSession();
            res.send({ success: true });
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: "Internal Service Error!" });
        }
    },
    onLeave: async (req, res) => {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            var date = Date.now();
            var informMessage = {
                messageType: 'inform',
                message: req.body.from + ' leaved',
                messageExt: '',
                sent: date,
                fromId: req.body.fromId,
                from: req.body.from
            }
            let [user, conversation] = await Promise.all([
                User.findByIdAndUpdate(req.body.fromId, {
                    $pull: {
                        groups: {
                            conversationId: req.body.conversationId
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
                }),
                Conversation.findByIdAndUpdate(req.body.conversationId, {
                    $push: {
                        messages: informMessage
                    }
                })
            ]);
            if (!conversation) {
                res.send({ success: true })
            } else if (conversation.users.length == 1) {
                if (fs.existsSync(path.resolve('server-src/conversations/' + conversation._id))) {
                    fs.rmdirSync(path.resolve('server-src/conversations/' + conversation._id), { recursive: true }, (error) => {
                        if (error) {
                            console.log(error);
                            throw error;
                        }
                    });
                }
                await Conversation.findByIdAndDelete(conversation._id);
            } else {
                await Conversation.findByIdAndUpdate(conversation._id, {
                    $pull: {
                        users: {
                            userId: req.body.fromId
                        }
                    }
                })
            }
            session.endSession();
            req.app.io.to('room-' + conversation._id).emit('groupMemberUpdate', {
                fromId: req.body.fromId,
                conversationId: req.body.conversationId,
                informMessage: informMessage,
                members: conversation.users
            });
            res.send({ success: true, conversationId: conversation._id });
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: "Internal Service Error!" });
        }
    },
    onAdd: async (req, res) => {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            var date = Date.now();
            var informMessage = {
                messageType: 'inform',
                message: req.body.from + ' add ' + req.body.to,
                messageExt: '',
                sent: date,
                fromId: req.body.fromId,
                from: req.body.from
            }
            let [user, conversation] = await Promise.all([
                User.findOneAndUpdate({ _id: req.body.toId, 'groups.conversationId': { $ne: req.body.conversationId } }, {
                    $push: {
                        groups: {
                            groupName: req.body.groupName,
                            conversationId: req.body.conversationId,
                            joint: date
                        }
                    }
                }),
                Conversation.findOneAndUpdate({ _id: req.body.conversationId, 'users.userId': { $ne: req.body.toId } }, {
                    $push: {
                        users: {
                            username: req.body.to,
                            userId: req.body.toId,
                            joint: date
                        },
                        messages: informMessage
                    }
                }, { new: true })
            ])
            req.app.io.to('room-' + req.body.conversationId).emit('groupMemberUpdate', {
                fromId: req.body.fromId,
                conversationId: req.body.conversationId,
                informMessage: informMessage,
                members: conversation.users
            })
            req.app.io.to('room-' + req.body.toId).emit('joinConversation', req.body.conversationId);
            res.send({ success: true, conversation });
            session.endSession();
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: "Internal Service Error!" });
        }
    },
    onGetGroups: async (req, res) => {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            let user = await User.findById(req.body.fromId);
            if (!user) {
                res.send({ success: false, error: "You weren't suppose to exist!" });
            } else {
                res.send({ success: true, groups: user.groups });
            }
            session.endSession();
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: "Internal Service Error!" });
        }
    }
}
const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');
var mongoose = require('mongoose');
module.exports = {
    onGetConversation: async (req, res) => {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            let [user, conversation] = await Promise.all([User.findById(req.body.userId), Conversation.findById(req.body.conversationId)])
            if (!conversation) {
                res.send({ success: false, error: "Conversation doesn't exist!" })
            } else {
                var userInConversation = -1;
                var inFriendsConversation = {};
                var inGroupsConversation = {};
                conversation.users.findIndex((user) => {
                    if (String(user.userId) == String(req.session.userId)) userInConversation = 1;
                });
                user.friends.findIndex((friend) => {
                    if (String(req.body.conversationId) == String(friend.conversationId)) inFriendsConversation = friend;
                })
                user.groups.findIndex((group) => {
                    if (String(req.body.conversationId) == String(group.conversationId)) inGroupsConversation = group;
                })
                if (userInConversation == -1) {
                    res.send({ success: false, error: "You are not in this conversation!" })
                } else {
                    if (inFriendsConversation.conversationId) {
                        user.lastContact = {
                            contactType: 'user',
                            contactName: inFriendsConversation.username,
                            contactId: inFriendsConversation.userId,
                            conversationId: inFriendsConversation.conversationId
                        }
                        await user.save();
                    }
                    if (inGroupsConversation.conversationId) {
                        user.lastContact = {
                            contactType: 'group',
                            contactName: inGroupsConversation.groupName,
                            contactId: inGroupsConversation.conversationId,
                            conversationId: inGroupsConversation.conversationId
                        }
                        await user.save();
                    }
                    res.send({ success: true, conversationData: conversation })
                }
            }
            session.endSession();
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: "Internal Server Error!" })
        }
    }
}
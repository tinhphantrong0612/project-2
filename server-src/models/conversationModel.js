const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ProjectII', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const conversationModel = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    users: [{
        _id: false,
        userId: mongoose.Types.ObjectId,
        username: String,
        joint: {
            type: Date,
            default: Date.now()
        }
    }],
    messages: [{
        messageType: String,
        message: String,
        messageExt: String,
        from: String,
        fromId: mongoose.Types.ObjectId,
        sent: {
            type: String,
            default: Date.now().toString()
        }
    }],
    seen: [{
        _id: false,
        userId: mongoose.Types.ObjectId,
        username: String,
        at: {
            type: Date,
            default: Date.now()
        }
    }],
    created: {
        type: Date,
        default: Date.now()
    }
}, { minimize: false })

conversationModel.statics = {
    createConversation: async function (users, inform) {
        try {
            let newConversation = new this({
                _id: new mongoose.Types.ObjectId,
                users: users,
                messages: [{
                    messageType: 'inform',
                    message: inform,
                    messageExt: '',
                    from: users[0].username,
                    fromId: users[0].userId,
                    sent: Date.now()
                }],
                seen: []
            })
            await newConversation.save();
            return newConversation;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = mongoose.model('Conversation', conversationModel);
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ProjectII', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
        maxLength: 14
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    email: {
        type: String,
        validate: {
            validator: (email) => {
                return /\S+@\S+\.\S+/.test(email);
            },
            message: function (props) {
                return `'${props.value}' isn't a valid email`;
            }
        }
    },
    socketId: String,
    status: String,
    lastContact: {
        contactType: String,
        contactName: String,
        contactId: mongoose.Types.ObjectId,
        conversationId: mongoose.Types.ObjectId
    },
    friends: [{
        _id: false,
        userId: mongoose.Types.ObjectId,
        username: String,
        conversationId: mongoose.Types.ObjectId,
        beFriended: {
            type: Date,
            default: Date.now()
        }
    }],
    groups: [{
        _id: false,
        groupName: String,
        conversationId: mongoose.Types.ObjectId,
        joint: {
            type: Date,
            default: Date.now()
        }
    }],
    sentRequests: [{
        _id: false,
        userId: mongoose.Types.ObjectId,
        username: String,
        sent: {
            type: Date,
            default: Date.now()
        }
    }],
    receivedRequests: [{
        _id: false,
        userId: mongoose.Types.ObjectId,
        username: String,
        received: {
            type: Date,
            default: Date.now()
        }
    }],
    created: {
        type: Date,
        default: Date.now()
    }
}, {minimize: false})

userSchema.statics = {
    checkUserExistByName: async function (username) {
        try {
            const user = await this.findOne({ username: username });
            if (!user) return false;
            else return true;
        } catch (err) {
            throw err;
        }
    },
    createUser: async function (data) {
        try {
            const newUser = new this({
                _id: new mongoose.Types.ObjectId,
                username: data.username,
                password: data.password,
                dateOfBirth: data.dateOfBirth,
                gender: data.gender,
                email: data.email,
                socketId: '',
                status: 'offline',
                lastContact: {
                    contactType: null,
                    contactName: null,
                    contactId: null,
                    conversationId: null
                },
                friends: [],
                groups: [],
                sentRequests: [],
                receivedRequests: []
            })
            await newUser.save();
            return newUser;
        } catch (err) {
            throw err;
        }
    },
    searchUserByName: async function (name) {
        try {
            let userList = this.find({ 'username': { $regex: name, $options: 'i'} });
            if (!userList) return [];
            else return userList;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = mongoose.model('User', userSchema);
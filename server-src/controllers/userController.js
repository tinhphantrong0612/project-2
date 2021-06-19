const mongoose = require('mongoose');
const User = require('../models/userModel')

module.exports = {
    onGetUserInfo: async (req, res) => {
        try {
            const user = await User.findById(req.session.userId);
            return res.send({ success: true, user });
        } catch (error) {
            return res.send({ success: false, error: error });
        }
    },
    onSearch: async (req, res) => {
        try {
            var result = [];
            const users = await User.searchUserByName(req.params['name']);
            users.forEach(user => {
                if (user._id != req.session.userId + '') {
                    result.push({
                        username: user.username,
                        userId: user._id,
                        status: user.status
                    })
                }
            })
            res.send({ success: true, result: result })
        } catch (error) {
            res.send({ success: false, error: error });
        }
    }
}
const User = require('../models/userModel');

module.exports = {
    onLogin: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user || user.password !== req.body.password) {
                res.send({
                    success: false,
                    error: "Your login information is wrong!"
                });
            } else if (user.status === 'online') {
                res.send({
                    success: false,
                    error: "Logged in elsewhere!"
                })
            }
            else {
                req.session.userId = user._id;
                res.send({
                    success: true,
                    userId: user._id
                });
            }
        } catch (err) {
            res.send({
                success: false,
                error: "Internal Server Error!"
            });
        }
    },
    onRegister: async (req, res) => {
        try {
            const isExist = await User.checkUserExistByName(req.body.username);
            if (isExist) {
                res.send({
                    success: false,
                    error: "Username existed!"
                });
            } else {
                await User.createUser(req.body);
                res.send({ success: true });
            }
        } catch (err) {
            console.log("Error: " + err.name);
            if (err.name === 'ValidationError') {
                res.send({
                    success: false,
                    error: "Invalid information"
                })
            } else res.send({
                success: false,
                error: "Internal Server Error!"
            });

        }
    },
    onLogout: async (req, res) => {
        delete req.session.userId
        res.send({
            success: true
        })
    }
}
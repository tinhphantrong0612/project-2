const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/authController')

authRouter.post('/login', authController.onLogin);
authRouter.post('/register', authController.onRegister);
authRouter.post('/logout', authController.onLogout);

module.exports = authRouter;
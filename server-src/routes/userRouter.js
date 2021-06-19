const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');

const authMiddleware = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');

userRouter.use(authMiddleware, errorMiddleware);

userRouter.get('/userInfo', userController.onGetUserInfo);
userRouter.get('/search/:name', userController.onSearch);

module.exports = userRouter;
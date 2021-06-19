const express = require('express');
const messageRouter = express.Router();

const messageController = require('../controllers/messageController');

const authMiddleware = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');

messageRouter.use(authMiddleware, errorMiddleware);

messageRouter.post('/', messageController.onGetConversation);

module.exports = messageRouter;
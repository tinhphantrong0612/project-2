const express = require('express');
const friendRouter = express.Router();

const friendController = require('../controllers/friendController');

const authMiddleware = require('../middlewares/authMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');

friendRouter.use(authMiddleware, validateMiddleware, errorMiddleware);

friendRouter.post('/send', friendController.onSendRequest);
friendRouter.post('/accept', friendController.onAcceptRequest);
friendRouter.post('/reject', friendController.onRejectRequest);
friendRouter.post('/cancel', friendController.onCancelRequest);
friendRouter.post('/unfriend', friendController.onUnfriend);
friendRouter.post('/getFriends', friendController.onGetFriends);
friendRouter.post('/friendRequests', friendController.onGetFriendRequests);

module.exports = friendRouter;
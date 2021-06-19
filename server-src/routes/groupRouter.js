const express = require('express');
const groupRouter = express.Router();

const groupController = require('../controllers/groupController');

const authMiddleware = require('../middlewares/authMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');

groupRouter.use(authMiddleware, validateMiddleware, errorMiddleware);

groupRouter.post('/create', groupController.onCreate);
groupRouter.post('/leave', groupController.onLeave);
groupRouter.post('/add', groupController.onAdd);
groupRouter.post('/getGroups', groupController.onGetGroups);

module.exports = groupRouter;
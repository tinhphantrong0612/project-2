const express = require('express');
const imageRouter = express.Router();
const path = require('path');
const fs = require('fs');
const config = require('../config/config')

imageRouter.get('/:conversationId/:id', (req, res) => {
    var accessPath = path.resolve(config.imageFolder, req.params['conversationId'], req.params['id']);
    fs.stat(accessPath, (err, stats) => {
        if(err) {
            res.sendStatus(404);
        } else {
            res.sendFile(accessPath);
        }
    })
})

module.exports = imageRouter;
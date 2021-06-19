const express = require('express');
const avatarRouter = express.Router();
const path = require('path');
const fs = require('fs');
const config = require('../config/config')

avatarRouter.get('/', (req, res) => {
    res.sendFile(path.resolve(config.avatarFolder, 'default.png'));
})
avatarRouter.get('/:name', (req, res) => {
    var accessPath = path.resolve(config.avatarFolder, req.params['name']);
    fs.stat(accessPath + '.png', (err, stats) => {
        if (err) {
            fs.stat(accessPath + '.jpg', (err, stats) => {
                if (err) {
                    fs.stat(accessPath + '.gif', (err, stats) => {
                        if (err) {
                            res.sendFile(path.resolve(config.avatarFolder, 'default.png'));
                        } else {
                            res.sendFile(accessPath + '.gif');
                        }
                    })
                }
                else {
                    res.sendFile(accessPath + '.jpg');
                }
            })
        } else {
            res.sendFile(accessPath + '.png');
        }
    })
})

module.exports = avatarRouter;
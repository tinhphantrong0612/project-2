const expressSession = require('express-session');
var MongoStore = require('connect-mongodb-session')(expressSession);
const config = require('../config/config');

var store = new MongoStore({
    uri: config.sessionUrl,
    collection: config.sessionCollection
});

var sessionMiddleware = expressSession({
    secret: config.secretKey,
    store: store,
    saveUninitialized: true,
    resave: true
})

sessionMiddleware.store = store;

module.exports = sessionMiddleware;

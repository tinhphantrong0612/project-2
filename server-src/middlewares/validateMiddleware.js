var validateMiddleware = (req, res, next) => {
    if (req.session.userId != req.body.fromId) {
        var err = new Error("Unauthorized request!");
        next(err);
    } else {
        next();
    }
}

module.exports = validateMiddleware;
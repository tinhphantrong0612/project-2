var authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
        var err = new Error("Unauthorized!");
        next(err);
    } else {
        next();
    }
}

module.exports = authMiddleware;

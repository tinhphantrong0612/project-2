var errorMiddleware = (err, req, res, next) => {
    res.send({success: false, err});
}

module.exports = errorMiddleware;
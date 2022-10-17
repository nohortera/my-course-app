const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error()
        }

        const token = req.headers.authorization.split(' ')[1]
        req.decodedData = jwt.verify(token, config.get('secretKey'))

        next()
    } catch (err) {
        return res.status(403).json({
            statusCode: 403,
            message: 'Forbidden resource',
            error: 'Forbidden'
        });
    }
}

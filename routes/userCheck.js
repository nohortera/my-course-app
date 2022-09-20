const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

const check = async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({
                statusCode: 403,
                message: 'Forbidden resource',
                error: 'Forbidden'
            });
        }

        const token = req.headers.authorization.split(' ')[1]
        const decodedData = await jwt.verify(token, config.get('secretKey'))
        const user = await User.findOne({ _id: decodedData.id })

        if (!user) {
            return res.status(401).json({ successful: false })
        }

        res.json({
            successful: true,
            result: {
                name: user.name,
                email: user.email,
                role: user.role,
                id: user._id
            }
        })
    } catch (e) {
        console.log(e)
        return res.status(500)
    }
}

module.exports = check
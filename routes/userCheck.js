const User = require('../models/User')


const check = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.decodedData.id })

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
        return res.status(500).json({ message: e.message })
    }
}

module.exports = check

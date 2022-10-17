const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const express = require('express')
const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body
        const candidate = await User.findOne({ email })

        if (candidate) {
            console.log(candidate)
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({ email, password: hashedPassword, name })
        await user.save()

        res.json({
            successful: true,
            result: 'User was created.'
        })
    } catch (e) {
        console.log(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                successful: false,
                result: 'Invalid data.'
            })
        }

        const check = bcrypt.compare(password, user.password)

        if (!check) {
            return res.status(400).json({
                successful: false,
                result: 'Invalid data.'
            })
        }

        const token = jwt.sign({ id: user.id, email: user.email }, config.get('secretKey'), { expiresIn: '1h' })

        res.json({
            successful: true,
            result: 'Bearer ' + token,
            user: {
                email: user.email,
                name: user.name
            }
        })
    } catch (e) {
        console.log(e)
    }
})

router.delete('/logout', require('../middleware/verification'), async (req, res) => {
    try {
        res.status(200)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router

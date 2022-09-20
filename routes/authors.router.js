const Router = require('express')
const router = new Router()
const Author = require('../models/Author')

router.get('/all', async (req, res) => {
    try {
        const result = await Author.find()

        if (!result || result.length < 1) {
            return res.status(400).json({ message: 'No authors found' })
        }

        const resultWithModifiedId = result.map(author => ({id: author._id, name: author.name}))

        res.json({
            successful: true,
            result: resultWithModifiedId
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'authors/all route error:' + e })
    }
})

router.post('/add', async (req, res) => {
    try {
        const { name } = req.body

        if (!name) {
            return res.status(500).json({ message: 'Name has no value' })
        }

        const candidate = await Author.findOne({ name })

        if (candidate) {
            return res.status(500).json({ message: 'Author already exists' })
        }

        const author = new Author({ name })
        await author.save()

        res.json({ message: 'Author created successfully' })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'authors/add route error:' + e })
    }
})

router.delete('/:id', async (req, res) => {
    try {

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'authors/add route error:' + e })
    }
})

module.exports = router
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
        return res.status(500).json({ message: 'authors/all route error:' + e.message })
    }
})

router.post('/add', require('../middleware/verification'), async (req, res) => {
    try {
        if (req.decodedData.role !== 'admin') {
            return res.status(403).json({
                statusCode: 403,
                message: 'Forbidden resource',
                error: 'Forbidden'
            })
        }

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
        return res.status(500).json({ message: 'authors/add route error:' + e.message })
    }
})

router.delete('/:id', require('../middleware/verification'), async (req, res) => {
    try {
        if (req.decodedData.role !== 'admin') {
            return res.status(403).json({
                statusCode: 403,
                message: 'Forbidden resource',
                error: 'Forbidden'
            })
        }

        const id = req.params.id

        const author = await Author.findById(id)
        if (!author) {
            return res.status(404).json({
                successful: false,
                result: `Object with id - ${id} was not found.`
            })
        }

        await Author.findByIdAndDelete(id)

        res.json({
            successful: true,
            result: `Object with id - ${id} was deleted.`
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'authors/add route error:' + e.message })
    }
})

module.exports = router

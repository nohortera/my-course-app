const Router = require('express')
const Course = require("../models/Course");
const router = new Router()

router.get('/all', async (req, res) => {
    try {
        const result = await Course.find()

        if (!result || result.length < 1) {
            return res.status(400).json({ message: 'No courses found' })
        }

        const resultWithModifiedId = result.map(course => ({
            id: course._id,
            title: course.title,
            description: course.description,
            creationDate: course.creationDate,
            duration: course.duration,
            authors: course.authors
        }))

        res.json({
            successful: true,
            result: resultWithModifiedId
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: '/courses/all error' + e })
    }
})

router.post('/add', async (req, res) => {
    try {
        const data = req.body

        if (!data || Object.keys(data).length !== 4) {
            return res.status(500).json({ message: 'Course is not defined' })
        }

        const course = new Course(data)
        await course.save()

        const resultWithModifiedId = {
            title: course.title,
            description: course.description,
            duration: course.duration,
            authors: course.authors,
            creationDate: course.creationDate,
            id: course._id
        }

        res.json({
            successful: true,
            result: resultWithModifiedId
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: '/courses/add error' + e })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id

        const course = Course.findOne({ _id: id })

        if (!course) {
            return res.status(404)
        }

        await Course.deleteOne({ _id: id })

        res.json({
            successful: true,
            message: `Object with id - ${id} was deleted.`
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: '/courses/all error' + e })
    }
})

module.exports = router
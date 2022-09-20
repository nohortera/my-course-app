const { Schema, model } = require('mongoose')

const setCreationDate = () => {
    return new Date(Date.now()).toLocaleDateString('en-GB')
}

const Course = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creationDate: { type: String, required: true, default: setCreationDate() },
    duration: { type: Number, required: true },
    authors: { type: [String], validate: {
        validator: (v) => {
            return v.length > 0
        },
            message: 'Add at least one author for the course'
        }}
}, { versionKey: false })

module.exports = model('Course', Course)
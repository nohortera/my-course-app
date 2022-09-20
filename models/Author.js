const { Schema, model } = require('mongoose')

const AuthorSchema = new Schema({
    name: { type: String, required: true }
}, { versionKey: false })

module.exports = model('Author', AuthorSchema)
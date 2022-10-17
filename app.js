const express = require('express')
const config = require('config')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const PORT = process.env.PORT || config.get('port') || 4000

const app = express()

app.use(cors())
app.use(express.json())

app.post('/login', (req, res) => {
    res.redirect(307,'/auth/login')
})
app.post('/register', (req, res) => {
    res.redirect(307,'/auth/register')
})

app.use('/auth', require('./routes/auth.router'))
app.use('/authors', require('./routes/authors.router'))
app.use('/courses', require('./routes/courses.router'))
app.get('/users/me', require('./middleware/verification'), require('./routes/userCheck'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const start = async () => {
    try {
        await mongoose.connect(config.get('databaseUrl'))
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`)
        })
    } catch (e) {
        console.log('Something went wrong', e)
    }
}

start()


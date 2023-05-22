require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')


//express app
const app = express()

//middleware
app.use(express.json({ limit: '16mb' }));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes registration
app.use('/api/posts', postRoutes)
app.use('/api/user', userRoutes)

//connection to the db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => console.log("App has been connected"));
    })
    .catch((error) => {
        console.log(error)
    })


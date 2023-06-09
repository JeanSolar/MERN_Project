const mongoose = require('mongoose')


const Schema = mongoose.Schema

const postSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    images: {
        type: String
    },
    user_id: {
        type: String,
        required: true
    },

}, { timestamps: true })


module.exports = mongoose.model('Post', postSchema)


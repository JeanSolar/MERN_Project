const Post = require("../models/workoutModel")
const mongoose = require('mongoose')


//get all posts 
const getPosts = async (req, res) => {

    const posts = await Post.find({}).sort({ createdAt: -1 })

    res.status(200).json(posts)

}


//get all user posts
const getUserPosts = async (req, res) => {

    const user_id = req.user._id

    const posts = await Post.find({ user_id }).sort({ createdAt: -1 })

    res.status(200).json(posts)

}

//get a single post
const getPost = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such post" })
    }

    const post = await Post.findById(id)

    if (!post) {
        return res.status(404).json({ error: "no such post" })
    }

    res.status(200).json(post)
}

//create a post
const createPost = async (req, res) => {

    const { title, summary, text, image } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!summary) {
        emptyFields.push('summary')
    }
    if (!text) {
        emptyFields.push('text')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    //adding the post doc to DB
    try {

        const user_id = req.user._id

        const post = await Post.create({ title, summary, text, image, user_id })


        res.status(200).json(post)

    } catch (error) {

        res.status(400).json({ error: error.message })

    }
}
//delete one
const deletePost = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such post" })
    }

    const post = await Post.findByIdAndDelete({ _id: id })

    if (!post) {
        return res.status(404).json({ error: "no such post" })
    }

    res.status(200).json(post)
}

//update one
const updatePost = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such post" })
    }

    const post = await Post.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!post) {
        return res.status(404).json({ error: "no such post" })
    }
    //if ok res 200
    res.status(200).json(post)
}

module.exports = {
    createPost,
    getUserPosts,
    getPosts,
    getPost,
    deletePost,
    updatePost
}
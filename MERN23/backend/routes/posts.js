const express = require('express')
const {
    createPost,
    getUserPosts,
    getPosts,
    getPost,
    deletePost,
    updatePost
} = require("../controllers/postControllers")
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()


//GET all posts 
router.get('/', getPosts)

//require auth for all routes below
router.use(requireAuth)

//GET all user posts
router.get('/profile', getUserPosts)

//GET a single post
router.get('/profile/:id', getPost)

//POST a new workout
router.post('/profile', createPost)

//DELETE a post
router.delete('/profile/:id', deletePost)

//UPDATE a post
router.patch('/profile/:id', updatePost)


module.exports = router
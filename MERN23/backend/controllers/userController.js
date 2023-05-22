const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (id) => {
    return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: '1h' })
}

//login user

const loginUser = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user.id)

        res.status(200).json({ email, token })

    } catch (error) {

        res.status(400).json({ error: error.message })

    }

    //res.json({ mssg: 'login user' })
}


//signup user

const signupUser = async (req, res) => {

    const { userName, email, password } = req.body

    try {
        const user = await User.signup(userName, email, password)

        //create a token
        const token = createToken(user.id)

        res.status(200).json({ email, token })

    } catch (error) {

        res.status(400).json({ error: error.message })

    }

}


module.exports = {
    loginUser,
    signupUser
}
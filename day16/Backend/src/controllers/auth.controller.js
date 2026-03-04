const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const blacklistModel = require("../models/blacklist.model")
const redis = require("../config/cache")





async function registerCotroller(req, res) {
    const { username, email, password } = req.body
    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: `${username === isUserAlreadyExists.username ? 'Username' : 'Email'} already exists`
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })
    const token = jwt.sign({
        id: user._id,
        username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })
    res.cookie("token", token)
    res.status(201).json({
        message: "User Registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


async function loginController(req, res) {
    const { username, email, password } = req.body
    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select("+password")
    if (!user) {
        return res.status(404).json({
            message: "User doesn't exists"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Password is invalid"
        })
    }
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)
    res.status(200).json({
        message: "User loggedIn successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


async function getMe(req,res) {
    const user=await userModel.findById(req.user.id)
    res.status(200).json({
        message:"User fetched successfully",
        user
    })
}

async function logOut(req,res) {
    const {token}=req.cookies
    res.clearCookie("token")
    await redis.set(token,Date.now().toString(),"EX",3600)
    res.status(200).json({
        message:"User logged out successfully"
    })
}


module.exports = {
    registerCotroller,
    loginController,
    getMe,
    logOut
}
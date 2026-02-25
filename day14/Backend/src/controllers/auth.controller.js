const userModel=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


async function registerController(req,res){
    const {username,email,password,bio}=req.body
    const isUserExists=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserExists){
        return res.status(409).json({
            message:(isUserExists.username==username)?"Username already exists":"Email id already exists"
        })
    }
    const hashPassword=await bcrypt.hash(password,10)
    const user=await userModel.create({
        username,
        email,
        password:hashPassword,
        bio
    })
    const token=jwt.sign({
        username:user.username,
        id:user._id
    },process.env.JWT_SECRET,{
        expiresIn:"1d"
    })
    res.cookie("token",token)
    res.status(201).json({
        message:"User registered successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImg:user.profileImg
        }
    })
}

async function loginController(req,res){
    const {username,email,password}=req.body
    const user=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    }).select("+password")
    if(!user){
        return res.status(404).json({
            message:"User not found please register first"
        })
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Password is incorrect"
        })
    }
    const token=jwt.sign({
        username:user.username,
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token",token)
    res.status(200).json({
        message:"User logged in successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImg:user.profileImg
        }
    })
}

module.exports={
    registerController,
    loginController
}
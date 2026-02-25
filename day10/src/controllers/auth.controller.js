const userModel=require("../models/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

async function registerController(req,res){
    const {username,email,password,bio,profileImage}=req.body
    const isUserExists=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserExists){
        return res.status(409).json({
            message:"User already exists as"+ (isUserExists.email==email?" Email is already used":" Username is already used")
        })
    }
    const hash=await bcrypt.hash(password,10)
    const user=await userModel.create({
        username,email,password:hash,bio,profileImage
    }
    )
    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token",token)
    res.status(200).json({
        message:"User registered Successfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage
        },
        token
    })
}


async function loginController(req,res){
    const {email,username,password}=req.body
    const user=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(401).json({
            message:"invalid Password"
        })
    }
    const token=jwt.sign({
        id: user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token",token)
    res.status(200).json({
        message:"User logged in successfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage
        },
        token
    })
}

module.exports={
    loginController,
    registerController
}
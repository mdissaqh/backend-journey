const express=require("express")
const usermodel=require("../models/user.models")
const { default: mongoose } = require("mongoose")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")
const authrouter=express.Router()
authrouter.post("/register",async (req,res)=>{
    const{name,email,password}=req.body
    const isuserexists=await usermodel.findOne({email})
    if(isuserexists){
        return res.status(409).json({
            message:"User already exists with this email."
        })
    }
    const hash=crypto.createHash("md5").update(password).digest("hex")
    const user=await usermodel.create({
        name,email,password:hash
    })
    const token=jwt.sign({
        id:user._id,
        email:user.email
    },
    process.env.JWT_SECRET)
    res.cookie("jwt_token",token)
    res.status(201).json({
        message:"User created successfully",
        user,token
    })
})
authrouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const isuserexists=await usermodel.findOne({email})
    const hash_password=crypto.createHash("md5").update(password).digest("hex")
    if(!isuserexists){
        return res.status(404).json({
            message:"User with this email doesn't exist"
        })
    }
    if(!(isuserexists.password==hash_password)){
        return res.status(401).json({
            message:"Password is incorrect!!"
        })
    }
    const token=jwt.sign({
        id:isuserexists._id,
        email:isuserexists.email
    },process.env.JWT_SECRET)
    res.cookie("jwt_token",token)
    res.status(200).json({
        message:"Logged in successfully",
        isuserexists,
        token
    })
})
module.exports=authrouter
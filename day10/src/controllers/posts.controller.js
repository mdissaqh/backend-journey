const postModel=require("../models/post.model")
const ImageKit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const { Folders } = require("@imagekit/nodejs/resources.js")
const jwt=require("jsonwebtoken")
const imagekit=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})
async function createPostController(req,res){
    console.log(req.body,req.file)
    const {caption}=req.body
    const {token}=req.cookies
    if(!token){
        return res.status(401).json({
            message:"User token not found in cookies"
        })
    }
    let decode
    try{
        decode=jwt.verify(token,process.env.JWT_SECRET)
    }catch{
        return res.status(401).json({
            message:"User not authorized"
        })
    }
    const file=await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"test",
        folder:"/Insta_posts"
    })
    const {url}=file
    const post=await postModel.create({
        caption,
        imgUrl:url,
        user:decode.id
    })
    res.status(201).json({
        message:"Post created successfully",
        post
    })
}

async function getPostController(req,res){
    const {token}=req.cookies
    if(!token){
        return res.status(401).json({
            message:"User token not found in cookies"
        })
    }
    let decode
    try{
        decode=jwt.verify(token,process.env.JWT_SECRET)
    }catch{
        return res.status(401).json({
            message:"User not authorized"
        })
    }
    const {id}=decode
    const post=await postModel.find({
        user:id
    })
    res.status(200).json({
        message:"Posts fetched successfully",
        post
    })
}
async function getSpecificPostController(req,res){
    const {token}=req.cookies
    if(!token){
        return res.status(401).json({
            "message":"User token not found in cookies"
        })
    }
    let decode
    try{
        decode=jwt.verify(token,process.env.JWT_SECRET)
    }catch{
        return res.status(401).json({
            message:"User not authorized"
        })
    }
    const {postId}=req.params
    const {id}=decode
    const post=await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message:"Particular Post doesn't exist"
        })
    }
    const isUserValid=post.user.toString()==id
    if(!isUserValid){
        return res.status(403).json({
            message:"Cannot access the post as it doesn't belong to this user"
        })
    }
    res.status(200).json({
        message:"Post fetched successfully",
        post
    })
}
module.exports={
    createPostController,
    getPostController,
    getSpecificPostController
}
const postModel=require("../models/post.model")
const ImageKit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const likeModel = require("../models/like.model")

const imagekit=new ImageKit({
    privateKey:process.env.IMAGEKIT_KEY
})



async function createPostController(req,res) {
    const {id}=req.user
    const {caption}=req.body
    const {buffer}=req.file
    const file=await imagekit.files.upload({
        file:await toFile(Buffer.from(buffer),"file"),
        fileName:"test",
        folder:"Insta_clone_day12"
    })
    const post=await postModel.create({
        caption,
        imgUrl:file.url,
        user:id
    })
    res.status(201).json({
        message:"Post created successfully",
        post
    })
}


async function getPostsController(req,res) {
    const {id}=req.user
    const posts=await postModel.find({
        user:id
    })
    res.status(200).json({
        message:"Posts fetched successfully",
        posts
    })
}

async function getPostController(req,res) {
    const {postId}=req.params
    const {id}=req.user
    const post=await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
    }
    const isPostBelongToUser=post.user.toString()==id
    if(!isPostBelongToUser){
        return res.status(403).json({
            message:"Post doesn't belong to this user"
        })
    }
    res.status(200).json({
        message:"Post fetched successfully",
        post
    })
}


async function postLikeController(req,res) {
    const {username}=req.user
    const post=req.params.postId
    const isPostExists=await postModel.findById(post)
    if(!isPostExists){
        return res.status(404).json({
            message:"Post doesn't exists"
        })
    }
    const likeData=await likeModel.create({
        post,
        user:username
    })
    res.status(200).json({
        message:"Post liked successfully",
        likeData
    })
}

module.exports={
    createPostController,
    getPostsController,
    getPostController,
    postLikeController
}
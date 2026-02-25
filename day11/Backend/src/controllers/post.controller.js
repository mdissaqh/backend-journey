const postModel=require("../models/post.model")
const ImageKit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")

const imagekit=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    const {id}=req.user
    const {caption}=req.body
    const file=await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer)),
        fileName:"test",
        folder:"Insta_posts_day11"
    })
    const post=await postModel.create({
        imgUrl:file.url,
        caption,
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
        message:"User posts fetched successfully",
        posts
    })
}

async function getSinglePostController(req,res) {
    const postId=req.params.postId
    const {id}=req.user
    const post=await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message:"Post not found in the database"
        })
    }
    const isPostBelongToUser=post.user.toString()===id
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

module.exports={
    createPostController,
    getPostsController,
    getSinglePostController
}
const express=require("express")
const postRouter=express.Router()
const postController=require("../controllers/post.controller")
const multer=require("multer")
const identifyUser=require("../middlewares/auth.middleware")


const upload=multer({storage:multer.memoryStorage()})

/**
 * @routes POST /api/post
 * @description Creates a new post by uploading an image to ImageKit and saving the post with caption and user Id.
 */
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)

/**
 * @routes GET /api/post
 * @description
 */
postRouter.get("/",identifyUser,postController.getPostsController)

/**
 * @routes GET /api/post/:postId
 * @description
 */
postRouter.get("/:postId",identifyUser,postController.getSinglePostController)

module.exports=postRouter
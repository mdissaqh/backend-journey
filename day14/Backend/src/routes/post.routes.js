const express=require("express")
const postRouter=express.Router()
const postController=require("../controllers/post.controller")
const multer=require("multer")
const identifyUser=require("../middlewares/auth.middleware")


const upload=multer({storage:multer.memoryStorage()})

/**
 * @routes POST /api/posts
 * @description Creates a new post by uploading an image to ImageKit and saving the post with caption and user Id.
 */
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)

/**
 * @routes GET /api/posts
 * @description
 */
postRouter.get("/",identifyUser,postController.getPostsController)

/**
 * @routes GET /api/posts/details/:postId
 * @description
 */
postRouter.get("/details/:postId",identifyUser,postController.getSinglePostController)


/**
 * @routes POST /api/posts/like/:postId
 */
postRouter.post("/like/:postId/",identifyUser,postController.likeController)



/**
 * @routes GET /api/posts/feed
 */
postRouter.get("/feed",identifyUser,postController.feedController)


module.exports=postRouter
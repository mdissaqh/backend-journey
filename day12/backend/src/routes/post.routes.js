const express=require("express")
const postController=require("../controllers/post.controller")
const verifyUserMiddleware=require("../middlewares/auth.middleware")
const multer=require("multer")



const postRouter=express.Router()
const upload=multer({storage:multer.memoryStorage()})


/**
 * @routes POST /api/posts
 */
postRouter.post("/",upload.single("image"),verifyUserMiddleware,postController.createPostController)

/**
 * @routes GET /api/posts
 */
postRouter.get("/",verifyUserMiddleware,postController.getPostsController)

/**
 * @routes GET /api/posts/:postId
 */
postRouter.get("/:postId",verifyUserMiddleware,postController.getPostController)

/**
 * @routes POST /api/posts/like/:postId
 */
postRouter.post("/like/:postId",verifyUserMiddleware,postController.postLikeController)


module.exports=postRouter
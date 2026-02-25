const express=require("express")
const postsController=require("../controllers/posts.controller")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})
const postRouter=express.Router()

postRouter.post("/",upload.single("image"),postsController.createPostController)

postRouter.get("/",postsController.getPostController)

postRouter.get("/:postId",postsController.getSpecificPostController)

module.exports=postRouter
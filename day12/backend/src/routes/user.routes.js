const express=require("express")
const userController=require("../controllers/user.controller")
const verifyUserMiddleware=require("../middlewares/auth.middleware")



const userRouter=express.Router()


/**
 * @routes POST /api/users/follow/:username
 */
userRouter.post("/follow/:username",verifyUserMiddleware,userController.followUserController)

/**
 * @routes POST /api/users/unfollow/:username
 */
userRouter.post("/unfollow/:username",verifyUserMiddleware,userController.unfollowUserController)





module.exports=userRouter
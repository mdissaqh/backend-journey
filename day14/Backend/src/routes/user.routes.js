const express=require("express")
const identifyUser=require("../middlewares/auth.middleware")
const userController=require("../controllers/user.controller")


const userRouter=express.Router()



/**
 * POST /api/users/follow/:username
 */
userRouter.post("/follow/:username",identifyUser,userController.followController)



/**
 * @routes POST /api/users/unfollow/:username
 */
userRouter.post("/unfollow/:username",identifyUser,userController.unfollowController)


module.exports=userRouter
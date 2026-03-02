const express=require("express")
const authController=require("../controllers/auth.controller")
const verifyUser = require("../middlewares/auth.middleware")


const authRouter=express.Router()


/**
 * @routes POST /api/auth/register
 */
authRouter.post("/register",authController.registerCotroller)

/**
 * @routes POST /api/auth.login
 */
authRouter.post("/login",authController.loginController)

/**
 * @routes GET /api/auth/get-me
 */
authRouter.get("/get-me",verifyUser,authController.getMe)

/**
 * @routes GET /api/auth/logout
 */
authRouter.get("/logout",authController.logOut)


module.exports=authRouter
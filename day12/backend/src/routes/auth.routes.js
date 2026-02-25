const express=require("express")
const authController=require("../controllers/auth.controller")


const authRouter=express.Router()


/**
 * @routes POST /api/auth/register
 */
authRouter.post("/register",authController.registerController)

/**
 * @routes POST /api/auth/login
 */
authRouter.post("/login",authController.loginController)



module.exports=authRouter
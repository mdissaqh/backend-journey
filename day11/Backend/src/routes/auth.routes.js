const userModel=require("../models/user.model")
const express=require("express")
const authController=require("../controllers/auth.controller")

const authRouter=express.Router()


/**
 * @routes POST /api/auth/register
 * @description Registers a new user, hashes the password, generates a JWT token, and stores it in a cookie.
 */
authRouter.post("/register",authController.registerController)

/**
 * @routes POST /api/auth/login
 * @description Authenticates a user by verifying username/email and password, then generates a JWT token and stores it in a cookie.
 */
authRouter.post("/login",authController.loginController)

module.exports=authRouter
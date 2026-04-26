import express from 'express'
import { loginController, registerController, getMeController } from '../controllers/auth.controller.js'
import { authenticateSeller, authenticateUser } from '../middlewares/auth.middleware.js'

export const authRouter=express.Router()

/**
 * @routes /api/auth/register
 */
authRouter.post("/register",registerController)

/**
 * @routes /api/auth/login
 */
authRouter.post("/login",loginController)


/**
 * @routes /api/auth/me
 */
authRouter.get("/me",authenticateUser,getMeController)
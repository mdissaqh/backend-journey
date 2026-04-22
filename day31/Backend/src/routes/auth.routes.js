import express from 'express'
import { loginController, registerController } from '../controllers/auth.controller.js'

export const authRouter=express.Router()

/**
 * @routes /api/auth/register
 */
authRouter.post("/register",registerController)

/**
 * @routes /api/auth/login
 */
authRouter.post("/login",loginController)
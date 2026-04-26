import jwt from "jsonwebtoken"
import { envConfig } from "../config/config.js"
import userModel from "../models/user.model.js"

export const authenticateSeller=async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return res.status(401).json({
            message:"Unauthorized! Please Register or Login first",
            success:false
        })
    }
    try{
        const decoded=jwt.verify(token,envConfig.JWT_SECRET)
        const user=await userModel.findById(decoded.userId)
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }
        if(user.role!=="seller"){
            return res.status(403).json({
                message:"Forbidden! You don't have permission to perform this action",
                success:false
            })
        }

        req.user=decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized! Invalid token",
            success:false
        })
    }
}

export const authenticateUser=async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return res.status(401).json({
            message:"Unauthorized! Please Register or Login first",
            success:false
        })
    }
    try{
        const decoded=jwt.verify(token,envConfig.JWT_SECRET)
        req.user=decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized! Invalid token",
            success:false
        })
    }
}
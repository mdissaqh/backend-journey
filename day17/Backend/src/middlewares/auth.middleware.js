const jwt=require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model")
const redis=require("../config/cache")


async function verifyUser(req,res,next) {
    const {token}=req.cookies
    if(!token){
        return res.status(401).json({
            message:"token not found"
        })
    }
    const isTokenBlacklisted=await redis.get(token)
    console.log(isTokenBlacklisted)
    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Invalid token.."
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        console.log(decoded)
        next()
    }catch{
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}

module.exports=verifyUser
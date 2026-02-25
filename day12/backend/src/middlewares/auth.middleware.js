const jwt=require("jsonwebtoken")


function verifyUser(req,res,next){
    const {token}=req.cookies
    if(!token){
        return res.status(404).json({
            message:"Token not found in cookies"
        })
    }
    let decode
    try{
        decode=jwt.verify(token,process.env.JWT_SECRET)
    }catch{
        return res.status(401).json({
            message:"User not authorized"
        })
    }
    req.user=decode
    next()
}

module.exports=verifyUser
import userModel from "../models/user.model.js"



export async function registerController(req,res){
    const {email,mobile_no,fullname,role,password}=req.body
    const isUserExists=await userModel.findOne({
        $or:[
            {email},
            {mobile_no}
        ]
    })
    if(isUserExists){
        return res.status(409).json({
            message:"User with this email or mobile number already exists",
            success:false
        })
    }
    const newUser=await userModel.create({
        email,mobile_no,fullname,role,password
    })
    const userObject=newUser.toObject()
    delete userObject.password
    res.status(201).json({
        message:"User registered successfully",
        success:true,
        user:userObject
    })
}


export async function loginController(req,res) {
    const {email,mobile_no,password}=req.body
    const user=await userModel.findOne({
        $or:[
            {email},
            {mobile_no}
        ]
    }).select("+password")
    if(!user){
        return res.status(404).json({
            message:"Account doesn't Exist.Please register first",
            success:false
        })
    }
    const isPasswordValid=await user.comparePassword(password)
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password",
            success:false
        })
    }
    const userObj=user.toObject()
    delete userObj.password
    res.status(200).json({
        message:"Logged in! successfully",
        sucess:true,
        user:userObj
    })
}
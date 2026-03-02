const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username should be unique"],
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        unique:[true,"Username should be unique"],
        required:[true,"Username is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        select:false
    }
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel
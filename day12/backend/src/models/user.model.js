const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username should be unique"],
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        unique:[true,"Email should be unique"],
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    bio:String,
    profileImg:{
        type:String,
        default:"https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp"
    }
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel
const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    imgUrl:{
        type:String,
        required:[true,"Image url is required"]
    },
    caption:{
        type:String,
        default:""
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"User id is required"]
    }
})

const postModel=mongoose.model("posts",postSchema)

module.exports=postModel
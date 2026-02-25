const mongoose=require("mongoose")


const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true,"Image URL is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        requied:[true,"User id is required"]
    }
})

const postModel=mongoose.model("Posts",postSchema)

module.exports=postModel
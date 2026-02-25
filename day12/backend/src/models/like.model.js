const mongoose=require("mongoose")


const likeSchema=new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        require:[true,"Post Id is required for liking the post"]
    },
    user:{
        type:String,
        required:[true,"Username is required for liking the post"]
    }
},{
    timestamps:true
})
likeSchema.index({post:1,user:1},{unique:true})
const likeModel=mongoose.model("likes",likeSchema)

module.exports=likeModel
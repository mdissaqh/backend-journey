import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true,
        enum:["INR","USD","EUR"]
    }
},{
    _id:false,
    _v:false
})

export default priceSchema;
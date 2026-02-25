const mongoose=require("mongoose")
const { type } = require("node:os")
const userschema= new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"User already exists with this email"]
    },
    password:String
})
const usermodel=mongoose.model("Users",userschema)
module.exports=usermodel
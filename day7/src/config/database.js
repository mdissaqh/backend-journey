const mongoose=require("mongoose")
const connect=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database connected")
    })
}
module.exports=connect
const mongoose=require("mongoose")
const connecttodb=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database is connected")
    })
}
module.exports = connecttodb
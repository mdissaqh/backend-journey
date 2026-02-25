require("dotenv").config()

const app=require("./src/app")
const mongoose=require("mongoose")
const db= ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database connected")
    })
}
db()
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
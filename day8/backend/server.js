const app=require("./src/app")
require("dotenv").config()
const connecttodb=require("./src/config/database")
connecttodb()
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
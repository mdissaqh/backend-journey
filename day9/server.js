const app=require("./src/app")
const connecttodb=require("./src/config/database")
require("dotenv").config()
connecttodb()
app.listen(3000,()=>{
    console.log("Server is running in port 3000")
})
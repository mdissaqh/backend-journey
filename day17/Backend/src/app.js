const express=require("express")
const cookieParser=require("cookie-parser")
const authRouter = require("./routes/auth.routes")
const cors=require("cors")
const songRouter = require("./routes/song.routes")




const app=express()

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'

}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/songs",songRouter)


module.exports=app
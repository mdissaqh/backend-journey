const express=require("express")
const cookieParser=require("cookie-parser")
const authRoutes=require("./routes/auth.routes")
const postRouter=require("./routes/post.routes")
const userRouter=require("./routes/user.routes")
const cors=require("cors")




const app=express()
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173",
    methods:["GET","POST","DELETE","PUT"]
}))

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/posts",postRouter)
app.use("/api/users",userRouter)



module.exports=app
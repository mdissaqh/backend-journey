import express from "express"
import { authRouter } from "./routes/auth.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import productRouter from "./routes/product.routes.js"

const app=express()


app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use("/api/auth",authRouter)
app.use("/api/product",productRouter)

export default app
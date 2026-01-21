const express=require("express")
const app=express()
app.get("/",(req,res)=>{
    res.send("My first programmed server")
})
app.get("/home",(req,res)=>{
    res.send("Welcome to home page")
})
app.get("/about",(req,res)=>{
    res.send("Welcome to about page")
})
app.listen(3000)
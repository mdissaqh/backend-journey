const express=require("express")
const notemodel=require("./models/notes.models")
const app=express()
app.use(express.json())
app.post("/notes",async (req,res)=>{
    const {title,description}=req.body
    const note=await notemodel.create({
        title,description
    })
    res.status(201).json({
        message:"Note created successfully",note
    })
})
module.exports=app
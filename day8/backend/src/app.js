const express=require("express")
const cors=require("cors")
const noteModel=require("./models/note.models")
const app=express()
app.use(express.json())
app.use(cors())
app.post("/api/notes",async (req,res)=>{
    const {title,description} = req.body
    await noteModel.create({
        title,description
    })
    res.status(201).json({
        "message":"note created successfully"
    })
})
app.get("/api/notes",async(req,res)=>{
    const notes=await noteModel.find()
    res.status(200).json({
        message:"Notes fetched successfully",
        notes
    })
})
app.delete("/api/notes/:id",async (req,res)=>{
    const id=req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"Note deleted Successfully"
    })
})
app.patch("/api/notes/:id",async (req,res)=>{
    const id=req.params.id
    const {description}=req.body
    await noteModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:"Description updated Successfully"
    })
})
module.exports = app
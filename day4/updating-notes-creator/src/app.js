const express=require("express")
const app=express()
app.use(express.json())
const notes=[]
app.post("/notes",(req,res)=>{
    notes.push(req.body)
    res.send("Notes created")
})
app.get("/notes",(req,res)=>{
    res.send(notes)
})
app.delete("/notes/:idx",(req,res)=>{
    delete notes[req.params.idx]
    res.send("Note deleted")
})
app.patch("/notes/:idx",(req,res)=>{
    notes[req.params.idx].description=req.body.description
    res.send("Description updated")
})
app.put("/notes/:idx",(req,res)=>{
    notes[req.params.idx]=req.body
    res.send("Updated notes completely")
})
module.exports=app
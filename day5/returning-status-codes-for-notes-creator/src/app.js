const express=require("express")
const app=express()
app.use(express.json())
const notes=[]
app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    res.status(201).json(
        {
            "message" :"Successful"
        }
    )
})
app.get("/notes",(req,res)=>{
    res.status(200).json(
        notes
    )
})
app.delete("/notes/:idx",(req,res)=>{
    console.log(req.params.idx)
    delete notes[req.params.idx]
    res.status(204).json()
})
app.patch("/notes/:idx",(req,res)=>{
    console.log(req.params.idx)
    notes[req.params.idx].title=req.body.title
    res.status(200).json({
        "message":"Successful"
    })
})
module.exports=app
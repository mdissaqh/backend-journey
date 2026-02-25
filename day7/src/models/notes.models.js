const mongoose=require("mongoose")
const notesschema=new mongoose.Schema({
    title:String,
    description:String
})
const notemodel=mongoose.model("notes",notesschema)
module.exports=notemodel
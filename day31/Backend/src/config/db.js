import mongoose from "mongoose"
import { envConfig } from "./config.js"


export function connectToDb(){
    mongoose.connect(envConfig.MONGO_URI)
    .then(()=>{
        console.log("✅Conneted to database")
    })
    .catch(()=>{
        console.log("❌Not connected do database Because of some errors")
    })
}


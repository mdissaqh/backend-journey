import { Server } from "socket.io";

let io

export function initsocket(httpServer){
    io=new Server(httpServer,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true
        }
    })
    console.log("Socket.io server is live")
    io.on("connection",(socket)=>{
        console.log("User connected with id:",socket.id)
    })
}

export function getIO(){
    if(!io){
        throw new Error("Socket.io is not initialized")
    }
    return io
}
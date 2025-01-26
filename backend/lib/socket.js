import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app)

const io = new Server(server , {
    cors: ["https://chat-frame.vercel.app"]
})

export function getReceiverSocketId(userId){
    return onlineUserMap[userId];
}

const onlineUserMap = {};

io.on("connection", (socket) =>{

    const userId = socket.handshake.query.userId;
    if(userId) onlineUserMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(onlineUserMap))

    socket.on("disconnect", ()=>{
        delete onlineUserMap[userId];
        io.emit("getOnlineUsers", Object.keys(onlineUserMap));
    })
})

export { io, server, app}
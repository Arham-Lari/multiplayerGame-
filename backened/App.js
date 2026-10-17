import { Socket } from "dgram";
import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express();
const server = http.createServer(app);
const io =new Server(server,{pingInterval: 2000 , pingTimeout: 5000});

const PORT = 8000;

app.use(express.static('../public'));

app.get('/',(_,res)=>{
    res.sendFile(__dirname+"/index.html");
})

io.on("connect",(Socket)=>{
    console.log("some body is connected ",Socket.id);
})

server.listen(PORT,()=>{
  console.log("the server is listing on Port : ",PORT);
})

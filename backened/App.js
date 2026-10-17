import { constants } from "buffer";
import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express();
const server = http.createServer(app);
const io =new Server(server,{pingInterval: 2000 , pingTimeout: 5000});

const PORT = 8000;

const bPlayer = {};

app.use(express.static('../public'));

app.get('/',(_,res)=>{
    res.sendFile(__dirname+"/index.html");
})

io.on("connect",(socket)=>{
    bPlayer[socket.id] = {
        x: Math.random() * 600,
        y: Math.random() * 500,
        radius : 40,
        color : "orange"
    }

    io.emit('updatePlayer',(bPlayer));


    socket.on('disconnect',()=>{
        delete bPlayer[socket.id];
    })
})

server.listen(PORT,()=>{
  console.log("the server is listing on Port : ",PORT);
})

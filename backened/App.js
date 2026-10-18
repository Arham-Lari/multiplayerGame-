import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express();
const server = http.createServer(app);
const io =new Server(server,{pingInterval: 2000 , pingTimeout: 5000});

const PORT = 8000;

const bPlayer = {};
const bProjectile = {};
let projectileId = 0;

app.use(express.static('../public'));

app.get('/',(_,res)=>{
    res.sendFile(__dirname+"/index.html");
})

io.on("connect",(socket)=>{
    bPlayer[socket.id] = {
        x: Math.random() * 600,
        y: Math.random() * 500,
        radius : 20,
        color : `hsl(${Math.random() * 360},100%,50%)`,
        squence : 0,
    }

    socket.on("init",({w,h})=>{
      bPlayer[socket.id] = {...bPlayer[socket.id],w,h};
    })


    socket.on('move',({keycode,squence})=>{
        const SPEED = 10;
        switch(keycode){
            case "keyS":{
                bPlayer[socket.id].y += SPEED;
                bPlayer[socket.id].squence = squence;
                break;
            }
            
            case "keyW":{
                bPlayer[socket.id].y -= SPEED;
                bPlayer[socket.id].squence = squence;
                break;
            }


            case "keyA":{
                bPlayer[socket.id].x -= SPEED;
                bPlayer[socket.id].squence = squence;
                break;
            }

            case "keyD":{
                bPlayer[socket.id].x += SPEED;
                bPlayer[socket.id].squence = squence;
                break;
            }
        }

    })

    socket.on("fire",({x,y,angle}) =>{
        projectileId ++;

        const velocity = {
            x : Math.cos(angle)*5,
            y : Math.sin(angle)*5,
        }

        bProjectile[projectileId] = {
            px:x,
            py:y,
            velocity,
            color : bPlayer[socket.id].color,
            player : socket.id,
        }
    })

    socket.on('disconnect',()=>{
        delete bPlayer[socket.id];
    })
})

setInterval(()=>{

    for(const id in bProjectile){
        bProjectile[id].px += bProjectile[id].velocity.x;
        bProjectile[id].py += bProjectile[id].velocity.y;


        if(bProjectile[id].px - 5 <=0 || bProjectile[id].px + 5 >= bPlayer[bProjectile[id].player].w ||
         bProjectile[id].py -5 <= 0 || bProjectile[id].py + 5 >= bPlayer[bProjectile
            [id].player].hj) {
            
            delete bProjectile[id];
        }
    }
    io.emit('updateProjectile',(bProjectile)); 

    io.emit('updatePlayer',(bPlayer));
},15);

server.listen(PORT,()=>{
  console.log("the server is listing on Port : ",PORT);
})

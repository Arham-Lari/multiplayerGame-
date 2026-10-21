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

app.use(express.static('../frontened'));

app.get('/',(_,res)=>{
    res.sendFile(__dirname+"/index.html");
})

io.on("connect",(socket)=>{
    bPlayer[socket.id] = {
        x: Math.random() * 1250,
        y: Math.random() * 600,
        radius : 20,
        color : `hsl(${Math.random() * 360 },100%,50%)`,
        squence : 0,
        score : 0,
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

    const radius  = 5;
    for(const pid in bProjectile){
        bProjectile[pid].px += bProjectile[pid].velocity.x;
        bProjectile[pid].py += bProjectile[pid].velocity.y;


        if(bProjectile[pid].px - radius <=0 || bProjectile[pid].px + radius >= bPlayer[bProjectile[pid].player]?.w ||bProjectile[pid].py -radius <= 0 || bProjectile[pid].py + radius >= bPlayer[bProjectile[pid].player]?.h) {

            delete bProjectile[pid];
            continue;
        }

        for(const id in bPlayer){

            const distance = Math.hypot((bProjectile[pid].px - bPlayer[id].x),(bProjectile[pid].py - bPlayer[id].y));

            if(distance <= radius+bPlayer[id].radius && bProjectile[pid].player != id){
                bPlayer[bProjectile[pid].player].score++;

                delete bPlayer[id];
                delete bProjectile[pid];

                break;
            }

        }
    }
    io.emit('updateProjectile',(bProjectile)); 

    io.emit('updatePlayer',(bPlayer));
    
},15);

server.listen(PORT,()=>{
    console.log("the server is listing on Port : ",PORT);
})

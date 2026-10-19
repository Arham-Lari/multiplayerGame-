const playerInputs = [];
let squenceNumber = 0;

const keyPressed ={
    w : {
        isPressed : false,
    },
    s : {
        isPressed : false,
    },
    d : {
        isPressed : false,
    },
    a: {
        isPressed : false,
    }
}

window.addEventListener("keydown",(e)=>{
    switch(e.code){

        case 'KeyS':{
            keyPressed.s.isPressed = true;
            console.log('key is presse')
            break;
        }
        case 'KeyD':{
            keyPressed.d.isPressed = true;
            break;
        }
        case 'KeyW':{
            keyPressed.w.isPressed = true;
            break;
        }
        case 'KeyA':{
            keyPressed.a.isPressed = true;
            break;
        }
    }
})


addEventListener("keyup",(e)=>{
    switch(e.code){
        case 'KeyS':{
            keyPressed.s.isPressed = false;
            break;
        }
        case 'KeyD':{
            keyPressed.d.isPressed = false;
            break;
        }
        case 'KeyW':{
            keyPressed.w.isPressed = false;
            break;
        }
        case 'KeyA':{
            keyPressed.a.isPressed = false;
            break;
        }
    }
})

setInterval(()=>{

    const SPEED = 10;

    if(keyPressed.a.isPressed){
        squenceNumber++;
        FrontenedPlayer[socket.id].posX -= SPEED;
        playerInputs.push({squenceNumber, dx: -SPEED , dy: 0});
        socket.emit("move",{keycode:"keyA",squenceNumber});
    }

    if(keyPressed.d.isPressed){
        squenceNumber++;
        FrontenedPlayer[socket.id].posX += SPEED;
        playerInputs.push({squenceNumber, dx: SPEED , dy: 0});
        socket.emit("move",{keycode:"keyD",squenceNumber});
    }

    if(keyPressed.s.isPressed){
        squenceNumber++;
        FrontenedPlayer[socket.id].posY += SPEED;
        playerInputs.push({squenceNumber, dx:0, dy: -SPEED});
        socket.emit("move",{keycode:"keyS" , squenceNumber});
    }

    if(keyPressed.w.isPressed){
        squenceNumber++;
        FrontenedPlayer[socket.id].posY -= SPEED;
        playerInputs.push({squenceNumber, dx: 0 , dy: -SPEED});
        socket.emit("move",{keycode: "keyW",squenceNumber});
    }

},15)

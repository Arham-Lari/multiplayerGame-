const playerInputs = {};

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

addEventListener("keydown",(e)=>{
    switch(e.code){
        case 'keyS':{
            keyPressed.s.isPressed = true;
            break;
        }
        case 'keyD':{
            keyPressed.d.isPressed = true;
            break;
        }
        case 'keyW':{
            keyPressed.w.isPressed = true;
            break;
        }
        case 'keyA':{
            keyPressed.a.isPressed = true;
            break;
        }
    }
})


addEventListener("keyup",(e)=>{
    switch(e.code){
        case 'keyS':{
            keyPressed.s.isPressed = false;
            break;
        }
        case 'keyD':{
            keyPressed.d.isPressed = false;
            break;
        }
        case 'keyW':{
            keyPressed.w.isPressed = false;
            break;
        }
        case 'keyA':{
            keyPressed.a.isPressed = false;
            break;
        }
    }
})

setInterval(()=>{

    const SPEED = 10;
    let squenceNumber = 0;

    if(keyPressed.a.isPressed){
        squenceNumber++;
        FrontenedPlayer[socket.id].posY += SPEED;
        playerInputs.push({squenceNumber, dx: -SPEED , dy: 0});
        socket.emit("move",{keycode:"keyA",squenceNumber});
    }

    if(keyPressed.d.isPressed){
        squenceNumber++;
        FrontenedPlayer[socket.id].posX += SPEED;
        playerInputs.push({squenceNumber, dx: SPEED , dy: 0});
        socket.emit("move",{keycode:"KeyD",squenceNumber});
    }

    if(keyPressed.s.isPressed){
        squenceNumber++;
        FrontenedPlayer[socket.id].posY -= SPEED;
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

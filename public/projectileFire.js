const forntenedProjectile = {};

window.addEventListener("click",(e)=>{
    
    const x = FrontenedPlayer[socket.id].posX;
    const y = FrontenedPlayer[socket.id].posY;

    const angle = Math.atan2(e.clientY - y, e.clientX - x);

    socket.emit("fire",{x,y,angle})
    
})


const forntenedProjectile = {};

window.addEventListener("click",(e)=>{
    
    const angle = Math.atan2(e.clientY - FrontenedPlayer[socket.id].posY, e.clientX - FrontenedPlayer[socket.id].posX);

    socket.emit("fire",{angle,socket: socket.id})
    
})

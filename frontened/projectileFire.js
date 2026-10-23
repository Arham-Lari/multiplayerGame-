
window.addEventListener("click",(e)=>{
    
    if(!FrontenedPlayer[socket.id]) return;

    const x = FrontenedPlayer[socket.id].posX;
    const y = FrontenedPlayer[socket.id].posY;

    const angle = Math.atan2(e.clientY - y, e.clientX - x);

    socket.emit("fire",{x,y,angle})
    
})


window.addEventListener("click",(e)=>{
    
    if(!FrontenedPlayer[socket.id]) return;

    const x = FrontenedPlayer[socket.id].posX;
    const y = FrontenedPlayer[socket.id].posY;

    const canvasPosition = canvas.getBoundingClientRect();

    const angle = Math.atan2((e.clientY - (canvasPosition.top)) - y, (e.clientX - (canvasPosition.left)) - x);

    socket.emit("fire",{x,y,angle})
    
})

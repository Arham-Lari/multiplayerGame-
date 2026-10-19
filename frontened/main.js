const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//selecting the div class which holds the player label
const playerLabel = document.querySelector("#player-label");

canvas.height = innerHeight;
canvas.width = innerWidth;

const socket = io();

const FrontenedPlayer ={};

socket.on("connect",()=>{
    socket.emit("init",{w:canvas.width,h:canvas.height})
})

socket.on("updatePlayer",(bacckenedPlayer)=>{

    for(id in bacckenedPlayer){

        if(!FrontenedPlayer[id]){

            //adding the new player to forntened player list
            FrontenedPlayer[id] = new Player({
                position:{
                    x:bacckenedPlayer[id].x,
                    y:bacckenedPlayer[id].y,
                },
                radius: bacckenedPlayer[id].radius,
                color: bacckenedPlayer[id].color,
                squence :bacckenedPlayer[id].squence,
            })

            playerLabel.innerHTML += `<div id="${id}">${id}:0</div>`
        }
        else{
            if(id == socket.id){
                FrontenedPlayer[id].x = bacckenedPlayer[id].x;
                FrontenedPlayer[id].y = bacckenedPlayer[id].y;

                const backenedLastIndex = playerInputs.findIndex((input)=>{
                    return input.squence == bacckenedPlayer[id].squence;
                })

                if(backenedLastIndex != -1) {
                    playerInputs.splice(0,backenedLastIndex+1);
                }
                playerInputs.forEach(input => {
                    FrontenedPlayer[id].x += input.dx;
                    FrontenedPlayer[id].y += input.dy;

                });
            }else{
                gsap.to(FrontenedPlayer[id],{
                    posX: bacckenedPlayer[id].x,
                    posY: bacckenedPlayer[id].y,
                    duration:0.015,
                    ease: "linear",
                })
            }
        }

        for(id in FrontenedPlayer){
            if(!bacckenedPlayer[id]){
                
                //selcting the div i have to remove
                const removediv = document.querySelector(`div[id="${id}"]`);
                removediv.parentElement.removeChild(removediv);

                //removing the player
                delete FrontenedPlayer[id];
            }
        }
    }
})


socket.on('updateProjectile',(backenedPro) =>{
    for(const id in backenedPro){
        if(!forntenedProjectile[id]){

            forntenedProjectile[id] = new Projectile({
                px : backenedPro[id].px,
                py : backenedPro[id].py,
                radius : 5,
                color : backenedPro[id].color,
            })
            
        }

        else{
            
            forntenedProjectile[id].px += backenedPro[id].velocity.x;
            forntenedProjectile[id].py += backenedPro[id].velocity.y;
        }
    }
    
    for(const id in forntenedProjectile){
        if(!backenedPro[id]){
            delete forntenedProjectile
            [id];
        }
    }
})


function anime(){

    requestAnimationFrame(anime);

    ctx.fillStyle = "rgba(0,0,0,0.5)"
    ctx.fillRect(0,0,canvas.width,canvas.height);



    for(id in FrontenedPlayer){
        FrontenedPlayer[id].draw();
    }

    for(const id in forntenedProjectile){
        forntenedProjectile[id].draw();
    }
}

anime();

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.height = innerHeight;
canvas.width = innerWidth;

const socket = io();

const FrontenedPlayer ={};

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
                delete FrontenedPlayer[id];
            }
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

}

anime();

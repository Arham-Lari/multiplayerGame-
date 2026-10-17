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

                playerInputs.splice(0,backenedLastIndex);

                playerInputs.forEach(input => {
                   FrontenedPlayer[id].x += input.dx;
                   FrontenedPlayer[id].y += input.dy;
                });
            }else{
                FrontenedPlayer[id].x = bacckenedPlayer[id].x;
                FrontenedPlayer[id].y = bacckenedPlayer[id].y;
            }
        }

        for(id in FrontenedPlayer){
            if(!bacckenedPlayer[id]){
                delete FrontenedPlayer[id];
            }
        }
    }
})

console.log(FrontenedPlayer)


function anime(){

    requestAnimationFrame(anime);

    for(id in FrontenedPlayer){
        FrontenedPlayer[id].draw();
    }

}

anime();

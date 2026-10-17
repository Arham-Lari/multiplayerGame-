const canvas = document.querySelector("canvas");
const pixelRatio = devicePixelRatio || 1;
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
            })
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

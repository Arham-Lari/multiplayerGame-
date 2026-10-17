const canvas = document.querySelector("canvas");
canvas.height = innerHeight;
canvas.width = innerWidth;

const ctx = canvas.getContext("2d");

const socket = io();

const FrontenedPlayer ={};

socket.on("updatePlayer",(bacckenedPlayer)=>{
    for(id in bacckenedPlayer){
        if(!FrontenedPlayer[id]){
            FrontenedPlayer[id] = new Player({
                position:{
                    x:bacckenedPlayer[id].x,
                    y:bacckenedPlayer[id].y,
                },
                radius: bacckenedPlayer[id].radius,
                color: bacckenedPlayer[id].color,
            })
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

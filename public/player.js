class Player{
    constructor({
        position={
            x:0,
            y:0,
        },
        radius,
        colour,
    }){
        this.colour = colour;
        this.posX = position.x;
        this.posY = position.y;
        this.radius = radius;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.posX,this.posY,this.radius,0,Math.PI *2,false);
        ctx.fill();
        ctx.fillStyle = this.colour;
        ctx.closePath();
    }
}

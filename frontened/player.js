class Player{
    constructor({
        position={
            x:0,
            y:0,
        },
        radius= 30,
        color= "green",
    }){
        this.color = color;
        this.posX = position.x;
        this.posY = position.y;
        this.radius = radius;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.posX,this.posY,this.radius,0,Math.PI *2,false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

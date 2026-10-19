class Projectile{
    constructor({px,py,velocity = 0,radius,color}){
        this.px = px;
        this.py = py;
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.px,this.py,this.radius,0,Math.PI *2,false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(){
        this.draw();
        this.px += this.velocity.x;
        this.py += this.velocity.y;
    }
}

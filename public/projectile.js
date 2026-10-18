class Projectile{
    constructor(px,py,vx,vy,radius,color){
        this.px = px;
        this.py = py;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.color = color;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.px,this.py,this.radius,0,Math.PI,false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(){
        this.draw();
        this.px += this.vx;
        this.py += this.vy;
    }
}

import { context } from "./canvas";
import { Vector } from "./vector";

export class Caprot{
    constructor(x,y,mass){
        this.pos = new Vector(x,y)
        this.vel = Vector.random2D()
        this.vel.setMag(5)
    }

    update(){
        this.pos.add(this.vel)
    }

    draw(){
        let tip = new Vector(0,20)
        tip.setHeading(0)
        tip.setHeading(this.vel.heading())
        context.strokeStyle = "yellow"
        context.lineWidth = 7
        context.moveTo(this.pos.x, this.pos.y)
        context.lineTo(this.pos.x + tip.x, this.pos.y + tip.y)
        context.stroke()
    }
}
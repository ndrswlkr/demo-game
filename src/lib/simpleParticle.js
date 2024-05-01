import { canvas, context } from "./canvas";
import { random } from "./mathlib";
import { Vector } from "./vector";

export class SimpleParticle{
    constructor(){
        this.pos = new Vector(random(canvas.width), random(canvas.height))
        this.vel = Vector.random2D()
        this.acc = new Vector(0,0)

    }

    update(){
        this.vel.add(this.acc)
        this.vel.limit(2)
        this.pos.add(this.vel)
       // console.log(this.vel)
        this.acc.set(0,0)
    }
    addForce(force){
        this.acc.add(force)
    }
    checkField(field){
        let force = field.getFlowVector(this.pos.x, this.pos.y).clone()
       // console.log(force)
        force.setMag(.1)
        this.addForce(force)
    }
    edges(){
        if (this.pos.x > canvas.width) this.pos.x = 0
        if (this.pos.x < 0) this.pos.x = canvas.width
        if (this.pos.y > canvas.height) this.pos.y = 0
        if (this.pos.y < 0) this.pos.y = canvas.height
    }
    draw(){
        context.fillStyle="#f6008a0f"
        context.fillRect(this.pos.x, this.pos.y, 1, 1)
        context.fill
    }

}
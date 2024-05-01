import { context } from "./canvas";
import { Particle } from "./particle";
import { Vector } from "./vector";
import { random } from "./mathlib";
export class Fire extends Particle{
    constructor(x,y){
        x += random(15)
        y += random(15)
        super(x,y)
        this.lifetime = 255 + random(300)
        this.image = new Image()
        this.vel = Vector.random2D()
        this.vel.setMag(random(.001, .3))
        this.image.src = "/demo-game/texture.png"
        this.size = 15
        this.gravity = new Vector(0, 0.01)
    }

    draw(){
        context.save()
        context.globalAlpha = this.lifetime / 255

        context.drawImage(this.image, this.pos.x, this.pos.y, this.size, this.size)
        context.restore()
    }

}
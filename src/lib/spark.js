import { random } from "./mathlib";
import { Particle } from "./particle";
import { Vector } from "./vector";

export class Spark extends Particle{
    constructor(x,y){
        super(x,y)
        this.vel.y = -random(0,7)
        this.color = { r: 255, g: 255, b: 0}
        this.gravity = new Vector(0,0)
        this.r = random(1,4)
        this.lifetime = random(300,900)
    }
}
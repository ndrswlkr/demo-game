import { Boid } from "./boid";

export class Target extends Boid{
    constructor(x,y){
        super(x,y)
        this.maxSpeed = 3
        this.maxForce = 0.35
        this.color = "green"
    }
}
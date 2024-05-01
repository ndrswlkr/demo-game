import { Vector } from "./vector"
import { noise } from "./perlin-noise"
import { constrain } from "./mathlib"

export class Flowfield{
    constructor(width, height, scl){
        this.width = width
        this.height = height
        this.scl = scl
        this.rows = Math.floor(height / scl)
        this.cols = Math.floor(width / scl)
        this.xoff = 0
        this.yoff = 0
        this.inc = 0.1
        this.field = []
    }

    makeFlowField(zoff){
        this.yoff = 0
        for (let y = 0; y < this.rows; y += 1) {
            this.field[y] = []
            this.xoff = 0
            for (let x = 0; x < this.cols; x += 1) {
                let angle = new Vector(this.scl, 0)
                angle.setHeading(Math.PI * 2 * noise(this.xoff, this.yoff, zoff) )
                //angle.add(base)
                this.field[y][x] = angle
                this.xoff += this.inc
            }
            this.yoff += this.inc
          }
          //this.zoff += this.inc
    }
    getFlowVector(x,y){
        let xindex = Math.floor(x / this.scl)
        let yindex = Math.floor(y / this.scl)
        xindex = constrain(xindex, 0, this.cols -1)
        yindex = constrain(yindex, 0, this.rows -1 )
    
        return this.field[yindex][xindex]
    }
}
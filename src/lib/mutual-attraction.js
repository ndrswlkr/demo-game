import { Player } from './player'
import { Vector } from './vector'
import { mousePressed, mouseX, mouseY } from './mouse'
import { canvas, context } from './canvas'
import {random} from './mathlib'

export class MutualAttraction {
  constructor () {
    this.run=false
    this.width = canvas.width
    this.height = canvas.height
    this.movers = []
    let offset = new Vector(this.width / 2, this.height / 2)
    for(let i = 0; i < 300; i++){
        let v = Vector.random2D()
        v.setMag(100 + random(50))
        v.add(offset)
        let x = v.x
        let y = v.y
        this.movers.push(new Player(x,y, 5))
    }
  }

  update () {
    this.movers.forEach(mover=>{
        for( let other of this.movers){
            if (mover !== other){
                mover.attract(other)
            }
        }
        mover.update()
        //mover.edges()
    })
    
}

draw () {
    this.background('#066a')
   /*  context.fillStyle = 'magenta'
    context.beginPath()
    context.roundRect(120,120,120,220,15)
    context.fill()
    context.closePath() */
    this.movers.forEach(mover=>{
        mover.draw()
    })
  }

  background(color = "#000"){
    context.fillStyle = color
    context.beginPath()
    context.fillRect(0, 0, this.width, this.height)
    context.fill()
    context.closePath()
  
  }
  animate () {
    this.update()
    this.draw()
    if ( this.run ) requestAnimationFrame(() => this.animate())
  }
}

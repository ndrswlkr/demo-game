import { Player } from './lib/player'
import { Vector } from './lib/vector'
import { mousePressed, mouseX, mouseY } from './lib/mouse'
import { canvas, context } from './lib/canvas'
import {lerp, map, random} from './lib/mathlib'
import { onMount, onCleanup } from 'solid-js'
import { Vehicle } from './lib/vehicle'
 
class Game {
  constructor () {
    this.run=false
    this.width = canvas.width
    this.height = canvas.height
    this.sun = new Player(this.width / 2, this.height / 2, 30)
    this.movers = []
    this.angleI = 0
    let offset = new Vector(this.width / 2, this.height / 2)
    for(let i = 0; i < Math.PI * 2; i+= 1){
        let v = Vector.random2D()
        v.setMag(100)
        v.setHeading(i)
        v.add(offset)
        let x = v.x
        let y = v.y
        this.movers.push(new Vehicle(x,y, 25))
    }

    this.moon = new Player(200, 200, 100)
    
    console.log("before", this.moon)
    console.log(2*Math.PI)
    console.log("heading before", this.moon.pos.heading())
    this.moon.pos.setHeading(0)
    console.log(this.moon.pos.heading())
  }

  
  update () {
    this.movers.forEach(mover=>{
        this.sun.attract(mover)
        for( let other of this.movers){
            if (mover !== other){
                mover.detract(other)
            }
        }
        mover.update()
        //mover.edges()
        let angle = lerp(this.angleI, 0, 2* Math.PI)
        this.moon.pos.setHeading(angle)
        this.angleI += .0001

    })
    
}

draw () {
    context.reset()
    this.background('#e00a')
    this.movers.forEach(mover=>{
        mover.draw()
    })
    this.sun.draw()
    /* let sec = new Date(Date.now()).getSeconds()
    let angle = map(sec, 0, 60, 0, 2* Math.PI)
    this.sun.pos.setMag(150)
    this.sun.pos.setHeading(angle)
    let center = new Vector(this.width / 2, this.height / 2)
    this.sun.pos.add(center)
     */
    this.moon.draw()
/*     context.translate(canvas.width / 2, canvas.height/2)
   context.rotate(angle)
    context.fillStyle = 'magenta'
    context.beginPath()
    context.roundRect(0,0,120,220,15)
    context.stroke()
    context.closePath() 
 */  
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

let anglesAndRadians

 function AngleAndRadians() {
    onMount(() => {
        anglesAndRadians = new Game()
        anglesAndRadians.run = true
        anglesAndRadians.animate()
      })
      onCleanup(() => {
        anglesAndRadians.run = false
        anglesAndRadians = ''
      })
    return (
        <div></div>
    );
}
    export default AngleAndRadians;

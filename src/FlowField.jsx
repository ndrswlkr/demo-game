import { Vector } from './lib/vector'
import { mousePressed, mouseX, mouseY } from './lib/mouse'
import { canvas, context, center, background, point } from './lib/canvas'
import { floatRange, gcdmemo, lerp, map, random } from './lib/mathlib'
import { onMount, onCleanup } from 'solid-js'
import { noise, noiseDetail } from './lib/perlin-noise'
import { Flowfield } from './lib/flow-field'
import { SimpleParticle } from './lib/simpleParticle'

class Game {
  constructor () {
    this.run = false
    this.width = canvas.width
    this.height = canvas.height
    background('#000')
    this.xoff = 0
    this.yoff = 0
    this.inc = 0.1
    this.done = false
    this.zoff = 0
    //noiseDetail(26, 0.6)
    let scl = gcdmemo(this.width, this.height)
    console.log(scl)
    this.flowField = new Flowfield(this.width, this.height, 35)
    this.zoff=0
    this.flowField.makeFlowField(this.zoff)
    this.lastTime = 0
    this.particles = []

    for (let i = 0; i < 100; i++) {
      this.particles.push(new SimpleParticle())
    }
  }

  update () {
    if (mousePressed) {
      console.log(this.flowField.getFlowVector(mouseX, mouseY))
    }
    if(Date.now() > this.lastTime + 1000){
        this.lastTime = Date.now()
        this.zoff += .1
        this.flowField.makeFlowField(this.zoff)
    }
    this.particles.forEach(particle => {
        particle.update()
        particle.edges()
        particle.checkField(this.flowField)
    })
    for (let y = this.yoff; y < canvas.height + this.yoff; y += 1) {
      for (let x = this.xoff; x < canvas.width + this.xoff; x += 1) {}
    }
  }

  draw () {
    //context.reset()
    //background('#000')
    
    this.particles.forEach(particle => {
      particle.draw()
    })
    /* for (let y = 0; y < this.flowField.rows; y += 1) {
      for (let x = 0; x < this.flowField.cols; x += 1) {
        context.beginPath()
        context.strokeStyle = '#FFFFFF05'
        let base = new Vector(x * this.flowField.scl, y * this.flowField.scl)
        let angle = this.flowField.field[y][x].clone()
        //console.log(angle)
        angle.add(base)
          context.moveTo(x*this.flowField.scl, y * this.flowField.scl)
            context.lineTo(angle.x, angle.y)

            context.stroke() 
        }
    } 
    */
    
    //this.x += 0.01
    // point(noise(this.x)*this.width, center.y,33, "white")
  }

  animate () {
    this.update()
    this.draw()
    if (this.run) requestAnimationFrame(() => this.animate())
  }
}

let game

function FlowField () {
  onMount(() => {
    game = new Game()
    game.run = true
    game.animate()
  })
  onCleanup(() => {
    game.run = false
    game = ''
  })
  return <div></div>
}
export default FlowField

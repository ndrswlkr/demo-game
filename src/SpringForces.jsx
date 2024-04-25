import { Player } from './lib/player'
import { Vector } from './lib/vector'
import { mousePressed, mouseX, mouseY } from './lib/mouse'
import { canvas, context, center, background, point } from './lib/canvas'
import { floatRange, lerp, map, random } from './lib/mathlib'
import { onMount, onCleanup } from 'solid-js'
import { Vehicle } from './lib/vehicle'
import { Caprot } from './lib/caprot'
import { Wave } from './lib/wave'

class Game {
  constructor () {
    this.run = false
    this.width = canvas.width
    this.height = canvas.height
    this.lockMouse = false

    this.restLength = 100
    this.k = 0.08
    this.velocity = new Vector(0,0)
    this.gravity = new Vector(0, 4)
    this.anchor = new Vector(center.x, center.y /3)
    this.bob = new Vector(center.x, center.y * .8)
  }

  update () {
    if (mousePressed ) {
      //this.lockMouse = true
      this.bob.x = mouseX
      this.bob.y = mouseY
      this.velocity.set(0,0)
    }
    let force =  Vector.sub(this.bob, this.anchor)
    let x = force.mag() - this.restLength
    force.normalize()
    force.mult(-1 * this.k * x)
    this.velocity.add(force)
    this.velocity.add(this.gravity)
    this.bob.add( this.velocity)

    this.velocity.mult(.94)

  }

  draw () {
    //context.reset()
    background('#0a0')
    context.fillStyle = "#010"
    context.beginPath()
    context.arc(this.anchor.x, this.anchor.y, 25, 0, Math.PI * 2)
    context.arc(this.bob.x, this.bob.y, 25, 0, Math.PI * 2)
    context.fill()
    context.strokeStyle = "#010"
    context.beginPath()
    context.moveTo(this.anchor.x, this.anchor.y)
    context.lineTo(this.bob.x, this.bob.y)
    context.stroke()
   
  }

  animate () {
    this.update()
    this.draw()
    if (this.run) requestAnimationFrame(() => this.animate())
  }
}

let game

function SpringForces () {
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
export default SpringForces

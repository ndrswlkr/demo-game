import { Player } from './lib/player'
import { Vector } from './lib/vector'
import { mousePressed, mouseX, mouseY } from './lib/mouse'
import { canvas, context, center, background, point } from './lib/canvas'
import { lerp, map, random } from './lib/mathlib'
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
    this.y = 590
    this.restLength = 300
    this.k = 0.1
    this.velocity = 0

  }

  update () {
    if (mousePressed && this.lockMouse === false) {
      this.lockMouse = true
      this.y = 590
      setTimeout(() => (this.lockMouse = false), 300)
    }
  }

  draw () {
    //context.reset()
    background('#0a0')
    context.fillStyle = "#010"
    context.beginPath()
    context.arc(center.x, this.y, 25, 0, Math.PI * 2)
    context.fill()
   
    let x = this.y - this.restLength
    let force = -this.k * x
    this.velocity += force
    this.y  += this.velocity

    this.velocity *= .94

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

import { Player } from './lib/player'
import { Vector } from './lib/vector'
import { mousePressed, mouseX, mouseY } from './lib/mouse'
import { canvas, context, center, background, point } from './lib/canvas'
import { floatRange, lerp, map, random } from './lib/mathlib'
import { onMount, onCleanup } from 'solid-js'
import { Particles } from './lib/particle-system'

class Game {
  constructor () {
    this.run = false
    this.width = canvas.width
    this.height = canvas.height
    this.particleSystem = new Particles(center.x, center.y)
  }



  update () {
    if (mousePressed) {
        this.particleSystem.addParticles(mouseX, mouseY)
    }
    this.particleSystem.update()
  }

  draw () {
    //context.reset()
    background('#000')
    this.particleSystem.draw()
  }

  animate () {
    this.update()
    this.draw()
    if (this.run) requestAnimationFrame(() => this.animate())
  }
}

let game

function ParticleSystem () {
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
export default ParticleSystem

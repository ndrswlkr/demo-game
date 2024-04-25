import { Player } from './lib/player'
import { Vector } from './lib/vector'
import { mousePressed, mouseX, mouseY } from './lib/mouse'
import { canvas, context, center, background, point } from './lib/canvas'
import { floatRange, lerp, map, random } from './lib/mathlib'
import { onMount, onCleanup } from 'solid-js'
import { Particle } from './lib/particle'

class Game {
  constructor () {
    this.run = false
    this.width = canvas.width
    this.height = canvas.height
    this.particles = []
    for (let i = 0; i < 10; i++) {
      this.addParticle()
    }
    this.gravity = new Vector(0, 0.5)
  }

  addParticle (x = center.x, y=center.y) {
    this.particles.push(new Particle(x,y))
  }

  update () {
    if (mousePressed) {
        this.addParticle(mouseX, mouseY)
    }
    this.particles.forEach(particle => {
      particle.applyForce(this.gravity)
      particle.update()
      particle.edges()
      if (particle.finished) {
        this.particles = this.particles.filter(p => p !== particle)
      }
    })
  }

  draw () {
    //context.reset()
    background('#000')
    this.particles.forEach(particle => {
      particle.draw()
    })
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

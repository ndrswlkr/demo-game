import { Player } from './lib/player'
import { Vector, scalarProjection } from './lib/vector'
import { mousePressed, mouseX, mouseY } from './lib/mouse'
import { canvas, context, center, background, point } from './lib/canvas'
import { floatRange, lerp, map, random } from './lib/mathlib'
import { onMount, onCleanup } from 'solid-js'
import { Boid } from './lib/boid'
import { Path } from './lib/path'



class Game {
  constructor () {
    this.run = false
    this.width = canvas.width
    this.height = canvas.height
    this.boid = new Boid(random(this.width), random(this.height))
    this.path = new Path(0, center.y, this.width, center.y)

  }



  update () {
    let force = this.boid.follow(this.path)
    this.boid.applyForce(force)
    this.boid.update()
    
}
  
  draw () {
    //context.reset()
    background('#000')
    this.boid.draw()
    context.beginPath()
    this.path.draw()
  
  }

  animate () {
    this.update()
    this.draw()
    if (this.run) requestAnimationFrame(() => this.animate())
  }
}

let game

function PathFollowing () {
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
export default PathFollowing

import { Player } from './lib/player'
import { Vector } from './lib/vector'
import { mousePressed, mouseX, mouseY } from './lib/mouse'
import { canvas, context, center, background, point } from './lib/canvas'
import { floatRange, lerp, map, random } from './lib/mathlib'
import { onMount, onCleanup } from 'solid-js'
import { Boid } from './lib/boid'
import { Target } from './lib/target'

class Game {
  constructor () {
    this.run = false
    this.width = canvas.width
    this.height = canvas.height
    this.target = new Target(center.x + random(center.x), center.y + random(center.y))
    this.target.showPath = true
    this.enemy = new Vector(center.x + random(center.x), center.y + random(center.y))
    this.boid = new Boid(160,160)
    this.boid.showPath = true
  }



  update () {
    console.log(this.target.pos.dist(this.boid.pos))
      if(this.target.pos.dist(this.boid.pos) < 80){
          let fleeForce = this.target.flee(this.boid.pos)
          //console.log("fleeing")
          this.target.applyForce(fleeForce)}
          else{
              //console.log("wandering")
              this.target.wander()
            }
    let force = this.boid.arrive(this.target.pos)
    this.boid.applyForce(force)
    this.boid.update()
    this.target.update()
    
    if(this.boid.pos.dist(this.target.pos) < (this.boid.size + this.target.size * 1.4)){
        //console.log(Math.abs(this.boid.pos.dist(this.target.pos)))
        this.target.pos.x = random(0, this.width)
        this.target.pos.y = random(0, this.height)
        console.log("yes")
    }
    if (mousePressed) {
        
    }
    this.target.edges()
    
}

  draw () {
    //context.reset()
    background('#000')
    this.target.draw()
    point(this.enemy.x, this.enemy.y, 16, "red")
    this.boid.draw()
  }

  animate () {
    this.update()
    this.draw()
    if (this.run) requestAnimationFrame(() => this.animate())
  }
}

let game

function Steering () {
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
export default Steering

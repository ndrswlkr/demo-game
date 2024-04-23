import { Player } from './lib/player'
import { Vector } from './lib/vector'
import { mousePressed, mouseX, mouseY } from './lib/mouse'
import { canvas, context, center } from './lib/canvas'
import { lerp, map, random } from './lib/mathlib'
import { onMount, onCleanup } from 'solid-js'
import { Vehicle } from './lib/vehicle'
import { Caprot } from './lib/caprot'

class Game {
  constructor () {
    this.run = false
    this.width = canvas.width
    this.height = canvas.height
    this.caprot = new Caprot(200, 300)
    this.max = 0
    this.angleMax = 0
    this.spiralR = 190
  }

  update () {
    this.caprot.update()
    let distV = Vector.sub(center, this.caprot.pos)
    let dist = distV.mag()
    if (dist > 500) {
      this.caprot.pos.set(center.x, center.y)
      this.caprot.vel = Vector.random2D()
      this.caprot.vel.setMag(4)
    }
  }
  draw () {
    //context.reset()
    this.background('#00000005')
    this.caprot.draw()
    context.strokeStyle = 'magenta'
    context.lineWidth = 4
    context.beginPath()
    context.arc(center.x, center.y, 100, 0, 2 * Math.PI, true)
    context.stroke()
    context.closePath()
    this.dotsOnCircle()
    this.angleMax+= .09
    this.spiralR -= .19
    if(this.spiralR <= 100) this.spiralR = 190
    let circle = new Vector(200,0)
   
      let x = Math.cos(this.angleMax) * this.spiralR
      let y = Math.sin(this.angleMax) * this.spiralR
      this.dot(center.x + x, center.y + y)

      context.beginPath()
      context.strokeStyle = "lightgreen"
      context.lineWidth = 1
      circle.setHeading(0)
      context.moveTo(center.x + circle.x, center.y + circle.y)
    for(let a = 0; a < 2*Math.PI; a+=.001){
      circle.setHeading(a)
      context.lineTo(center.x + circle.x, center.y + circle.y)

    }
    context.closePath()
    context.stroke()
    
  }

  dotsOnCircle(){
    if(this.max < Math.PI*2) this.max += .1
    if(this.max >= Math.PI*2) this.max =0

    let v = new Vector( 100,  0)
    for (let i = 0; i < this.max; i+= 2*Math.PI / 12){
      v.setHeading(i)
      this.dot(center.x + v.x, center.y + v.y)
    }
  }
  dot(x, y){
    context.fillStyle="yellow"
    context.beginPath()
    context.arc(x, y, 4, 0, Math.PI * 2, true)
    context.fill()
    context.closePath()
  }

  background (color = '#000') {
    context.fillStyle = color
    context.beginPath()
    context.fillRect(0, 0, this.width, this.height)
    context.fill()
    context.closePath()
  }
  animate () {
    this.update()
    this.draw()
    if (this.run) requestAnimationFrame(() => this.animate())
  }
}

let game

function Drawing () {
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
export default Drawing

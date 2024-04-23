import { Player } from './player'
import { Vector } from './vector'
import { mousePressed, mouseX, mouseY } from './mouse'
import { canvas, context } from './canvas'
import { Attractor } from './attractor'
export class Game {
  constructor () {
    this.run = false
    this.width = canvas.width
    this.height = canvas.height
    this.players = []
    this.attractor = new Attractor(canvas.width / 2, canvas.height / 3.5, 18)
    this.actor = new Player(canvas.width * 0.3, canvas.height * 0.3, 3)
    for (let i = 0; i < 20; i++) {
      this.players.push(
        new Player(Math.random() * canvas.width, 40, 12 + Math.random() * 15)
      )
    }
  }

  update () {
    let gravity = new Vector(0, 0.09)
    let wind = new Vector(0.09, 0)

    this.actor.update()
    this.attractor.attract(this.actor)
    this.players.forEach((player, i) => {
      player.applyForce(Vector.mult(gravity, player.mass))
      if (mousePressed) {
        console.log('wind')
        player.applyForce(wind)
      }
      //player.friction()
      if (player.pos.y > canvas.height * .55) {
        player.drag()
      }
      player.update()
      player.edges()
      if (i>10) this.attractor.attract(player)
    })
  }

  draw () {
    context.fillStyle = "#00000004"
    context.beginPath()
    context.fillRect(0, 0, this.width, this.height)
    context.fill()
    context.closePath()
    context.fillStyle = '#00a1'
    context.beginPath()
    context.fillRect(0, this.height * 0.55, this.width, this.height)
    context.fill()
    context.closePath()
    
    this.attractor.draw()
    this.actor.draw()

    this.players.forEach(player => {
      player.draw()
    })
  }

  animate () {
    this.update()
    this.draw()
    if (this.run) requestAnimationFrame(() => this.animate())
  }
}

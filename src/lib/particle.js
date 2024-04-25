import { Vector } from './vector'
import { mouseX, mouseY } from './mouse'
import { context, canvas, star } from './canvas'
import { constrain } from './mathlib'

export class Particle {
  constructor (x, y) {
    this.pos = new Vector(x, y)
    this.vel = Vector.random2D()
    this.vel.setMag(3)
    this.acc = new Vector(0, 0)
    this.r = 9
    this.lifetime = 255
    this.finished = false
    this.bounce = -0.7
  }
  contact () {
    let diff = canvas.height - (this.pos.y + this.r)
    if (diff < 1) {
      return true
    }
    return false
  }
  edges () {
    if (this.pos.y >= canvas.height - this.r) {
      this.pos.y = canvas.height - this.r
      this.vel.y *= this.bounce
    }

    if (this.pos.x <= 0 + this.r) {
      this.pos.x = this.r
      this.vel.x *= this.bounce
    }
    if (this.pos.x >= canvas.width - this.r) {
      this.pos.x = canvas.width - this.r
      this.vel.x *= this.bounce
    }
  }
  friction () {
    if (this.contact()) {
      let friction = Vector.normalize(this.vel)
      friction.mult(-1)
      let mu = 0.01
      let normal = this.mass
      friction.setMag(mu * normal)
      this.applyForce(friction)
    }
  }

  drag () {
    let drag = Vector.normalize(this.vel)
    drag.mult(-1)
    let c = 2
    let speed = this.vel.mag()
    drag.setMag(c * speed * speed)
    this.applyForce(drag)
  }
  attract (actor) {
    let force = Vector.sub(this.pos, actor.pos)
    let distance = force.mag()
    let distanceSqr = distance * distance
    distanceSqr = constrain(distanceSqr, 100, 1000)
    let G = 1
    let strength = (G * (this.mass * actor.mass)) / distanceSqr
    force.setMag(strength)
    actor.applyForce(force)
  }
  applyForce (force) {
    let f = Vector.div(force, 1)
    this.acc.add(f)
  }

  update () {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.set(0, 0)
    this.lifetime -= 5
    if (this.lifetime <= 0) this.finished = true
  }

  draw () {
/*     context.beginPath()
    context.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI, true)
    context.fillStyle = `rgba(255,255,0, ${this.lifetime / 255})`
    context.fill()
    context.closePath() */
    let color = `rgba(255,105,0, ${this.lifetime / 255})`
    star(this.pos.x, this.pos.y, this.r, color)
  }
}

import { Vector } from './vector'
import { mouseX, mouseY } from './mouse'
import { context, canvas } from './canvas'
import { constrain } from './mathlib'

export class Player {
  constructor (x, y, mass) {
    this.pos = new Vector(x, y)
   
    this.r = Math.sqrt(mass) * 1.2
    this.mass = mass
    this.vel = Vector.random2D()
    this.vel.setMag(Math.random() * .01 + .01)
    this.acc = new Vector(0, 0)
  }

  edges () {
    if (this.pos.y >= canvas.height - this.r) {
      this.pos.y = canvas.height - this.r
      this.vel.y *= -1
    }
   
    if (this.pos.x <= 0 + this.r) {
      this.pos.x = this.r
      this.vel.x *= -1
    }
    if (this.pos.x >= canvas.width - this.r) {
      this.pos.x = canvas.width - this.r
      this.vel.x *= -1
    }
  }
  contact () {
    let diff = canvas.height - (this.pos.y + this.r)
    if (diff < 1) {
      return true
    }
    return false
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
  attract(actor){
    let force = Vector.sub(this.pos, actor.pos)
    let distance = force.mag()
    let distanceSqr = distance * distance
    distanceSqr = constrain(distanceSqr, 100, 1000)
    let G = 1
    let strength = G * (this.mass * actor.mass) / distanceSqr
    force.setMag(strength)
    actor.applyForce(force)
  }
  applyForce (force) {
    let f = Vector.div(force, this.mass)
    this.acc.add(f)
  }

  update () {
    this.vel.add(this.acc)
   // this.vel.limit(25)
    this.pos.add(this.vel)
    this.acc.set(0,0)
  }

  draw () {
    //context.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    context.beginPath()
    context.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI, true)
    if (this.contact()) {
      context.fillStyle = '#f005'
    } else {
      context.fillStyle = '#0f05'
    }
    context.fill()
    context.closePath()
  }
}

import { Vector } from './vector'
import { Particle } from './particle'
import { Spark } from './spark'
import { random } from './mathlib'
import { Fire } from './fire'

export class Particles {
  constructor (x, y) {
    this.pos = new Vector(x, y)
    this.lastFire = 0
    this.particles = []
    for (let i = 0; i < 10; i++) {
      this.addParticles()
    }
  }

  addParticles (x = this.pos.x, y=this.pos.y) {
    let t = Date.now()
    let delta = t - this.lastFire
    if (delta > 1000) {
        this.particles.push( new Fire(x, y))
    }
    let p = new Particle(x,y)
    if(random(10) > 8){ p = new Spark(x,y)
    console.log("adding spark instead")}
    this.particles.push(p)
  }

  update(){
    this.particles.forEach(particle => {
        particle.update()
        particle.edges()
        if (particle.finished) {
          this.particles = this.particles.filter(p => p !== particle)
        }
      })
  }
  draw(){
    this.particles.forEach(particle => {
        particle.draw()
      })
  }
}

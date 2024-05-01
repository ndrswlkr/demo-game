import { context } from './canvas'
import { Vector } from './vector'

export class Path {
  constructor (x1, y1, x2, y2) {
    this.start = new Vector(x1, y1)
    this.end = new Vector(x2, y2)
    this.r = 20
  }

  draw () {
    context.beginPath()
    context.strokeStyle = 'white'
    context.lineWidth = 1
    context.moveTo(this.start.x, this.start.y)
    context.lineTo(this.end.x, this.end.y)
    context.stroke()
    context.beginPath()
    context.strokeStyle = '#fff1'
    context.lineWidth = this.r * 2
    context.moveTo(this.start.x, this.start.y)
    context.lineTo(this.end.x, this.end.y)
    context.stroke()
  }
}

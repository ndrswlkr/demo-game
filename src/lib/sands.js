import { canvas, context, line } from './canvas'
import { random } from './mathlib'

export class Sands {
  constructor () {
    this.cell = 2
    this.width = Math.floor(canvas.width / this.cell)
    this.height = Math.floor(canvas.height / this.cell)
    this.field = this.getArray()
    this.field[10][5] = 1
    this.hue = 1
  }

  getArray () {
    let array = []
    for (let i = 0; i < this.height; i++) {
      array[i] = []
      for (let j = 0; j < this.width; j++) {
        array[i][j] = 0
      }
    }

    return array
  }
  isFree (y, x) {
    if (
      this.field[y] &&
      this.field[y][x] !== undefined &&
      this.field[y][x] === 0
    ) {
      return true
    }
    return false
  }
  pourSand (rawX, rawY) {
    if (
      !(
        rawX - 5 > 0 &&
        rawX + 5 < canvas.width &&
        rawY - 5 > 0 &&
        rawY + 5 < canvas.height
      )
    )
      return
    let y = Math.floor(rawY / this.cell)
    let x = Math.floor(rawX / this.cell)
    for(let i = 0; i<5; i++){
        for (let j = 0; j < 5; j++){
            if(random(1) > .75)
            this.field[y+j][x+i] = this.hue
        }
    }
    this.hue += 1
    if (this.hue > 360) this.hue = 1
  }
  update () {
    const getDir = () => {
      let dir = 1
      if (Math.random() > 0.5) dir *= -1
      return dir
    }
    let nextField = this.getArray()
    this.field.forEach((row, y) => {
      row.forEach((state, x) => {
        let dir = getDir()
        if (state > 0) {
          if (this.isFree(y + 1, x)) {
            nextField[y + 1][x] = state
          } else if (this.isFree(y + 1, x + dir)) {
            nextField[y + 1][x + dir] = state
          } else if (this.isFree(y + 1, x + -dir)) {
            nextField[y + 1][x + -dir] = state
          } else {
            nextField[y][x] = state
          }
        }
      })
    })
    this.field = nextField
  }

  draw () {
    let color = 'white'
    let cell = this.cell
    this.field.forEach((row, y) => {
      row.forEach((state, x) => {
        //  context.stroke()
        if (state >= 1) {
          context.beginPath()
          context.fillStyle = `hsl(${state}, 100%, 50%)`
          context.rect(x * cell, y * cell, this.cell, this.cell)
          context.fill()
        }
      })
    })
  }
}

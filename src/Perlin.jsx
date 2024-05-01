import { Vector } from './lib/vector'
import { mousePressed, mouseX, mouseY } from './lib/mouse'
import { canvas, context, center, background, point } from './lib/canvas'
import { floatRange, lerp, map, random } from './lib/mathlib'
import { onMount, onCleanup } from 'solid-js'
import { noise, noiseDetail } from './lib/perlin-noise'

class Game {
  constructor () {
    this.run = false
    this.width = canvas.width
    this.height = canvas.height
    background('#000')
    this.xoff = 0
    this.yoff = 0
    this.done = false
    //noiseDetail(26, 0.6)
    this.imageData = context.createImageData(this.width, this.height)
    this.delta = 10
  }

  update () {
    if (mousePressed) {
    }
    if (this.done) return
    for (let y = this.yoff; y < canvas.height+this.yoff; y += 1) {
      
      for (let x = this.xoff; x < canvas.width+this.xoff; x += 1) {
        
        let g = Math.floor(noise(x / 100, y / 100,) * 255) //, Date.now()) * 255)
        const i = ((x-this.xoff) + (y-this.yoff) * canvas.width) * 4
        this.imageData.data[i] = g
        this.imageData.data[i + 1] = g
        this.imageData.data[i + 2] = g
        this.imageData.data[i + 3] = 255

        //console.log(`rgb(${g}, ${g}, ${g})`)
        //context.fillStyle = `rgb(${g}, ${g}, ${g})`
        //context.fillRect(this.x, this.y, 1, 1)
      }
    }
    //this.done = true
    this.delta += .015
    this.xoff += 3
    this.yoff += 3

}

draw () {
    context.reset()
    context.putImageData(this.imageData, 0,0)
    //background('#000')
    //this.x += 0.01
    // point(noise(this.x)*this.width, center.y,33, "white")
  }

  animate () {
    this.update()
    this.draw()
    if (this.run) requestAnimationFrame(() => this.animate())
  }
}

let game

function Perlin () {
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
export default Perlin

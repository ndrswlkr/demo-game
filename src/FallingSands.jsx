
import { mousePressed, mouseX, mouseY } from './lib/mouse'
import { canvas, context, center, background, point } from './lib/canvas'
import { floatRange, lerp, map, random } from './lib/mathlib'
import { onMount, onCleanup } from 'solid-js'
import { Sands } from './lib/sands'


class Game {
  constructor () {
    this.run = false
    this.width = canvas.width
    this.height = canvas.height
    this.sands = new Sands()
  }



  update () {
    this.sands.update()
    if (mousePressed) {
        this.sands.pourSand(mouseX, mouseY)
    }
    
}

  draw () {
    //context.reset()
    background('#000')
    this.sands.draw()
  }

  animate () {
    this.update()
    this.draw()
    if (this.run) requestAnimationFrame(() => this.animate())
  }
}

let game

function FallingSands () {
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
export default FallingSands

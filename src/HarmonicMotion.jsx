import { Player } from './lib/player'
import { Vector } from './lib/vector'
import { mousePressed, mouseX, mouseY } from './lib/mouse'
import { canvas, context, center, background, point } from './lib/canvas'
import { lerp, map, random } from './lib/mathlib'
import { onMount, onCleanup } from 'solid-js'
import { Vehicle } from './lib/vehicle'
import { Caprot } from './lib/caprot'
import { Wave } from './lib/wave'

class Game {
  constructor () {
    this.run = false
    this.width = canvas.width
    this.height = canvas.height

    this.waves = []
    this.makeRandomWaves()
    this.lockMouse = false
  }
  makeRandomWaves () {
    this.waves = []
    for (let w = 0; w < 2; w++) {
      this.waves.push(
        new Wave(
          random(this.height / 28, this.height / 15),
          random(this.width / 8, this.width),
          random(0, 2 * Math.PI)
        )
      )
    }
    
  }
  async playSound () {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

    const myArrayBuffer = audioCtx.createBuffer(
      2,
      audioCtx.sampleRate * 3,
      audioCtx.sampleRate
    )

    for (let channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
      console.log(myArrayBuffer.length)
      const nowBuffering = myArrayBuffer.getChannelData(channel)
      for (let i = 0; i < myArrayBuffer.length; i++) {
        let x = i 

        let sample = 0
        this.waves.forEach(wave => {
          sample += wave.calculateAudio(x)
        })
        nowBuffering[i] = sample
      }
    }

    const source = audioCtx.createBufferSource()
    source.buffer = myArrayBuffer
    source.connect(audioCtx.destination)
    source.start()
  }
  update () {
    if (mousePressed && this.lockMouse === false) {
      this.makeRandomWaves()
      this.playSound()
      this.lockMouse = true
      setTimeout(() => (this.lockMouse = false), 300)
    }
  }

  draw () {
    //context.reset()
    background('#00000022')
    for (let x = 0; x < this.width; x += 0.5) {
      let y = 0
      this.waves.forEach(wave => {
        y += wave.calculate(x)
      })
      point(x, center.y + y, 3, 'magenta')
    }
    this.waves.forEach(wave => (wave.phase += 0.1))
  }

  animate () {
    this.update()
    this.draw()
    if (this.run) requestAnimationFrame(() => this.animate())
  }
}

let game

function HarmonicMotion () {
  onMount(() => {
    game = new Game()
    game.run = true
    game.animate()
    game.playSound()
  })
  onCleanup(() => {
    game.run = false
    game = ''
  })
  return <div></div>
}
export default HarmonicMotion

import { Vector } from './vector'

export let canvas = null
export let context = null
export let center
export function registerCanvas (canvasRef) {
  canvas = canvasRef
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  context = canvas.getContext('2d')
  center = new Vector(canvas.width / 2, canvas.height / 2)
  console.log('canvas registered...')
}

export function background (color = '#000') {
  context.fillStyle = color
  context.beginPath()
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fill()
  context.closePath()
}

export function point (x, y, size, color = 'magenta') {
  context.beginPath()
  context.fillStyle = color
  context.arc(x, y, size, 0, 2 * Math.PI, true)
  context.fill()
}

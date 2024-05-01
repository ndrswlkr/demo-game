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

export function star(x,y,size,color="yellow"){
    context.beginPath()
    context.fillStyle = color
    context.moveTo( x, y-size)
    context.lineTo(x+size, y+size)
    context.lineTo(x-size, y+size)
    context.fill()
    context.closePath()

     context.beginPath()
    context.fillStyle = color
    context.moveTo( x, y+size + (size/3))
    context.lineTo(x-size, y-size+(size/3))
    context.lineTo(x+size, y-size+(size/3))
    context.fill()
    context.closePath() 
}

export function line(x1, y1, x2, y2, lineWidth = 1, color = "white"){
  context.beginPath()
  context.strokeStyle = color
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
}
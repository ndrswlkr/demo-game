export let mouseX = 0
export let mouseY = 0
export let mousePressed = false
import { canvas } from "./canvas"
export function registerMouse () {
  console.log('mouse registered')
  canvas.onmousemove = e => {
    mouseX = e.clientX
    mouseY = e.clientY
  }
  
  canvas.onpointermove =  e => {
    mouseX = e.clientX
    mouseY = e.clientY
  }

  canvas.onmousedown = e => {
    mousePressed = true
    mouseX = e.clientX
    mouseY = e.clientY
  }
  canvas.onmouseup = e => {
    mousePressed = false
    mouseX = e.clientX
    mouseY = e.clientY
  }
  canvas.onpointerdown = e => {
    mousePressed = true
    mouseX = e.clientX
    mouseY = e.clientY
  }
  canvas.onpointerup = e => {
    mousePressed = false
    mouseX = e.clientX
    mouseY = e.clientY
  }
}

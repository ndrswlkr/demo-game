export let mouseX = 0
export let mouseY = 0
export let mousePressed = false

export function registerMouse () {
  console.log('mouse registered')
  window.onmousemove = e => {
    mouseX = e.clientX
    mouseY = e.clientY
  }
  
  window.onpointermove =  e => {
    mouseX = e.clientX
    mouseY = e.clientY
    console.log("move")
  }

  window.onmousedown = e => {
    mousePressed = true
    mouseX = e.clientX
    mouseY = e.clientY
  }
  window.onmouseup = e => {
    mousePressed = false
    mouseX = e.clientX
    mouseY = e.clientY
  }
  window.onpointerdown = e => {
    mousePressed = true
    mouseX = e.clientX
    mouseY = e.clientY
  }
  window.onpointerup = e => {
    mousePressed = false
    mouseX = e.clientX
    mouseY = e.clientY
  }
}

export let mouseX = 0
export let mouseY = 0
export let mousePressed = false

export function registerMouse () {
  console.log("mouse registered")
  window.onmousemove = e => {
    mouseX = e.clientX
    mouseY = e.clientY
  }

  window.onmousedown = e => (mousePressed = true)
  window.onmouseup = e => (mousePressed = false)
  window.onpointerdown = e => (mousePressed = true)
  window.onpointerup = e => (mousePressed = false)
}

import { onCleanup, onMount } from 'solid-js'
import { Game } from './lib/game'
let game
function Beginners () {
  onMount(() => {
    game = new Game()
    game.run = true
    game.animate()
  })
  onCleanup(()=>{
    game.run = false
    game.animate = ()=>{}
    game = ""
  })
  return <></>
}

export default Beginners

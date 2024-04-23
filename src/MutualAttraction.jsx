import { onCleanup, onMount } from 'solid-js'
import { Game } from './lib/game'
import { MutualAttraction } from './lib/mutual-attraction'
let mutualAttraction

function MutualAttractionDemo () {
  onMount(() => {
    mutualAttraction = new MutualAttraction()
    mutualAttraction.run = true
    mutualAttraction.animate()
  })
  onCleanup(() => {
    mutualAttraction.run = false
    mutualAttraction = ''
  })
  return <div></div>
}
export default MutualAttractionDemo

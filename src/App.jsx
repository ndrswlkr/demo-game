import { For, Show, createSignal, onMount } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { register } from 'register-service-worker'

import { registerMouse } from './lib/mouse'
import { registerCanvas } from './lib/canvas'
import Beginners from './Beginners'
import MutualAttractionDemo from './MutualAttraction'
import AngleAndRadians from './AngleAndRadians'
import Drawing from './Drawing'
import HarmonicMotion from './HarmonicMotion'
import SpringForces from './SpringForces'
import ParticleSystem from './ParticleSystem'
import Steering from './Steering'
import FallingSands from './FallingSands'
import Perlin from './Perlin'
import PathFollowing from './PathFollowing'
import FlowField from './FlowField'
let canvas
function registerSW () {
  register(`/demo-game/serviceworker.js`)
}

const hasNotificationPermission = async () => {
  if (Notification.permission !== 'granted') {
    return false
  }
  return true
}

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') {
    throw new Error('Notification permission not granted')
  }
}

function sendMessageToSW (intervals) {
  window.navigator.serviceWorker.ready.then(reg => {
    reg.active.postMessage({
      type: 'message',
      body: { text: 'hey', data: intervals }
    })
  })
}
function storeSelection (pageList) {
  window.localStorage.setItem('pageList', JSON.stringify(pageList))
}

function loadSelection () {
  let data = window.localStorage.getItem('pageList')
  if (data) return JSON.parse(data)
  return null
}

function App () {
  const [ask, setAsk] = createSignal(false)
  const [showMenu, setShowMenu] = createSignal(false)
  const [pageList, setPageList] = createSignal({
    Beginners: false,
    'Mutual Attraction': false,
    AngleAndRadians: false,
    Drawing: false,
    "Harmonic Motion": false,
    "Spring Forces": false,
    "Particle System": false,
    Steering: false,
    "Falling Sands": false,
    Perlin: false,
    "Path Following": false,
    "Flow Field": false
  })
  const [ready, setReady] = createSignal(false)
  onMount(async () => {
    registerSW()
    const hasPermission = await hasNotificationPermission()
    if (!hasPermission) {
      setAsk(true)
    }

    registerCanvas(canvas)
    registerMouse()
    setReady(true)
    let data = loadSelection()
    if (data) setPageList({ ...pageList(), ...data })
  })

  function changeActive (page) {
    const list = pageList()
    for (let e in list) {
      list[e] = false
    }
    list[page] = true
    setPageList({ ...list })
    setShowMenu(false)
    storeSelection(pageList())
  }

  return (
    <>
      <Show when={pageList().Beginners === true && ready()}>
        <Beginners />
      </Show>
      <Show when={pageList()['Mutual Attraction'] === true && ready()}>
        <MutualAttractionDemo />
      </Show>
      <Show when={pageList().AngleAndRadians === true && ready()}>
        <AngleAndRadians />
      </Show>
      <Show when={pageList().Drawing === true && ready()}>
        <Drawing />
      </Show>
      <Show when={pageList()["Harmonic Motion"] === true && ready()}>
        <HarmonicMotion />
      </Show>
      <Show when={pageList()["Spring Forces"] === true && ready()}>
        <SpringForces />
      </Show>
      <Show when={pageList()["Particle System"] === true && ready()}>
        <ParticleSystem />
      </Show>
      <Show when={pageList()["Steering"] === true && ready()}>
        <Steering />
      </Show>
      <Show when={pageList()["Falling Sands"] === true && ready()}>
        <FallingSands />
      </Show>
      <Show when={pageList()["Perlin"] === true && ready()}>
        <Perlin />
      </Show>
      <Show when={pageList()["Path Following"] === true && ready()}>
        <PathFollowing />
      </Show>
      <Show when={pageList()["Flow Field"] === true && ready()}>
        <FlowField />
      </Show>
      <div id='pile'>
        <canvas ref={canvas} id='playground' />
        <button id='menu-button' onClick={() => setShowMenu(!showMenu())}>
          next
        </button>
        <Show when={showMenu()}>
          <div id='menu'>
            <For each={Object.keys(pageList())}>
              {page => (
                <button onclick={() => changeActive(page)}>{page}</button>
              )}
            </For>
          </div>
        </Show>
      <dialog prop:open={ask()}>
        <h4>Like to get Notified?</h4>
        <button
          onclick={() => {
            requestNotificationPermission()
            setAsk(false)
          }}
        >
          activate notifications
        </button>
      </dialog>
      </div>

    </>
  )
}

export default App

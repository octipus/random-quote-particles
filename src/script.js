import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import palettes from 'nice-color-palettes'
import random from 'canvas-sketch-util/random'
import quotes from 'success-motivational-quotes'


const palette = random.pick(palettes)

// console.log(quotes.getTodaysQuote());


const quote = () =>
{
  const h1 = document.querySelector('h1')
  const p = document.querySelector('p')

  const getQuote = quotes.getTodaysQuote()
  p.textContent = getQuote.body
  h1.textContent = getQuote.by
}

quote()



//
// p.textContent = quotes.getTodaysQuote().body;
// h1.textContent = quotes.getTodaysQuote().by;


// TEXTURE LOADER
const loader = new THREE.TextureLoader()
const cross = loader.load('./cross.png')


// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusKnotGeometry( 10, 3, 400, 90 );

const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 5000;

const posArray = new Float32Array(particlesCnt * 3);

for (let i = 0; i < particlesCnt * 3; i++) {
  // posArray[i] = Math.random()
  // posArray[i] = Math.random() - 0.5
  posArray[i] = (Math.random() - 0.5) * (Math.random() * 5)
 }

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

// Materials

const material = new THREE.LineBasicMaterial({
	color: random.pick(palette)
});

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.0059,
  map:cross,
  transparent: true,
  color: random.pick(palette),
  blending: THREE.AdditiveBlending

})

// Mesh
const sphere = new THREE.Line(geometry,material)
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(sphere, particlesMesh)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('load', () => {
  registerSW();
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#202124'), )

// mouseY
document.addEventListener('mousemove', animateParticles)
let mouseX = 0
let mouseY = 0


function animateParticles(event) {
  mouseX = event.clientY
  mouseY = event.clientY
}

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    particlesMesh.rotation.y = -0.1 * elapsedTime
    particlesMesh.rotation.x = -0.1 * elapsedTime

    // if (mouseY > 0 ) {
    //   particlesMesh.rotation.x = mouseY * (elapsedTime * 0.00008)
    //   particlesMesh.rotation.x = -mouseX * (elapsedTime * 0.00008)
    // }

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


async function registerSW() {
  if('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js');
      console.log("success")
    } catch (e) {
      console.log('SW registration fail');
    }
  }
}

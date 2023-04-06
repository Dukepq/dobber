import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import WebGL from 'three/examples/jsm/capabilities/WebGL'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const canvas = document.querySelector('.webGL')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true, antialias: true});
renderer.setSize( sizes.width, sizes.height );




const geometry = new THREE.PlaneGeometry( 30, 36, 32, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0x3419DD, wireframe: true} ); // pointsmaterial, or other material and paint dots on it?
const mesh = new THREE.Mesh( geometry, material );
mesh.rotation.x = 0
scene.add(mesh);


let qx = 0
let qy = 6
camera.position.z = 6
camera.position.y = 9
camera.position.x = 1
camera.lookAt(-6, 6, 0)


//controller
// const controller = new OrbitControls(camera, canvas)
// controller.enableDamping = true
// controller.enablePan = false
// controller.enableZoom = false
// controller.rotateSpeed = 0.2

window.addEventListener("mousemove", (event) => {
  qx = ( 6 * (1 - event.clientX / sizes.width))
  qy = (1 - event.clientY / sizes.height)
  camera.lookAt(-6, (6 + qy), qx)
})

window.addEventListener("touchmove", (event) => {
  console.log(event)
  qx = ( 6 * (1 - event.touches[0].clientX / sizes.width))
  qy = (1 - event.touches[0].clientY / sizes.height)
  camera.lookAt(-6, (6 + qy), qx)
})


const clock = new THREE.Clock()
function animate() {
  const t = clock.getElapsedTime()
  const positions = geometry.getAttribute('position').array
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]

    // positions[i] = y
    // positions[i + 1] = x;
    positions[i + 2] = Math.sin(0.5*y + t); // adjust z based on y or x vertex position to animate
  }

  // controller.update()
  geometry.getAttribute('position').needsUpdate = true
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})
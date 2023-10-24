import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import image from '../images/image.png'


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
// renderer.setClearColor(0xFEFEFE);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(0, 0, 12);
orbit.update();



const uniforms = {
	u_time: {type: 'f', value: 0.0},
	u_resolution: {type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight)
		.multiplyScalar(window.devicePixelRatio)},
	u_mouse: {type: 'v2', value: new THREE.Vector2(0.0, 0.0)},
	image: {type: 't', value: new THREE.TextureLoader().load(image)}

}


window.addEventListener('mousemove', (e) => {
	uniforms.u_mouse.value.set(e.screenX / window.innerWidth, 1 - e.screenY / window.innerHeight)
})



const geometry = new THREE.PlaneGeometry(10, 10, 30, 30)
const material = new THREE.ShaderMaterial({
	vertexShader: document.getElementById('vertexShander').textContent,
	fragmentShader: document.getElementById('fragmentShander').textContent,
	wireframe: false,
	uniforms
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const clock = new THREE.Clock()

// Sets a 12 by 12 gird helper
// const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// // Sets the x, y, and z axes with each having a length of 4
// const axesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);

function animate() {
	uniforms.u_time.value = clock.getElapsedTime()
   renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
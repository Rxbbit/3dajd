// Importa Three.js y los cargadores necesarios
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';
import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/loaders/OBJLoader.js';

// Escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz
const light = new THREE.AmbientLight(0x404040, 1); // Luz ambiental
scene.add(light);

// Cargar los materiales (.mtl) usando MTLLoader
const mtlLoader = new MTLLoader();
const objPath = 'https://raw.githubusercontent.com/Rxbbit/3dajd/refs/heads/main/models/proyecto%20grande.obj';
const mtlPath = 'https://raw.githubusercontent.com/Rxbbit/3dajd/refs/heads/main/models/proyecto%20grande.mtl';

mtlLoader.load(mtlPath, function (materials) {
    materials.preload();

    // Cargar el modelo OBJ con OBJLoader
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials); // Asigna los materiales cargados
    objLoader.load(objPath, function (object) {
        scene.add(object);
    });
}, undefined, function (error) {
    console.error('Error al cargar los materiales:', error);
});

// Posicionar la cámara
camera.position.z = 5;

// Función de animación
function animate() {
    requestAnimationFrame(animate);
    
    // Animación (giro)
    scene.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Iniciar la animación
animate();

// Ajustar el tamaño del canvas cuando se redimensiona la ventana
window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

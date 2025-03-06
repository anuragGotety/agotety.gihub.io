// JavaScript source code
// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

// Attach renderer to the body
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit controls for navigation
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth movement
controls.dampingFactor = 0.05;

// Load 3D Model of New York City
const loader = new THREE.GLTFLoader();
loader.load(
  "assets/models/newyork_city.glb",  // Make sure this path is correct
  function (gltf) {
    scene.add(gltf.scene);
    gltf.scene.scale.set(10, 10, 10); // Adjust size
    gltf.scene.position.set(0, -2, 0);
  },
  undefined,
  function (error) {
    console.error("Error loading model:", error);
  }
);

// Add lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Set camera position
camera.position.set(0, 5, 10);
controls.update();

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener("resize", function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

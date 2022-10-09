import './three.js';
// import { DoubleSide } from './three.js';

const cameraMovementSpeed = 0.1;
const cameraRotationSpeed = 0.03;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); // app resolution
document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(1, 1);
const cameraPivotGeometry = new THREE.BoxGeometry(0.2,0.2,1);

const texture = new THREE.TextureLoader().load('..\\assets\\textures\\grass.png');
const material = new THREE.MeshBasicMaterial({map:texture, side:THREE.DoubleSide});

const plane = new THREE.Mesh(planeGeometry, material);
const cameraPivot = new THREE.Mesh(cameraPivotGeometry);

scene.add(plane);
scene.add(cameraPivot);
cameraPivot.add(camera);

// cameraPivot.position.set(0,0,-5);

camera.position.set(0,5,0);
camera.rotation.x = (-45 * Math.PI) / 180;
plane.rotation.x = (90 * Math.PI) / 180;
plane.position.y = 0;

function animate () {
    requestAnimationFrame(animate);

    checkInput();

    renderer.render(scene, camera);
}

function checkInput () {
    document.onkeydown = function (e) {
        if(e.key == 'w'){
            cameraPivot.translateOnAxis(new THREE.Vector3(0,0,1), -cameraMovementSpeed);
        }
        if(e.key == 'a'){
            cameraPivot.translateOnAxis(new THREE.Vector3(1,0,0), -cameraMovementSpeed);
        }
        if(e.key == 's'){
            cameraPivot.translateOnAxis(new THREE.Vector3(0,0,1), cameraMovementSpeed);
        }
        if(e.key == 'd'){
            cameraPivot.translateOnAxis(new THREE.Vector3(1,0,0), cameraMovementSpeed);
        }

        if(e.key == 'ArrowLeft'){
            // camera.rotateOnWorldAxis(new THREE.Vector3(0,1,0), cameraRotationSpeed);
            cameraPivot.rotateOnWorldAxis(new THREE.Vector3(0,1,0), cameraRotationSpeed * 2);
        }
        if(e.key == 'ArrowRight'){
            // camera.rotateOnWorldAxis(new THREE.Vector3(0,1,0), -cameraRotationSpeed);
            cameraPivot.rotateOnWorldAxis(new THREE.Vector3(0,1,0), -cameraRotationSpeed * 2);
        }
    };
}

animate();
import './three.js';
import './model/Tile';

class Tile {

    constructor () {
        const planeGeometry = new THREE.PlaneGeometry(1, 1);
        const texture = new THREE.TextureLoader().load('..\\..\\assets\\textures\\grass.png');
        const material = new THREE.MeshBasicMaterial({map:texture});
        this.plane = new THREE.Mesh(planeGeometry, material);      
    }

    get mesh() {
        return this.plane;
    }

}

const cameraMovementSpeed = 0.1;
const cameraRotationSpeed = 0.02;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); // app resolution
document.body.appendChild(renderer.domElement);

const cameraPivotGeometry = new THREE.BoxGeometry(0.2,0.2,1);

const cameraPivot = new THREE.Mesh(cameraPivotGeometry);
cameraPivot.visible = false;

scene.add(cameraPivot);
cameraPivot.add(camera);

cameraPivot.position.set(0,0,5);

camera.position.set(0,5,0);
camera.rotation.x = (-45 * Math.PI) / 180;


// initializing tiles
const tiles = new Array(10);
for (let i = 0; i < 10; i++) {
    tiles[i] = new Array(10);
    for (let j = 0; j < 10; j++) {
        let auxPlane = new Tile().mesh;
        auxPlane.rotation.x = (270 * Math.PI) / 180;
        auxPlane.position.x = j;
        auxPlane.position.z = i;
        tiles[i][j] = auxPlane;
        // scene.add(auxPlane);
    }
}

// adding tiles
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        scene.add(tiles[i][j]);
    }
}



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
        if(e.key == 'q'){
            cameraPivot.translateY(-cameraMovementSpeed);
        }
        if(e.key == 'e'){
            cameraPivot.translateY(cameraMovementSpeed);
        }

        if(e.key == 'ArrowUp'){
            camera.rotateOnAxis(new THREE.Vector3(1,0,0), cameraRotationSpeed * 2);
        }
        if(e.key == 'ArrowLeft'){
            cameraPivot.rotateOnWorldAxis(new THREE.Vector3(0,1,0), cameraRotationSpeed * 2);
        }
        if(e.key == 'ArrowDown'){
            camera.rotateOnAxis(new THREE.Vector3(1,0,0), -cameraRotationSpeed * 2);
        }
        if(e.key == 'ArrowRight'){
            cameraPivot.rotateOnWorldAxis(new THREE.Vector3(0,1,0), -cameraRotationSpeed * 2);
        }
    };
}

animate();
import './three.js';
import {Tile} from './model/Tile.js';

const cameraMovementSpeed = 0.1;
const cameraRotationSpeed = 0.02;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const cameraPivotGeometry = new THREE.BoxGeometry(0.2,0.2,1);
const cameraPivot = new THREE.Mesh(cameraPivotGeometry);

// mouse and raycast
const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); // app resolution
document.body.appendChild(renderer.domElement);

cameraPivot.visible = false;
cameraPivot.position.set(0,0,5);
scene.add(cameraPivot);
cameraPivot.add(camera);
camera.position.set(0,5,0);
camera.rotation.x = (-45 * Math.PI) / 180;

// initializing arrays of Tiles and adding them to the scene
const tiles = new Array(10);
for (let i = 0; i < 10; i++) {
    tiles[i] = new Array(10);
    for (let j = 0; j < 10; j++) {
        let auxPlane = new Tile().mesh;
        auxPlane.rotation.x = (270 * Math.PI) / 180;
        auxPlane.position.x = j;
        auxPlane.position.z = i;
        tiles[i][j] = auxPlane;
        scene.add(auxPlane);
    }
}

animate();

let selected;

const onMouseMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    
    const intersects = raycaster.intersectObjects(scene.children, false);

    // scene.children.forEach(element => {
    //     if(element !== selected){
    //         element.material.color.setHex(0xFFFFFF);
    //     }
    // });
};
window.addEventListener("mousemove", onMouseMove);

const onMouse1Down = (event) => {
    if(event.buttons == 1){
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);

        
        const intersects = raycaster.intersectObjects(scene.children, false);
        
        if(intersects.length > 0){
            if(selected != null){
                selected.material.color.set(0xffffff);
            }
            let obj = intersects[0].object;
            if(obj instanceof THREE.Object3D){
                obj.material.color.setHex(0x05f505);
                selected = obj;
            }
        }
    }
    if(event.buttons == 2){
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        
        const intersects = raycaster.intersectObjects(scene.children, false);
    
        if(intersects.length > 0){
            intersects[0].object.material.color.setHex(0xf57005);
        }
    }

    

    // pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    // pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    // raycaster.setFromCamera(pointer, camera);
    
    // const intersects = raycaster.intersectObjects(scene.children, false);

    // if(intersects.length > 0){
    //     intersects[0].object.geometry.dispose();
    //     intersects[0].object.material.dispose();
    //     scene.remove(intersects[0].object);
    // }
};
window.addEventListener("mousedown", onMouse1Down, false);

window.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}
window.addEventListener('resize', onWindowResize, false)

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

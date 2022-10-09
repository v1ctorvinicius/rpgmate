export class Tile {

    constructor () {
        const planeGeometry = new THREE.PlaneGeometry(1, 1);
        const texture = new THREE.TextureLoader().load('..\\..\\assets\\textures\\grass.png');
        const material = new THREE.MeshBasicMaterial({map:texture, side:THREE.FrontSide});
        this.plane = new THREE.Mesh(planeGeometry, material);      
    }

    get mesh() {
        return this.plane;
    }

}
(function() {
'use strict';

var camera,
    scene,
    renderer,
    cubes= [];

function init () {

    camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 4000);
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.add(camera);

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    makeCubes();

    setInterval(update, 1000/60);

}

function update () {
    updateCubes();
    renderer.render(scene, camera);
}

function randomRange (min, max) {
    return Math.random() * (max-min) + min;
}

function makeCubes () {
    var cube;

    //Moves from -1000 to 1000 in Z axis
    for (var zpos = -1000; zpos < 1000; zpos+=20) {
        cube = THREE.SceneUtils.createMultiMaterialObject(
                    new THREE.CubeGeometry(50,50,50),
                    [new THREE.MeshBasicMaterial({
                        color:0x000000,
                        shading: THREE.FlatShading,
                        wireframe: true,
                        transparent: true}),
                    new THREE.MeshBasicMaterial({color: 0x00FF00})]
                );

        cube.position.x = randomRange(-1000, 1000);
        cube.position.y = randomRange(-1000, 1000);
        cube.position.z = zpos;

        scene.add(cube);

        cubes.push(cube);

    }

}

function updateCubes () {
    var cube;
    for (var i = 0; i<cubes.length; i++) {
        cube = cubes[i];
        cube.position.z += 50;

        if (cube.position.z > 1000) {
            cube.position.x = randomRange(-1000, 1000);
            cube.position.y =randomRange(-1000, 1000);
            cube.position.z-=2000;

        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    init();
});

})();
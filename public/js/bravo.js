(function() {
'use strict';

var camera,
    scene,
    renderer,
    bravo;

function start () {

    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;

    loader.load('/assets/models/bravo1.dae', function(collada) {
        bravo = collada.scene;

        bravo.scale.x = bravo.scale.y = bravo.scale.z = 25.0;

        init();

        animate();

    });

}

function init () {
  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    -2000, 1000 );

  camera.position.y = 100;
  camera.position.z = 100;


  camera.rotation.x -= 30 * (Math.PI / 180);

  scene.add(camera);

  var directionalLight = new THREE.DirectionalLight(0xeeeeee, 1.0);
  directionalLight.position.x = 1;
  directionalLight.position.y = 0;
  directionalLight.position.z = 0;
  scene.add(directionalLight);

  var directionalLight2 = new THREE.DirectionalLight(0xeeeeee, 2.0);
  directionalLight2.position.set(-1,0,1);
  scene.add(directionalLight2);

  scene.add(bravo);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);


}

function animate () {
  requestAnimationFrame(animate);
  render();
}

function render () {
  renderer.render(scene, camera);
  bravo.rotation.y+= 1*(Math.PI / 180);
}

document.addEventListener('DOMContentLoaded', function() {
    start();
});

})();
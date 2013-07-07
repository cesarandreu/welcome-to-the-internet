(function() {
    var container, scene, camera, renderer, controls, stats;
    var keyboard = new THREEx.KeyboardState();
    var clock = new THREE.Clock();

    //Custom variables here
    var bravo;

    //initialization
    init();

    //animation loop / game loop
    animate();

    ///////////////
    // FUNCTIONS //
    ///////////////

    function init () {
        //SCENE
        scene = new THREE.Scene();
        //CAMERA
        var SCREEN_WIDTH = window.innerWidth,
            SCREEN_HEIGHT = window.innerHeight;
        var VIEW_ANGLE = 45,
            ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
            NEAR = 0.1,
            FAR = 20000;
        camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR);
        scene.add(camera);
        camera.position.set(0, 150, 400);
        camera.lookAt(scene.position);

        //RENDERER
        if (Detector.webgl) {
            renderer = new THREE.WebGLRenderer( {antialias: true} );
        } else {
            renderer = new THREE.CanvasRenderer();
        }
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        container = document.getElementById ( 'ThreeJS' );
        container.appendChild( renderer.domElement );

        //EVENTS
        //automatically resize renderer
        THREEx.WindowResize(renderer, camera);
        THREEx.FullScreen.bindKey({ charCode: 'm'.charCodeAt(0) });

        //STATS
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.bottom = '0px';
        stats.domElement.style.zIndex = 100;
        container.appendChild(stats.domElement);

        //LIGHT
        var light = new THREE.PointLight( 0xffffff );
        light.position.set(0,250,0);
        scene.add(light);

        //FLOOR
        var floorTexture = new THREE.ImageUtils.loadTexture( '/img/checkerboard.jpg' );
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
        floorTexture.repeat.set( 10, 10 );
        var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
        var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -0.5;
        floor.rotation.x = Math.PI / 2;
        scene.add(floor);

        var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
        var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
        var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
        scene.add(skyBox);

        //CUSTOM

        //BRAVO
        var loader = new THREE.JSONLoader();
        loader.load('/assets/models/bravo1.js', function(geometry, materials) {
            var material = new THREE.MeshFaceMaterial( materials );
            bravo = new THREE.Mesh(geometry, material);
            bravo.scale.set(10,10,10);
            bravo.position.y = 50;
            scene.add(bravo);
        });

        //set of coordinate axes to help orient users
        var axes = new THREE.AxisHelper(100);
        scene.add(axes);

    }

    function animate () {
      requestAnimationFrame(animate);
      render();
      update();
    }

    function update () {
      // delta = change in time since last calls (in seconds)
      var delta = clock.getDelta();
      var moveDistance = 200 * delta; // 200px per second
      var rotateAngle = Math.PI / 2 *delta; // 90 deg per second

    // move forwards/backwards/left/right
    if ( keyboard.pressed("W") )
        bravo.translateZ( -moveDistance );
    if ( keyboard.pressed("S") )
        bravo.translateZ(  moveDistance );
    if ( keyboard.pressed("Q") )
        bravo.translateX( -moveDistance );
    if ( keyboard.pressed("E") )
        bravo.translateX(  moveDistance );

    // rotate left/right/up/down
    var rotation_matrix = new THREE.Matrix4().identity();
    if ( keyboard.pressed("A") )
        bravo.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
    if ( keyboard.pressed("D") )
        bravo.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
    if ( keyboard.pressed("R") )
        bravo.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
    if ( keyboard.pressed("F") )
        bravo.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);

    if ( keyboard.pressed("Z") ){
        bravo.position.set(0,25.1,0);
        bravo.rotation.set(0,0,0);
    }

    var relativeCameraOffset = new THREE.Vector3(0, 10, 20);
    var cameraOffset = relativeCameraOffset.applyMatrix4(bravo.matrixWorld);

    camera.position.x = cameraOffset.x;
    camera.position.y = cameraOffset.y;
    camera.position.z = cameraOffset.z;
    camera.lookAt(bravo.position);


      //controls.update();
    stats.update();
    }

    function render () {
      renderer.render( scene, camera);
    }

})();
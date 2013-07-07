(function() {
    var container, scene, camera, renderer, controls, stats;
    var keyboard = new THREEx.KeyboardState();
    var clock = new THREE.Clock();

    //Custom variables here

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

        //Pulls the camera back and up.
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

        //CONTROLS
        controls = new THREE.OrbitControls( camera, renderer.domElement );

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
        var ambientLight = new THREE.AmbientLight( 0x111111 );
        //scene.add(ambientLight);

        //GEOMETRY

        //Sphere
        var sphereGeometry = new THREE.SphereGeometry( 50, 32, 16 );

        //lambert material gives realistic lighting (requires at least one light!)
        var sphereMaterial = new THREE.MeshLambertMaterial( {color: 0x8888ff} );

        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(100, 50, -50);
        scene.add(sphere);

        //set of coordinate axes to help orient users
        var axes = new THREE.AxisHelper(100);
        scene.add(axes);

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

    }

    function animate () {
      requestAnimationFrame(animate);
      render();
      update();
    }

    function update () {
      // delta = change in time since last calls (in seconds)
      var delta = clock.getDelta();

      controls.update();
      stats.update();
    }

    function render () {
      renderer.render( scene, camera);
    }

})();
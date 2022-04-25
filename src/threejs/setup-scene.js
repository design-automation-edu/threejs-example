import * as THREE from "three";

// ----------------------------------------------------------------------------
// Set up scene
// ----------------------------------------------------------------------------
export function setupScene(scene) {

    // Create a group to store all objects in
    // const env = new THREE.Group();
    // env.name = "env";

    // CAMERA AND SCENE
    const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 100, 100, 100 );
    camera.up.set( 0, 0, 1 );
  
    // SCENE GRID
    const gridGround = new THREE.GridHelper( 1000, 50, 0x3f3f3f, 0x3f3f3f );
    gridGround.rotation.x = Math.PI / 2;
    scene.add( gridGround );
  
    // SCENE BACKGROUND AND FOG
    scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
    scene.fog = new THREE.Fog( scene.background, 1, 7000 );
  
    // HEMISPHERE LIGHT
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.01, 1, 0.7 );
    hemiLight.position.set( 0, 0, 300 );
    hemiLight.up.set( 0, 0, 0 );
    scene.add( hemiLight );
  
    // HEMISPHERE LIGHT HELPER
    const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 100 );
    scene.add( hemiLightHelper );
  
    // DIRECTIONAL LIGHT
    const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -0.9, -0.8, 1.1 );
    dirLight.position.multiplyScalar( 1000 );
    scene.add( dirLight );
  
    // DIRECTIONAL LIGHT HELPER
    const dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 100 );
    scene.add( dirLightHeper );
  
    // DIRECTIONAL LIGHT SHADOWS
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 3000;
    dirLight.shadow.camera.left = -500;
    dirLight.shadow.camera.bottom = -500;
    dirLight.shadow.camera.top = 500;
    dirLight.shadow.camera.right = 500;
  
    // DIRECTIONAL LIGHT SHADOWS HELPER
    const dirLightShadowHeper = new THREE.CameraHelper( dirLight.shadow.camera );
    scene.add( dirLightShadowHeper );
  
    // GROUND
    const groundGeo = new THREE.PlaneBufferGeometry( 1000, 1000 );
    const groundMat = new THREE.MeshLambertMaterial( { color: 'grey' } );
    // const groundMat = new THREE.MeshStandardMaterial( { color: 'white' } )
    // groundMat.color.setHSL( 0.095, 1, 0.75 );
    const ground = new THREE.Mesh( groundGeo, groundMat );
    ground.receiveShadow = true;
    scene.add( ground );
  
    // Add the group to teh scene
    // scene.add(env)

    // RETURN CAMERA
    return camera;
  
  }
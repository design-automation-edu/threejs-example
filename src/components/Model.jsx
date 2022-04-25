
import { useState, useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { genModel } from "../threejs/gen-model"
import { setupScene } from "../threejs/setup-scene"
import { useStores } from "../stores/index";

// ----------------------------------------------------------------------------
// React Component for ThreeJS Model
// ----------------------------------------------------------------------------
// export function Model({setScene}) {
export function Model() {
    const refContainer = useRef();
    const [renderer, setRenderer] = useState();
    const {params, scene, model } = useStores();
  
    useEffect(() => {
      const { current: container } = refContainer;
      if (container && !renderer) {
  
        // GET HEIGHT AND WIDTH WINDOW
        const scW = container.clientWidth;
        const scH = container.clientHeight;
  
        // RENDERER
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(scW, scH);
        renderer.outputEncoding = THREE.sRGBEncoding;
        container.appendChild(renderer.domElement);
        setRenderer(renderer);
  
        // SCENE
        const camera = setupScene(scene);
        genModel(model, params);
  
        // ORBIT CONTROL
        const controls = new OrbitControls( camera, renderer.domElement );
  
        // ANIMATION LOOP
        let req = null;
              function animate() {
                  req = requestAnimationFrame( animate );
          controls.update();
                  renderer.render( scene, camera );
              }
        animate();
  
        // WINDOW RESIZE
        function onWindowResize() {
          const { current: container } = refContainer;
          const scW = container.clientWidth;
          const scH = container.clientHeight;
          camera.aspect = scW / scH;
                camera.updateProjectionMatrix();
          renderer.setSize( scW, scH );
        }
        window.addEventListener('resize', onWindowResize);
        // setScene(scene)
  
        // CLEAN UP
        return () => {
          container.removeChild(renderer.domElement)
          cancelAnimationFrame(req);
          renderer.dispose();
          window.removeEventListener('resize', onWindowResize);
        };
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    // RETURN COMPONENT
    return (
      <div
        id='threejs'
        ref={refContainer}
      />
    );
};
  
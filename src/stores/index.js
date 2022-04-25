import React from "react";
import * as THREE from "three";

// ----------------------------------------------------------------------------
// Parameters
// ----------------------------------------------------------------------------
const params = {
  road_width: 7,
  sidewalk_width: 2,
  lot_depth: 15,
  lot_width: 12,
  front_setback: 2,
  rear_setback: 3,
  side_setback: 1,
  num_floors: 3
}

// ----------------------------------------------------------------------------
// ThreeJS Scene
// ----------------------------------------------------------------------------
const scene = new THREE.Scene();
const model = new THREE.Group();
model.name = "model";
scene.add( model );
THREE.Object3D.DefaultUp = new THREE.Vector3(0,0,1);

// ----------------------------------------------------------------------------
// React Context
// ----------------------------------------------------------------------------
const storesContext = React.createContext({
  params: params,
  scene: scene,
  model: model
});
export const useStores = () => React.useContext(storesContext);

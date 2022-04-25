import * as THREE from "three";

// ----------------------------------------------------------------------------
// Create Geom
// ----------------------------------------------------------------------------
export function genModel(model, params) {
  model.clear();
  // parameters
  const {
    road_width,
    sidewalk_width,
    lot_depth,
    lot_width,
    front_setback,
    rear_setback,
    side_setback,
    num_floors
  } = params;
  // console.log(params)
  // variables
  const NUM_LOTS = 10;
  const bldg_depth = lot_depth - front_setback - rear_setback;
  const bldg_width = lot_width - (side_setback * 2);
  // road
  const road_mat = material(0.1,0.1,0);
  const road = rectCen(model, [0, 0, 0.1], road_width, lot_width * NUM_LOTS, road_mat);
  // sidewalks
  const side_mat = material(0.1,0.1,1);
  const side_x = (road_width + sidewalk_width) / 2;
  const side1 = rectCen(model, [side_x, 0, 0.1], sidewalk_width, lot_width * NUM_LOTS, side_mat);
  const side2 = rectCen(model, [-side_x, 0, 0.1], sidewalk_width, lot_width * NUM_LOTS, side_mat);
  // lots and buildings
  const lot_mat = material(0.1,1,0.1);
  const bldg_mat = material(1,1,0.1);
  const lot_x = sidewalk_width + (road_width + lot_depth) / 2;
  const lot_y_start = -lot_width * ((NUM_LOTS / 2) - 0.5);
  const bldg_x = sidewalk_width + ((road_width + bldg_depth) / 2) + front_setback;
  const bldg_y_start = lot_y_start;
  for (var i = 0; i < NUM_LOTS; i++) {
    const lot_y = lot_y_start + (i * lot_width);
    const lot1 = rectCen(model, [lot_x, lot_y, 0.2], lot_depth, lot_width, lot_mat);
    const lot2 = rectCen(model, [-lot_x, lot_y, 0.2], lot_depth, lot_width, lot_mat);
    if (bldg_width > 0 && bldg_depth > 0 &&  num_floors > 0) {
      const bldg_y = bldg_y_start + (i * lot_width);
      const bldg1 = bldgCen(model, [bldg_x, bldg_y, 0.3], bldg_depth, bldg_width, num_floors, bldg_mat);
      const bldg2 = bldgCen(model, [-bldg_x, bldg_y, 0.32], bldg_depth, bldg_width, num_floors, bldg_mat);
    }
  }
}
// create material
function material(r,g,b) {
  return new THREE.MeshPhongMaterial({
    color: new THREE.Color(r,g,b),
    flatShading: THREE.FlatShading
  });
}
// create rect by centre
function rectCen(model, cen, x_size, y_size, mat) {
  const rect = new THREE.PlaneGeometry( x_size, y_size );
  const mesh = new THREE.Mesh( rect, mat );
  mesh.position.set( cen[0], cen[1], cen[2] );
  model.add( mesh );
  // lines
  const edges = new THREE.EdgesGeometry( rect );
  const lines = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 'black' } ) );
  lines.position.set( cen[0], cen[1], cen[2] );
  model.add( lines );
  //
  return mesh;
}
// create building by centre
function bldgCen(model, cen, x_size, y_size, num_floors, mat) {
  const height = num_floors * 3;
  const box = new THREE.BoxGeometry( x_size, y_size, height,  1, 5, 1 );
  const mesh = new THREE.Mesh( box, mat );
  mesh.position.set( cen[0], cen[1], cen[2] + (height / 2));
  model.add( mesh );
  // lines
  const edges = new THREE.EdgesGeometry( box );
  const lines = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 'black' } ) );
  lines.position.set( cen[0], cen[1], cen[2] + (height / 2));
  model.add( lines );
  // lines for floors
  const rect = new THREE.PlaneGeometry( x_size, y_size );
  for (var i = 1; i < num_floors; i++) {
    const floor_edges = new THREE.EdgesGeometry( rect );
    const floor_lines = new THREE.LineSegments( floor_edges, new THREE.LineBasicMaterial( { color: 'black' } ) );
    floor_lines.position.set( cen[0], cen[1], cen[2] + (3 * i));
    model.add( floor_lines );
  }
  //
  return mesh;
}
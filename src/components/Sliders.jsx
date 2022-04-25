import { genModel } from "../threejs/gen-model"
import { useStores } from "../stores/index";

// ----------------------------------------------------------------------------
// React Component for ThreeJS Model
// ----------------------------------------------------------------------------
export function Sliders() {
    const {params, model} = useStores();

    // Parameters
    // road_width
    // sidewalk_width
    // lot_depth
    // lot_width
    // front_setback
    // rear_setback
    // side_setback
    // num_floors
    function update(e, key) {
      params[key] = parseFloat(e.target.value);
      genModel(model, params);
    }

    // RETURN COMPONENT
    return (
      <div>
        <div id="slidecontainer">
          <p>road_width:</p>
          <input id="road_width" type="range" min="6" max="18" defaultValue="7" step="0.1" 
            onChange={(e) => update(e, 'road_width')}/>
          <p>sidewalk_width:</p>
          <input id="sidewalk_width" type="range" min="1.5" max="10" defaultValue="2" step="0.1" 
            onChange={(e) => update(e, 'sidewalk_width')}/>
          <p>lot_depth:</p>
          <input id="lot_depth" type="range" min="10" max="50" defaultValue="15" step="0.1" 
            onChange={(e) => update(e, 'lot_depth')}/>
          <p>lot_width:</p>
          <input id="lot_width" type="range" min="10" max="100" defaultValue="12" step="0.1" 
            onChange={(e) => update(e, 'lot_width')}/>
          <p>front_setback:</p>
          <input id="front_setback" type="range" min="0" max="10" defaultValue="2" step="0.1" 
            onChange={(e) => update(e, 'front_setback')}/>
          <p>rear_setback:</p>
          <input id="rear_setback" type="range" min="0" max="10" defaultValue="3" step="0.1" 
            onChange={(e) => update(e, 'rear_setback')}/>
          <p>side_setback:</p>
          <input id="side_setback" type="range" min="0" max="10" defaultValue="1" step="0.1" 
            onChange={(e) => update(e, 'side_setback')}/>
          <p>num_floors:</p>
          <input id="num_floors" type="range" min="2" max="4" defaultValue="2" step="1" 
            onChange={(e) => update(e, 'num_floors')}/>
        
        </div>
      </div>
    );
};
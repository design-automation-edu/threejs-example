import './App.css';
import { Model } from "./components/Model"
import { Sliders } from "./components/Sliders"

// ----------------------------------------------------------------------------
// The App
// ----------------------------------------------------------------------------
function App() {
  return (
    <div className="App">
      <header id="header">
        <p>Testing React with ThreeJS.</p>
      </header> 
      <div id="sliders">
        <Sliders />
      </div>
      <div id="model">
        <Model />
      </div>
    </div>
  );
}
export default App;
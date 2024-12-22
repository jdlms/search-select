import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ComboBoxExample } from "./ComboBoxExample";
import { AlgoliaExample } from "./AlgoliaInstantSearch";
import FuseSelect from "./Fuse";

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Basic Downshift example:</p>
      <ComboBoxExample />
      <AlgoliaExample />
      <p>Fuse Example:</p>
      <FuseSelect />
    </>
  );
}

export default App;

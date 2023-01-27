import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ComposeSalad from "./components/ComposeSalad";
import inventory from "./inventory.ES6";
import header from "./assets/header.png";

function App() {
  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
          <img src={header} alt="Header" className="img-fluid rounded mx-auto d-block" />
        {/* <span className="fs-4">Min egen salladsbar</span> */}
      </header>
      <ComposeSalad inventory={inventory} />
      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webbprogrammering
      </footer>
    </div>
  );
}

export default App;

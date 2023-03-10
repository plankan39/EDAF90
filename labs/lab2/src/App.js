import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ComposeSalad from "./components/ComposeSalad";
import inventory from "./inventory.ES6";
import header from "./assets/header.png";
import { useState } from "react";
import ViewOrder from "./components/ViewOrder";

function App() {

  const [shoppingCart, setShoppingCart] = useState([]);

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
          <img src={header} alt="Header" className="img-fluid rounded mx-auto d-block" />
      </header>
      <ComposeSalad inventory={inventory} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />
      <ViewOrder shoppingCart={shoppingCart} setShoppingCart={setShoppingCart}/>
      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webbprogrammering
      </footer>
    </div>
  );
}

export default App;

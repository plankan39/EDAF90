import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ComposeSalad from "./components/ComposeSalad";
import inventory from "./inventory.ES6";
import header from "./assets/header.png";
import { useState } from "react";
import ViewOrder from "./components/ViewOrder";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import ViewIngredient from "./components/ViewIngredient";

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <img
          src={header}
          alt="Header"
          className="img-fluid rounded mx-auto d-block"
        />
      </header>

      <NavBar />
      <Routes>
        <Route
          path="/compose-salad"
          element={
            <ComposeSalad
              inventory={inventory}
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />
          }
        />
        <Route
          path="/view-order"
          element={
            <ViewOrder
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />
          }
        />
        <Route index element={<h1>Hello</h1>} />
        <Route
          path="/view-ingredient/:name"
          element={<ViewIngredient inventory={inventory} />}
        />
        <Route path="/*" element={<h1>Page not found</h1>} />
      </Routes>
      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webbprogrammering
      </footer>
    </div>
  );
}

export default App;

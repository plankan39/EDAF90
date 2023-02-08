import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ComposeSalad from "./components/ComposeSalad";
import { useState, useEffect } from "react";
import ViewOrder from "./components/ViewOrder";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import ViewIngredient from "./components/ViewIngredient";
import Header from "./components/Header";
import SuccesfullOrder from "./components/SuccesfullOrder";
import Salad from "./model/Salad";

function App() {
  const [inventory, setInventory] = useState({});
  const [shoppingCart, setShoppingCart] = useState([]);
  const [orderResult, setOrderResult] = useState({});

  const updateShoppingCart = (shoppingCart) => {
    setShoppingCart(shoppingCart);
    window.localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  };

  useEffect(() => {
    Promise.all([
      fetchInventory("foundations"),
      fetchInventory("proteins"),
      fetchInventory("dressings"),
      fetchInventory("extras"),
    ])
      .then((ingredientGroups) =>
        ingredientGroups.reduce((prev, curr) => ({ ...prev, ...curr }))
      )
      .then((allIngredients) => setInventory(allIngredients));

    let localShoppingCart = JSON.parse(
      window.localStorage.getItem("shoppingCart")
    );

    setShoppingCart(
      localShoppingCart
        ? localShoppingCart.map((salad) => new Salad(JSON.stringify(salad)))
        : []
    );
  }, []);

  const fetchIngredient = function (url, ingredient) {
    return fetch(url + ingredient).then((response) => {
      if (!response.ok) {
        throw new Error(`${url} returned status ${response.status}`);
      }
      return response.json();
    });
  };

  const fetchInventory = function (group) {
    let url = `http://localhost:8080/${group}/`;
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${url} returned status ${response.status}`);
        }
        return response.json();
      })
      .then((names) => {
        let props = names.map((name) => fetchIngredient(url, name));
        return Promise.all(props).then((p) =>
          p.reduce(
            (prev, current, index) => ({ ...prev, [names[index]]: current }),
            {}
          )
        );
      });
  };

  return (
    <div className="container py-4">
      <Header />
      <NavBar />
      <Routes>
        <Route
          path="/compose-salad"
          element={
            <ComposeSalad
              inventory={inventory}
              shoppingCart={shoppingCart}
              setShoppingCart={updateShoppingCart}
            />
          }
        />
        <Route
          path="/view-order"
          element={
            <ViewOrder
              shoppingCart={shoppingCart}
              setShoppingCart={updateShoppingCart}
              setOrderResult={setOrderResult}
            />
          }
        />
        <Route
          path="/view-order/success"
          element={<SuccesfullOrder orderResult={orderResult} />}
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

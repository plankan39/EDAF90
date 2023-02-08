import React from "react";
import { useNavigate } from "react-router-dom";

const ViewOrder = ({ shoppingCart, setShoppingCart, setOrderResult }) => {
  const order = function () {
    const url = "http://localhost:8080/orders/";
    let orderItems = shoppingCart.map((salad) =>
      Object.keys(salad.ingredients)
    );
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderItems),
    });
  };

  let nav = useNavigate();
  return (
    <div className="container col-12 ">
      <div className="row h-100 p-5 bg-light border rounded-3 grid gap-3">
        <h2>Varukorg: </h2>
        {shoppingCart.map((salad) => (
          <div
            className="row text-primary p-3 border border-primary rounded-3"
            key={salad.uuid}
          >
            <div className="col p-1">
              {Object.keys({ ...salad.ingredients }).join(", ")}
            </div>
            <div className="col-1">{salad.getPrice() + " kr"}</div>
            <button
              className=" col-1 btn btn-sm btn-primary "
              //   justify-content-end "
              type="button"
              onClick={(e) =>
                setShoppingCart(
                  [...shoppingCart].filter((s) => s.uuid !== salad.uuid)
                )
              }
            >
              Ta bort
            </button>
          </div>
        ))}

        <div className="row text-white bg-secondary p-3 border rounded-3">
          Totalt:{" "}
          {shoppingCart.reduce((prev, curr) => prev + curr.getPrice(), 0)} kr
        </div>
        <div className="row gap-3">
          <button
            className=" col btn btn-primary "
            //   justify-content-end "
            type="button"
            onClick={() =>
              order()
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(response.status);
                  }

                  return response.json();
                })
                .then((res) => {
                  setOrderResult(res);
                  setShoppingCart([]);
                  nav("success");
                })
            }
          >
            Lägg order
          </button>
          <button
            className=" col btn btn-primary "
            type="button"
            onClick={() => nav("/compose-salad")}
          >
          Handla mer sallader
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;

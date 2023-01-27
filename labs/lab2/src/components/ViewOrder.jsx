import React from "react";

const ViewOrder = ({ shoppingCart, setShoppingCart }) => {
  return (
    <div className="container col-12">
      <div className="row h-100 p-5 bg-light border rounded-3">
        <h2>Varukorg: </h2>
        {shoppingCart.map((salad) => (
          <div
            className="row text-primary mt-2 p-3 border border-primary rounded-3"
            key={salad.uuid}
          >
            <div className="col p-1">
            {Object.keys({ ...salad.ingredients }).reduce(
              (prev, curr) => prev + curr + ", ",
              ""
            )}
            {"pris: " + salad.getPrice() + " kr"}

            </div>

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

        <div className="row text-white bg-primary border-primary mt-2 p-3 border rounded-3">
          Totalt:{" "}
          {shoppingCart.reduce((prev, curr) => prev + curr.getPrice(), 0)} kr
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;

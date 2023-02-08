import React from "react";

function SuccesfullOrder({ orderResult }) {
  return (
    <div className="container col-12">
      <div className="row h-100 p-5 bg-light border rounded-3 d-grid gap-3">
        <h2>Beställning: </h2>
        <ul className="list-group row">
          {orderResult.order.map((n) => (
            <li className="list-group-item" key={JSON.stringify(n)}>
              {n.join(', ')}
            </li>
          ))}
        </ul>
        <ul className="list-group row">
          <li className="list-group-item" key="status">
            Status: {orderResult.status ? "bekräftad" : "ej bekräftad"}
          </li>
          <li className="list-group-item" key="price">
            Pris: {orderResult.price} kr
          </li>
          <li className="list-group-item" key="id">
            Order ID: {orderResult.uuid}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SuccesfullOrder;

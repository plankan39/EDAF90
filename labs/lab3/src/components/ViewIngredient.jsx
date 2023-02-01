import React from "react";
import { useParams } from "react-router-dom";

function ViewIngredient({ inventory }) {
  let params = useParams();
  console.log(params.name);

  let ingredientProperties = Object.keys(inventory[params.name]).filter(
    (n) => inventory[params.name][n] === true
  );
  let price = inventory[params.name]["price"];

  return (
    <div>
      <h3>{params.name}</h3>
      <ul className="list-group col-2">
        {ingredientProperties.map((n) => (
          <li className="list-group-item" key={n}>
            {n}
          </li>
        ))}
        <li className="list-group-item" key="price">
          pris: {price} kr
        </li>
      </ul>
    </div>
  );
}

export default ViewIngredient;

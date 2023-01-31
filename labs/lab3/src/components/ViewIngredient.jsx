import React from "react";
import { useParams } from "react-router-dom";

function ViewIngredient({ inventory }) {
  let params = useParams();

  let ingredientProperties = Object.keys(
    inventory[params.name].filter((n) => inventory[params.name][n] === true)
  );
  let price = inventory[params.name]["price"];

  return (
    <div>
      <ul>
        <li key="price">price: {price}</li>
        {ingredientProperties.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  );
}

export default ViewIngredient;

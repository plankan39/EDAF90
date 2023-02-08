import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SelectCheckbox from "./formComponents/SelectCheckbox";
import Salad from "../model/Salad";
import SelectDropdown from "./formComponents/SelectDropDown";

function ComposeSalad({ inventory, shoppingCart, setShoppingCart }) {
  let extras = Object.keys(inventory).filter((item) => inventory[item].extra);
  let foundations = Object.keys(inventory).filter(
    (item) => inventory[item].foundation
  );
  let proteins = Object.keys(inventory).filter(
    (item) => inventory[item].protein
  );
  let dressings = Object.keys(inventory).filter(
    (item) => inventory[item].dressing
  );
  let nav = useNavigate();

  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [dressing, setDressing] = useState("");
  const [extra, setExtra] = useState({});
  const [formClass, setFormClass] = useState("d-grid gap-5");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormClass((n) => n + " was-validated");
    if (!e.target.checkValidity()) {
      return;
    }
    let extras = Object.keys(extra).filter((n) => extra[n]);
    let ingredients = [foundation, protein, ...extras, dressing];
    let salad = new Salad();

    ingredients.forEach((ingredient) =>
      salad.add(ingredient, inventory[ingredient])
    );
    setShoppingCart([...shoppingCart, salad]);
    resetChoices();
    nav("/view-order");
  };

  const resetChoices = function () {
    setFoundation("");
    setProtein("");
    setExtra({});
    setDressing("");
  };

  return (
    <div className="container ">
      <div className="row h-100 p-5 bg-light border rounded-3">
        <form
          className={formClass}
          onSubmit={handleSubmit}
          onReset={resetChoices}
          noValidate
        >
          <div className="row row-cols-1 row-cols-md-3">
            <div className="col">
              <h4>Välj bas: </h4>
              <SelectDropdown
                options={foundations}
                updateState={setFoundation}
                currentState={foundation}
              />
            </div>
            <div className="col">
              <h4> Välj protein: </h4>
              <SelectDropdown
                options={proteins}
                updateState={setProtein}
                currentState={protein}
              />
            </div>
            <div className="col">
              <h4>Välj dressing: </h4>
              <SelectDropdown
                options={dressings}
                updateState={setDressing}
                currentState={dressing}
              />
            </div>
          </div>
          <div className="row">
            <h4>Välj tillbehör: </h4>
            <SelectCheckbox
              options={extras}
              updateState={setExtra}
              currentState={extra}
            />
          </div>

          <div className="row gap-3 justify-content-md-center">
            <button
              className="btn col col-md-3 col-lg-2 btn-primary "
              type="submit"
            >
              Lägg till Sallad till varukorgen
            </button>
            <button
              className="btn col col-md-3 col-lg-2 btn-secondary "
              type="reset"
            >
              Börja om
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ComposeSalad;

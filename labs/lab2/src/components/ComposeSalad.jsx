import { useState } from "react";
import SelectRadio from "./formComponents/SelectRadio";
import SelectCheckbox from "./formComponents/SelectCheckbox";
import Salad from "../model/Salad";

function ComposeSalad({ inventory, setShoppingCart }) {
  let extraItems = Object.keys(inventory).filter(
    (item) => inventory[item].extra
  );
  let foundations = Object.keys(inventory).filter(
    (item) => inventory[item].foundation
  );
  let proteins = Object.keys(inventory).filter(
    (item) => inventory[item].protein
  );
  let dressings = Object.keys(inventory).filter(
    (item) => inventory[item].dressing
  );

  const [foundation, setFoundation] = useState(foundations[0]);
  const [protein, setProtein] = useState(proteins[0]);
  const [dressing, setDressing] = useState(dressings[0]);
  const [extras, setExtras] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let chosenExtras = Object.keys(extras).filter((n) => extras[n]);
    let salad = new Salad();

    chosenExtras.forEach((ingredient) =>
      salad.add(ingredient, inventory[ingredient])
    );

    salad
      .add(foundation, inventory[foundation])
      .add(protein, inventory[protein])
      .add(dressing, inventory[dressing]);

    setShoppingCart((shoppingCart) => [...shoppingCart, salad]);
    resetChoices();
  };

  const resetChoices = function () {
    setFoundation(foundations[0]);
    setProtein(proteins[0]);
    setExtras({});
    setDressing(dressings[0]);
  };

  return (
    <div className="container">
      <div className="row p-5 bg-light border rounded-3">
        <form
          // className="d-grid gap-3"
          onSubmit={handleSubmit}
          onReset={resetChoices}
        >
          <div className="">
            <h4>Välj bas: </h4>
            <SelectRadio
              name="foundation"
              options={foundations}
              updateState={setFoundation}
              currentState={foundation}
            />
            <div>Vald bas är: {foundation}</div>
          </div>
          <h4> Välj protein: </h4>
          <SelectRadio
            name="protein"
            options={proteins}
            updateState={setProtein}
            currentState={protein}
          />
          <div>Valt protein är: {protein}</div>
          <div>
            <h4>Välj tillbehör: </h4>
            <SelectCheckbox
              options={extraItems}
              updateState={setExtras}
              currentState={extras}
            />
            <div>
              Valda tillbehör är:{" "}
              {JSON.stringify(Object.keys(extras).filter((n) => extras[n]))}
            </div>
          </div>
          <div>
            <h4>Välj dressing: </h4>
            <SelectRadio
              name="dressing"
              options={dressings}
              updateState={setDressing}
              currentState={dressing}
            />
            <div>Vald dressing är: {dressing}</div>
          </div>
          <div className="row">
            <button className="btn col-5 btn-primary m-2" type="submit">
              Lägg till Sallad till varukorgen
            </button>
            <button className="btn col-5 btn-secondary m-2" type="reset">
              Börja om
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ComposeSalad;

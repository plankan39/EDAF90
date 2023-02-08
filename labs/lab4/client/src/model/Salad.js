import { v4 as uuidv4 } from "uuid";

export default class Salad {
  static #instanceCounter = 0;

  constructor(salad) {
    if (typeof salad === "string") {
      let json = JSON.parse(salad);
      this.ingredients = json.ingredients;
      this.uuid = json.uuid;
      this.id = json.id;
      return;
    }

    this.uuid = uuidv4();
    this.ingredients = {};

    Object.defineProperty(this, "id", {
      value: "salad_" + Salad.#instanceCounter++,
    });

    if (salad instanceof Salad) {
      this.ingredients = { ...salad.ingredients };
    }
  }

  add(name, properties) {
    this.ingredients[name] = properties;
    return this;
  }

  remove(name) {
    delete this.ingredients[name];
    return this;
  }

  getPrice() {
    return Object.values(this.ingredients).reduce(
      (previous, current) => previous + current.price,
      0
    );
  }
  count(prop) {
    return Object.values(this.ingredients).filter((item) => item[prop]).length;
  }
}

'use strict';
/**
 * Reflection question 1
 * your answer goes here
 */

const imported = require("./inventory.js");
const { v4: uuidv4 } = require('uuid');

console.log('Sallad: ' + imported.inventory['Sallad']);

console.log('\n\nObject.keys():')
let names = Object.keys(imported.inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => console.log(name));

console.log('\n\nfor ... in:')
for (const name in imported.inventory) {
  console.log(name);
}


function Person() {
  this.age = 0;
}
Person.prototype.birthday = function() { this.age++; };


let per = new Person();

console.log('\n\n Person')
console.log("\nfor..in");
for(let n in per){
    console.log(n +': ' + per[n] + ', is enum: ' + Object.propertyIsEnumerable(per[n]))
}

console.log("\no.keys");
Object.keys(per).forEach(name => console.log(name));


console.log('\n\nPerson2');

class Person2 {
  constructor(age) {
    this.age = age || 0;
  }

  birthday() {
    this.age++;
  }
}

let per2 = new Person2();

console.log("\nfor..in");
for(let n in per2){
    console.log(n +': ' + per2[n] + ', is enum: ' + Object.propertyIsEnumerable(per2[n]))
}


console.log("\no.keys()");

Object.keys(per2).forEach(name => console.log(name));
/**
 * Reflection question 2
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
    let keys = Object.keys(inv);
    let filtered_keys = keys.filter(item => inv[item][prop]);
    let price_pair = filtered_keys.map((key) => {return {name: key, price:inv[key].price}});
    let html_string = price_pair.reduce((previous, current) => {
        return previous + `<option value="${current.name}"> ${current.name}, ${current.price} kr</option>\n`
    }, "");
    return html_string; 
}

console.log(makeOptions(imported.inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
class Salad {
    static #instanceCounter = 0;
    constructor(salad) {
        if (typeof salad === 'string') {
            let json = JSON.parse(salad);
            this.ingridients = json.ingridients;
            this.uuid = json.uuid;
            this.id = json.id;
            return;
        }

        this.uuid = uuidv4();
        this.ingridients = {};
        
        Object.defineProperty(this, "id", {
            value: 'salad_' + Salad.#instanceCounter++
        });

        
        if (salad instanceof Salad) {
            this.ingridients = {...salad.ingridients}
        }

    }

    add(name, properties) {
        this.ingridients[name] = properties;
        return this;
    }

    remove(name) {
        delete this.ingridients[name];
        return this;
    }
}

let myCaesarSalad = new Salad()
  .add('Sallad', imported.inventory['Sallad'])
  .add('Kycklingfil??', imported.inventory['Kycklingfil??'])
  .add('Bacon', imported.inventory['Bacon'])
  .add('Krutonger', imported.inventory['Krutonger'])
  .add('Parmesan', imported.inventory['Parmesan'])
  .add('Ceasardressing', imported.inventory['Ceasardressing'])
  .add('Gurka', imported.inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad, undefined, 2) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad, undefined, 2) + '\n');


console.log('\n--- Assignment 3 ---------------------------------------')

Salad.prototype.getPrice = function () {
    return Object.values(this.ingridients).reduce((previous, current) => previous + current.price, 0);
}

Salad.prototype.count = function (prop) {
    return Object.values(this.ingridients).filter((item) => item[prop]).length
}
console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbeh??r');
// En ceasarsallad har 3 tillbeh??r


console.log('\n--- reflection question 3 ---------------------------------------')
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('Object.getPrototypeOf(myCesarSalad): ' + (Object.getPrototypeOf(myCaesarSalad)));
console.log('check 2: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));
console.log('Object.getPrototypeOf(Salad.prototype): ' + (Object.getPrototypeOf(Salad.prototype)));


console.log('\n--- Assignment 4 ---------------------------------------')

const objectCopy = new Salad(myCaesarSalad);
const json = JSON.stringify(myCaesarSalad);
const jsonCopy = new Salad(json);
console.log('myCesarSalad\n' + JSON.stringify(myCaesarSalad, undefined, 2) + '\n');
console.log('copy from object\n' + JSON.stringify(objectCopy, undefined, 2) + '\n');
console.log('copy from json\n' + JSON.stringify(jsonCopy, undefined, 2) + '\n');
console.log('originalet kostar kostar ' + myCaesarSalad.getPrice() + ' kr\n');
objectCopy.add('Gurka', imported.inventory['Gurka']);
console.log('copy from object + gurka \n' + JSON.stringify(objectCopy, undefined, 2) + '\n');
console.log('originalet kostar kostar ' + myCaesarSalad.getPrice() + ' kr\n');
console.log('med gurka kostar den ' + objectCopy.getPrice() + ' kr\n');

console.log('\n--- Assignment 5 ---------------------------------------')


class GourmetSalad extends Salad {
    constructor(salad) {
        super(salad);
    }

    add(name, properties, size) {
        let propCopy = {...properties, "size": (this.ingridients[name]?.size || 0) + (size || 1)};
        return super.add(name, propCopy);
    }

    getPrice() {
        return Object.values(this.ingridients).reduce(
            (previous, current) => previous + current.price * current.size, 0
        );
    }

}


let myGourmetSalad = new GourmetSalad()
  .add('Sallad', imported.inventory['Sallad'], 0.5)
  .add('Kycklingfil??', imported.inventory['Kycklingfil??'], 2)
  .add('Bacon', imported.inventory['Bacon'], 0.5)
  .add('Krutonger', imported.inventory['Krutonger'])
  .add('Parmesan', imported.inventory['Parmesan'], 2)
  .add('Ceasardressing', imported.inventory['Ceasardressing']);
console.log('Min sallad: ' + JSON.stringify(myGourmetSalad, undefined, 2));
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', imported.inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 6 ---------------------------------------')
console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);

/**
 * Reflection question 4
 */
/**
 * Reflection question 5
 */
/**
 * Reflection question 6
 */

# Install
Run `npm install` to download dependencies in package.json.

# Run
Run with `node lab1.js`

# Reflection question 1:

In most programming languages a complete record for each ingredient
would be used, for example: 
```{JavaScript}
{Sallad: {price: 10, 
        foundation: true, 
        protein: false, 
        extra: false, 
        dressing: 
        false, 
        vegan: true, 
        gluten:false, 
        lactose: false}
}
```
This is not the case in inventory.js, which is common when writing JavaScript code. Why don’t we
need to store properties with the value fale in the JavaScript objects?

If a property is not found within an object it is evaluated to `undefined` 
when trying to be read. Because of falsy characteristics `undefined === false`. 

# Reflection question 2: 
When will 
```{JavaScript}
let names = Object.keys(imported.inventory);
names.forEach(name => console.log(name));
```
give a different output than
```{JavaScript}
for (const name in imported.inventory) {
    console.log(name);
}
```
and why is inherited functions such as `sort()` not printed?

`for..in` iteration of js object iterates over enumerable properties both inherited and own.
`Object.keys()` fetches only own enumerable properties. The result will be different if there
are any inherited enumerable properties.
The function `sort()` is a prototype function from `Array`, it is not enumerable or is inherited 
__ask at lab!!__. 


# Reflection question 3: 
How are classes and inherited properties represented in JavaScript?
Classes are represented as functions. The functions have a property
called prototype which is an object including 

# Reflection question 4:
In which object are static properties stored?


# Reflection question 5:
Can you make the `id` property read only?

# Reflection question 6:
Can properties be private?



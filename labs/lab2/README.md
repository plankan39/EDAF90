## Reflection question 1

As an alternative to the function component you can use a class component:
`class ComposeSalad extends react.Component{}`. Is there a difference
between the class component and function components concerning features
(use cases where only one of them can be used.)

### **Answer:**

There are no feature differences but the focus on development seems to
be on **function components** and **hooks** rather than on methods in
`react.Component`.

## Reflection question 2

The render function must be a pure function of `props` and the component
**state**, the values returned by `useState()`. What happens if the output
of the render function is depending on other data that changes over time?

### **Answer:**

React optimizes how often and when parts of the **DOM** are re-rendered.
A component is only guaranteed to be re-rendered if the **state** or
the **props** of the component change. So even if data changes internally,
the change will not be rendered to the output if the render function is
dependent on other data that changes over time.

## Reflection question 3

```jsx
import { useState } from ’react’;

function ComposeSalad(props) {
  let foundations = Object.keys(props.inventory).filter(name =>
                                props.inventory[name].foundation);

  const [foundation, setFoundation] = useState(’Pasta’);
  const [extra, setExtra] = useState({Bacon: true, Fetaost: true});

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj bas</h2>
        {foundations.map(
          name => <div key={name} className="col-4">{name}</div>
          )
        }
      </div>
    </div>
  );
}

export default ComposeSalad;
```

In the code above, the `foundations` array is computed every time the
component is rendered. The inventory changes very infrequently.
Can you cache `foundations ` so it is only computed when
`props.inventory` changes?

### **Answer:**

It is possible to cache `foundations` by moving the computation of
it to the **parent component** and pass it in `props`. One could
make a **wrapper** component in the same file like:

```jsx
function ComposeSaladWrapper(props) {
  let foundations = Object.keys(props.inventory).filter(
    (name) => props.inventory[name].foundation
  );

  return <ComposeSalad foundations={foundations} />;
}

export default ComposeSaladWrapper;
```

## Reflection question 4

What triggers react to call the `render()` function and update
the **DOM**.

### **Answer**

When the **state** or the **props** of the component changes, it triggers a re-render.

## Reflection question 5

When the user change the html form state (DOM), does this change
the state of your component?

### **Answer**

No, not unless your event handling (`onClick`, `onChange`, etc...) updates the state.

## Reflection question 6

For a class based component, what is the value of `this` in the event handling call-back functions?

### **Answer**

Some part of the **DOM**. This means that you need to bind `this` in the call-back functions to the class based component if the state needs to be changed.

## Reflection question 7

How is the prototype chain affected when copying an object with 
`copy = {...sourceObject}`?

### **Answer**

The copy **does not** inherit the prototype of the source object.

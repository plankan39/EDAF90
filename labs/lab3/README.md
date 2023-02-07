## Reflection question 1

How do you replace the application icon, `favicon.ico`?

### **Answer:**

In the `index.html` file,
change the `href` to the new icon file. (`
    <link rel="icon" type="image/png" href="%PUBLIC_URL%/favicon.ico">
`)
## Reflection question 2

If you use `nav-pills` instead of `nav-tabs` the selected page is no longer highlighted in the menu, why? *Hint:* `<NavLink>` and the **active** css class.

### **Answer:**

In order to highlight the selected `<Link>` properly the `active` class needs to be added for both `nav-tabs` and `nav-pills`. The component `NavLink` solves this problem by keeping track if an item is active or not. 

Why is there any highlighting at all with `Link` in `nav-tabs` but not in `nav-pills`?

## Reflection question 3

What is the meaning of a leading `/` in a path, the difference between 

```jsx
<Link to="/view-ingredient/:name" />
```

and

```jsx
<Link to="view-ingredient/:name" />
```

### **Answer:**

Including the frontslash means that the path starts at the root directory while not including it means that children to the current directory that starts with `view-ingredient`will be matched.


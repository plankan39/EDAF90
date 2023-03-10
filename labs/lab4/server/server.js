const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { StatusCodes } = require('http-status-codes');

(function () {
  const port = 8080;
  const server = express();

  const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  };

  server.use(cors(corsOptions));
  server.use(express.json());

  server.listen(port, () => {
    console.log('salad bar REST Server is listening on port ' + port);
  });

  function getDetails(req, res, next, kind) {
    const obj = inventory[req.params.name];
    if(obj) {
      if(obj[kind]) {
        res.json(obj);
      } else {
        res.set('Content-Type', 'text/plain');
        res.status(StatusCodes.BAD_REQUEST).send(req.params.name + ' is not a ' + kind);
      }
    } else {
      res.set('Content-Type', 'text/plain');
      res.status(StatusCodes.NOT_FOUND).send('can not find ' + req.params.name);
    }
  }

  function handleOrder(req, res, next) {
    try { 
    const order = {
      status: 'confirmed',
      timestamp: new Date(),
      uuid: uuidv4(),
      price: 0,
      order: req.body
    };
    order.price = req.body.reduce(((acc, salad) => getSaladPrice(salad) + acc), 0);
    res.json(order);
    } catch (e) {
      res.set('Content-Type', 'text/plain');
      res.status(StatusCodes.NOT_FOUND).send(e);
    }
  }

  function getSaladPrice(list) {
    return list.reduce(((acc, ingredient) => acc + (inventory[ingredient]?.price) || throwError(ingredient)), 0)
  }
  function throwError(name){
    throw "can not find " + name;
  }
  function getList(req, res, next, kind) {
    let list = Object.keys(inventory).filter(name => inventory[name][kind]);
    res.json(list);
  }

  function addInventoryListener(server, kind) {
    server.get('/' + kind + 's', (req, res, next) => getList(req, res, next, kind));
    server.get('/' + kind + 's/', (req, res, next) => getList(req, res, next, kind));
    server.get('/' + kind + 's/:name', (req, res, next) => getDetails(req, res, next, kind));
  }

  addInventoryListener(server, 'foundation');
  addInventoryListener(server, 'protein');
  addInventoryListener(server, 'extra');
  addInventoryListener(server, 'dressing');
  server.post('/orders/', handleOrder);
  server.get("/", (req, res, next) =>
    res.json({try: req.hostname + ":" + port + req.originalUrl + "foundations"})
  );

  const inventory = {
    Sallad: {price: 10, foundation: true, vegan: true},
    Pasta: {price: 10, foundation: true, gluten: true},
    'Sallad + Pasta': {price: 10, foundation: true, gluten: true},
    'Sallad + Matvete': {price: 10, foundation: true, vegan: true, gluten: true},
    'Sallad + Glasnudlar': {price: 10, foundation: true, gluten: true},
    'Sallad + Quinoa': {price: 10, foundation: true, vegan: true},
  
    'Kycklingfil??': {price: 10, protein: true},
    'R??kt kalkonfil??': {price: 10, protein: true},
    'Norsk fjordlax': {price: 30, protein: true},
    'Handskalade r??kor fr??n Sm??gen': {price: 40, protein: true},
    'Pulled beef fr??n Sverige': {price: 15, protein: true},
    'Marinerad b??nmix': {price: 10, protein: true, vegan: true},
  
    Avocado: {price: 10, extra: true, vegan: true},
    Bacon: {price: 10, extra: true},
    'B??ngroddar': {price: 5, extra: true, vegan: true},
    'Cashewn??tter': {price: 5, extra: true, vegan: true},
    'Ch??vreost': {price: 15, extra: true, lactose: true},
    Fetaost: {price: 5, extra: true, lactose: true},
    'F??rsk koriander': {price: 10, extra: true, vegan: true},
    Gurka: {price: 5, extra: true, vegan: true},
    'Inlagd l??k': {price: 5, extra: true, vegan: true},
    Jalapeno: {price: 5, extra: true, vegan: true},
    'Krossade jordn??tter': {price: 5, extra: true, vegan: true},
    Krutonger: {price: 5, extra: true, gluten: true},
    'K??rsb??rstomater': {price: 5, extra: true, vegan: true},
    Lime: {price: 5, extra: true, vegan: true},
    Majs: {price: 5, extra: true, vegan: true},
    Oliver: {price: 5, extra: true, vegan: true},
    Paprika: {price: 5, extra: true, vegan: true},
    Parmesan: {price: 5, extra: true, lactose: true},
    'Rivna mor??tter': {price: 5, extra: true, vegan: true},
    'Rostade sesamfr??n': {price: 5, extra: true, vegan: true},
    Ruccola: {price: 5, extra: true, vegan: true},
    'R??dl??k': {price: 5, extra: true, vegan: true},
    'Sojab??nor': {price: 5, extra: true, vegan: true},
    'Soltorkad tomat': {price: 5, extra: true, vegan: true},
    Tomat: {price: 5, extra: true, vegan: true},
    'Valn??tter': {price: 5, extra: true, vegan: true},
    '??gg': {price: 5, extra: true},
  
    Ceasardressing: {price: 5, dressing: true, lactose: true},
    Dillmayo: {price: 5, dressing: true},
    Honungsdijon: {price: 5, dressing: true, vegan: true},
    Kimchimayo: {price: 5, dressing: true},
    Pesto: {price: 5, dressing: true, lactose: true},
    Rhodeisland: {price: 5, dressing: true, lactose: true},
    'Rostad aioli': {price: 5, dressing: true},
    'Sojavin??grett': {price: 5, dressing: true, vegan: true},
    '??rtvin??grett': {price: 5, dressing: true, vegan: true},
  };
  }) ();

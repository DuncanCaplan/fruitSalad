require("dotenv").config();

const express = require("express");
const fruits = require("./fruits.js");
const app = express();
const port = process.env.PORT;
const cors = require("cors");

const ids = fruits.map((fruit) => fruit.id);
let maxId = Math.max(...ids);

app.use(cors());
app.use("/fruits", express.json());

const doesFruitExist = (newFruit, fruits) => {
  return fruits.some(
    (fruit) => fruit.name.toLowerCase() === newFruit.name.toLowerCase()
  );
};

app.get("/", (req, res) => {
  res.send("Hello fruity!");
});

app.get("/fruits", (req, res) => {
  res.send(fruits);
});

app.get("/fruits/:name", (req, res) => {
  const name = req.params.name.toLowerCase(); // ASK SERGIE
  const fruit = fruits.find((fruit) => fruit.name.toLowerCase() === name);
  if (fruit === undefined) {
    res.status(404).send("The fruit doesn't exist");
  } else {
    res.send(fruit);
  }
});

app.post("/fruits", (req, res) => {
  const fruit = req.body;
  if (doesFruitExist(fruit, fruits)) {
    res.send("Fruit already exists");
  } else {
    maxId += 1;
    req.body.id = maxId;
    fruits.push(fruit);
    res.send("New fruit created");
  }
  console.log(fruit);
});

app.delete("/fruits/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const fruitIndex = fruits.findIndex(
    (fruit) => fruit.name.toLowerCase() == name
  );
  if (fruitIndex == -1) {
    res.status(404).send("The fruit doesn't exist");
  } else {
    fruits.splice(fruitIndex, 1); // Find fruidIndex, remove 1 value at that index
    res.sendStatus(204);
  }
});

app.listen(port, () => console.log(`App running on port: ${port}`));

/*
app.post("/fruits", (req, res) => {
  const fruit = fruits.find((fruit) => fruit.name.toLowerCase === req.body.name.toLowerCase);
  if(fruit != undefined){
    res.status(409).send("The fruit already exists")
  } else {
    maxId += 1;
    req.body.id = maxId;
    fruits.push(req.body);
    res.status(201).send(req.body)
  }
})

/*const http = require("http"); // allows for http server creation
const port = 3000;

const server = http.createServer((req, res) => {
  // takes a server which takes two parameters, a request (req), res is resolution
  res.setHeader("Content-Type", "text/html"); // tells the browser to display the image, instead of the link
  res.end("<img src='https://pbs.twimg.com/media/Dj8XlmjV4AEzsvr.jpg'>");
});

server.listen(port, () => console.log(`App is running on port ${port}`)); // 3000 is port number


const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // "get" means user will get information
  res.send("Hello World");
});

app.get("/penguins", (req, res) => {
  // creates an endpoint
  //res.status(204).send();
  res.send("Here are the penguins");
});

app.get("/penguins/:name", (req, res) => {
  // ":name" is a dynamic parameter, gets passed in "params"
  //res.send(req.params);
  res.send(req.query);
});

app.listen(port, () => console.log("App running on port ${port}")); // "listen to this port, and run it there"
*/

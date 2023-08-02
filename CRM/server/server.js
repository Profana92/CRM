const express = require("express");
const MiniSearch = require("minisearch");
const app = express();

const port = 3000;
const fs = require("fs");
const marketsData = Object.values(JSON.parse(fs.readFileSync("./server/data/marketsData.json")));
const tasksData = Object.values(JSON.parse(fs.readFileSync("./server/data/usersTasks.json")));
const usersData = Object.values(JSON.parse(fs.readFileSync("./server/data/usersData.json")));
const productsData = Object.values(JSON.parse(fs.readFileSync("./server/data/productsData.json")));
const notificationsData = Object.values(JSON.parse(fs.readFileSync("./server/data/notificationsData.json")));
app.use(express.json());
let miniSearch = new MiniSearch({
  fields: ["title"], // fields to index for full-text search
  storeFields: ["title"], // fields to return with search results
});
miniSearch.addAll(productsData);

app.get("/api/tasks", (req, res) => {
  res.send(tasksData);
});
app.post("/api/products", (req, res) => {
  console.log(req.body);
  let results = miniSearch.search(req.body.title, { prefix: true });
  console.log(results);
  res.send(results);
});
app.get("/api/notifications", (req, res) => {
  res.send(notificationsData);
});
// Markets data
app.get("/api/markets", (req, res) => {
  res.send(marketsData);
});

//login form
app.get("/api/userdata", (req, res) => {
  let result;
  if (usersData.find((x) => x.username === req.query.username && x.password === req.query.password)) {
    result = usersData.find((x) => x.username === req.query.username);
    result.logged_in = true;
  } else {
    result = { username: undefined, password: undefined, firstname: undefined, lastName: undefined, position: undefined };
    result.logged_in = false;
  }

  console.log("wynik:", result);
  console.log("req", req.query);
  res.send({
    userData: {
      id: result.id,
      username: result.username,
      firstname: result.firstname,
      lastName: result.lastName,
      position: result.position,
      picture: result.picture,
      market: result.market,
    },
    logged_in: result.logged_in,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

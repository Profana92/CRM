const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const basicAuth = require("express-basic-auth");
const data = Object.values(JSON.parse(fs.readFileSync("./server/customersData.json")));

const users = [{ username: "Admin19/", password: "Admin19/", firstname: "John", lastName: "Doe", position: "Sales Team Manager" }];

app.get("/api", (req, res) => {
  res.send(data);
});
app.get("/userdata", (req, res) => {
  let result;
  if (users.find((x) => x.username === req.query.username) && users.find((x) => x.password === req.query.password)) {
    result = users.find((x) => x.username === req.query.username);
    result.logged_in = true;
  } else {
    result = { username: undefined, password: undefined, firstname: undefined, lastName: undefined, position: undefined };
    result.logged_in = false;
  }

  console.log(req.query);
  console.log("wynik:", result);
  res.send({
    userData: { username: result.username, firstname: result.firstname, lastName: result.lastName, position: result.position },
    logged_in: result.logged_in,
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

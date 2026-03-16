const express = require("express");
const app = express();

const port = process.env.APP_PORT;
const appURL = process.env.APP_URL + `:${port}`;

// IMPORTS

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.json());

//! TEST ROUTE
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ROUTERS

// ERROR HANDLERS

// LISTENER
app.listen(port, () => {
  console.log(`Server listening on ${appURL}`);
});

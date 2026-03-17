const express = require("express");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const port = process.env.APP_PORT;
const appURL = process.env.APP_URL + `:${port}`;

// IMPORTS
const moviesRouter = require("./routers/movies");

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.json());

//! TEST ROUTE
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ROUTERS
app.use("/movies", moviesRouter);

// ERROR HANDLERS
app.use(notFound);
app.use(errorHandler);

// LISTENER
app.listen(port, () => {
  console.log(`Server listening on ${appURL}`);
});

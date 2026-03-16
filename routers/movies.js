const express = require("express");
const router = express.Router();

const connection = require("../data/db");

//? INDEX
router.get("/", (req, res) => {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database query failed",
        status: false,
      });
    }

    const responseData = {
      result: results,
      message: "Movies List",
      status: true,
    };

    res.json(responseData);
  });
});

//? SHOW
router.get("/:id", (req, res) => {
  const requestID = parseInt(req.params.id);
  const moviesSQL = `
    SELECT * FROM movies
    WHERE id = ?
    `;

  const reviewsSQL = `
    SELECT * FROM reviews
    WHERE movie_id = ?
  `;

  connection.query(moviesSQL, [requestID], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database query failed",
        status: false,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Movie not found!",
        status: false,
      });
    }

    const movie = results;

    connection.query(reviewsSQL, [requestID], (err, reviewsResults) => {
      movie[0].reviews = reviewsResults;

      const responseData = {
        result: results,
        message: `Movie Details ${requestID}`,
        status: true,
      };
      res.json(responseData);
    });
  });
});

//? STORE
router.post("/", (req, res) => {
  res.send("WIP");
});

//? UPDATE
router.put("/", (req, res) => {
  res.send("WIP");
});

//? MODIFY
router.patch("/", (req, res) => {
  res.send("WIP");
});

//? DESTROY
router.delete("/", (req, res) => {
  res.send("WIP");
});

module.exports = router;

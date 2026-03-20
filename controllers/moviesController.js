const express = require("express");
const router = express.Router();

const connection = require("../data/db");

//? INDEX
const index = (req, res) => {
  const sql = `
  SELECT 
	  movies.*,
    AVG(reviews.vote) avg_vote
  FROM movies
  INNER JOIN reviews
  ON movies.id = reviews.movie_id
  GROUP BY movies.id`;

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database query failed",
        status: false,
      });
    }

    const responseData = {
      result: results.map(responseImagePath),
      message: "Movies List",
      status: true,
    };

    res.json(responseData);
  });
};

//? SHOW
const show = (req, res) => {
  const requestID = parseInt(req.params.id);
  const moviesSQL = `
    SELECT * FROM movies
    WHERE id = ?
    `;

  const reviewsSQL = `
    SELECT * FROM reviews
    WHERE movie_id = ?
    ORDER BY created_at ASC
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
        result: responseImagePath(results[0]),
        message: `Movie Details ${requestID}`,
        status: true,
      };
      res.json(responseData);
    });
  });
};

//? STORE REVIEW
const storeReview = (req, res) => {
  const requestID = parseInt(req.params.id);
  const { name, vote, text } = req.body;

  const sql = `
    INSERT INTO reviews (movie_id, name, vote, text)
    VALUES (?, ?, ?, ?);

    `;

  connection.query(sql, [requestID, name, vote, text], (err, result) => {
    console.log(result.insertId);

    const showReviewSQL = `
    SELECT * 
    from reviews
    WHERE id = ?
    `;

    connection.query(showReviewSQL, [result.insertId], (err, result) => {
      res.send(result);
    });
  });
};

//? STORE
const store = (req, res) => {
  res.send("WIP");
};

//? UPDATE
const update = (req, res) => {
  res.send("WIP");
};

//? MODIFY
const modify = (req, res) => {
  res.send("WIP");
};

//? DESTROY
const destroy = (req, res) => {
  res.send("WIP");
};

const responseImagePath = (movie) => {
  const image = movie.image;
  const imagePath =
    process.env.APP_URL + ":" + process.env.APP_PORT + "/movies_cover/" + image;
  return { ...movie, image: imagePath };
};

module.exports = { index, show, storeReview, store, update, modify, destroy };

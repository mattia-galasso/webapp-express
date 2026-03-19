const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

//? INDEX
router.get("/", moviesController.index);

//? SHOW
router.get("/:id", moviesController.show);

//? STORE REVIEW
router.post("/:id/review", moviesController.storeReview);

//? STORE
router.post("/", moviesController.store);

//? UPDATE
router.put("/:id", moviesController.update);

//? MODIFY
router.patch("/:id", moviesController.modify);

//? DESTROY
router.delete("/:id", moviesController.destroy);

module.exports = router;

const express = require("express");
const router = express.Router();
const Movies = require("../controllers/movies.controller");
const indetifier = require("../middlewares/indetifier.middleware");

router.get("/top_rated", indetifier, Movies.getAllMovies);
router.get("/popular", indetifier, Movies.popMovie);
router.get("/popular", indetifier, Movies.popMovie);
router.get("/search", indetifier, Movies.searchMovie);

module.exports = router;

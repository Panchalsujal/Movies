const express = require("express");
const router = express.Router();
const Movies = require("../controllers/trending.movie.controller");
const indetifier = require("../middlewares/indetifier.middleware");

router.get("/day", indetifier, Movies.trendingDay);
router.get("/week", indetifier, Movies.trendingWeek);

module.exports = router;

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/auth.routes");
const movies = require("../src/routes/movie.routes");
const Daymovies = require("../src/routes/trending.routes");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // if you’re sending cookies
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth/", router);
app.use("/movies/", movies);
app.use("/trending/movies/", Daymovies);
module.exports = app;

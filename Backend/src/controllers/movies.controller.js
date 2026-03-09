const axios = require("axios");
const API_KEY = process.env.TMBD_API_PRI;
const api = axios.create({
  baseURL: process.env.MOVIE_BASE,
  withCredentials: true,
});

async function getAllMovies(req, res) {
  try {
    const user = req.user; // no await needed
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }
    const response = await api.get(
      `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    );

    const movies = response.data.results;
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ message: "Movies not found" });
  }
}

async function popMovie(req, res) {
  try {
    const user = req.user; // no await needed
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }
    const response = await api.get(
      `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    );
    const movies = response.data.results;
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ message: "Movies not found" });
  }
}

async function searchMovie(req, res) {
  try {
    const user = req.user; // no await needed
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }
    const { query } = req.query; // ?query=batman
    if (!query)
      return res.status(400).json({ message: "Query parameter is required" });

    const response = await api.get(
      `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1&include_adult=false`,
    );

    res.status(200).json(response.data.results);
  } catch (error) {
    console.error("Error searching movies:", error.message);
    res.status(500).json({ message: "Search failed" });
  }
}

module.exports = {
  getAllMovies,
  popMovie,
  searchMovie,
};

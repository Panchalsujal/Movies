const axios = require("axios");
const API_KEY = process.env.TMBD_API_PRI;
const api = axios.create({
  baseURL: process.env.MOVIE_BASE,
  withCredentials: true,
});

async function trendingDay(req, res) {
  try {
    const user = req.user; // no await needed
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }
    const response = await api.get(`/trending/movie/day?api_key=${API_KEY}`);
    const movies = response.data.results;
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ message: "Movies not found" });
  }
}
async function trendingWeek(req, res) {
  try {
    const user = req.user; // no await needed
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }
    const response = await api.get(`/trending/movie/week?api_key=${API_KEY}`);
    const movies = response.data.results;
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ message: "Movies not found" });
  }
}

module.exports = {
  trendingDay,
  trendingWeek,
};

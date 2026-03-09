const rateLimit = require("express-rate-limit");

const registerLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: { message: "Too many register attempts. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: { message: "Too many login attempts. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  registerLimiter,
  loginLimiter,
};

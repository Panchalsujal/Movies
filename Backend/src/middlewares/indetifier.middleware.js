const jwt = require("jsonwebtoken");

async function indetifier(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        message: "Token not Found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error.message);

    // handle expired or invalid token
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = indetifier;

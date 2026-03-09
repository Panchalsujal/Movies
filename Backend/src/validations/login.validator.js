const { body, validationResult } = require("express-validator");

const Validate = (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    return next();
  }

  res.status(400).json({
    errors: error.array(),
  });
};

const authValidataion = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be 3-30 characters long")
    .matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{2,29}$/)
    .withMessage(
      "Username can contain letters, numbers, underscore and dot only",
    ),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must contain uppercase, lowercase, number and symbol",
    ),
  Validate,
];

module.exports = authValidataion;

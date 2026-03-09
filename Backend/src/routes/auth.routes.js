const express = require("express");
const router = express.Router();
const authControl = require("../controllers/auth.controller");
const registerValidataion = require("../validations/Register.validator");
const loginValidataion = require("../validations/Login.validator");
const rateLimit = require("../middlewares/rateLimit.middleware");
const identifyUser = require("../middlewares/indetifier.middleware");

router.post(
  "/register",
  rateLimit.registerLimiter,
  registerValidataion,
  authControl.controlRegister,
);
router.post(
  "/login",
  rateLimit.loginLimiter,
  loginValidataion,
  authControl.controlLogin,
);

router.get("/me", identifyUser, authControl.getme);

module.exports = router;

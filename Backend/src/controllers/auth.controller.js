const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function controlRegister(req, res) {
  try {
    const { username, email, password, role } = req.body;
    const isUserExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserExists) {
      return res.status(409).json({
        message: "User is already exists",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username: username.trim(),
      email: email.toLowerCase(),
      password: hash,
      role: role,
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "user registration successfull",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}
async function controlLogin(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await userModel
      .findOne({
        $or: [{ username }, { email }],
      })
      .select("+password");

    if (!user) {
      return res.status(400).json({
        message: "User not Found",
      });
    }

    const isPasswordVaild = await bcrypt.compare(password, user.password);

    if (!isPasswordVaild) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User Login successfull",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}

async function getme(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    res.status(200).json({
      message: "User found",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}

module.exports = {
  controlRegister,
  controlLogin,
  getme,
};

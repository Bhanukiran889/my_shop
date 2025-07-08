const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const role = email === "admin@shop.com" ? "admin" : "customer";

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "User registered", role });
  } catch (error) {
    res.status(500).json({ error: "User already exists or DB error" });
  }
});

// Login and set token in cookie
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set the token in cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production", // set true on render
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ role: user.role }); // Send role separately
  } catch (error) {
    res.status(500).json({ error: "Login error" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out" });
});

// Get current user info from cookie
router.get("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ role: decoded.role });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;

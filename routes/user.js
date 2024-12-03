const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../schema/user.schema");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
dotenv.config();

/***********************Register Code *************************** */

router.post("/register", async (req, res) => {
  try {
    let country = "";
    let gender = "";
    const { name, phone, email, password } = req.body;

    const ifUserExists = await User.findOne({ email });
    if (ifUserExists) {
      return res.status(400).json({ message: "User Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      country,
      gender,
    });
    await user.save();
    res.status(201).json({ message: "User Registered successfully" });
  } catch (e) {
    return res.status(400).json({ message: "error" });
  }
});

/***********************Login Code *************************** */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const ifUserExists = await User.findOne({ email });

    if (!ifUserExists) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      ifUserExists.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const payload = { id: ifUserExists._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

/*********************GET USER************* */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { user } = req;
    const userdata = await User.findById(user);
    res.status(200).json({ userdata });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/*********************GET all users************* */
router.get("/", authMiddleware, async (req, res) => {
  try {
    let { user } = req;
    const userdata = await User.findById(user).select(`-password -__v`);
    res.status(200).json({ userdata });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
module.exports = router;

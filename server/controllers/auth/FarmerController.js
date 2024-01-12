const Farmer = require("../../models/Farmer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

module.exports.register = async (req, res) => {
  try {
    const existingEmail = await Farmer.findOne({ email: req.body.email });
    const existingUsername = await Farmer.findOne({
      username: req.body.username,
    });

    if (existingEmail && existingUsername) {
      return res
        .status(400)
        .json({
          message: "Email and username already exist.",
          code: "EMAIL_USERNAME_EXISTS",
        });
    } else if (existingEmail) {
      return res
        .status(400)
        .json({ message: "Email already exists.", code: "EMAIL_EXISTS" });
    } else if (existingUsername) {
      return res
        .status(400)
        .json({ message: "Username already exists.", code: "USERNAME_EXISTS" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newFarmer = new Farmer({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });
    await newFarmer.save();
    const jwttoken = jwt.sign({ userId: newFarmer._id }, secretKey);
    res.status(201).json({
      message: "Registration Successful.",
      user: newFarmer,
      token: jwttoken,
    });
  } catch (error) {
    res
      .status(500)
      .json({ err: "User registration failed.", message: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const farmer = await Farmer.findOne({ email });

    if (!farmer) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, farmer.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and sign a JWT token upon successful authentication
    const jwttoken = jwt.sign({ userId: farmer._id }, secretKey);

    res
      .status(200)
      .json({ message: "Login successful", farmer: farmer, token: jwttoken });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

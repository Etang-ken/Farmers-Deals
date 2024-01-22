const Farmer = require("../../models/Farmer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const secretKey = process.env.JWT_SECRET;

console.log(process.env.BASE_URL)
module.exports.register = async (req, res) => {
  try {
    const existingEmail = await Farmer.findOne({ email: req.body.email });
    const existingUsername = await Farmer.findOne({
      username: req.body.username,
    });

    if (existingEmail && existingUsername) {
      return res.status(400).json({
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

    const jwttoken = jwt.sign({ userId: farmer._id }, secretKey);
    res
      .status(200)
      .json({ message: "Login successful", farmer: farmer, token: jwttoken });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const farmer = await Farmer.findById(userId).select('-password');
    let imageUrl = null;
    if (farmer.image) {
      imageUrl = `${process.env.BASE_URL}/uploads/profiles/${farmer.image}`;
    }
    res.status(200).json({
      message: "success getting user data",
      farmer: { ...farmer.toObject(), imageUrl: imageUrl },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting user", error: error.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reqBody = req.body;
    const existingFarmer = await Farmer.findById(userId).select('-password');
    if (existingFarmer && existingFarmer.image && req.file) {
      const imagePath = path.resolve(
        __dirname,
        "../../uploads/profiles",
        existingFarmer.image
      );
      console.log(imagePath);
      fs.unlinkSync(imagePath);
    }

    const dataToUpdate = {
      email: reqBody.email,
      firstName: reqBody.firstName,
      lastName: reqBody.lastName,
      phoneNumber: reqBody.phone,
      gender: reqBody.gender,
      city: reqBody.city,
      region: reqBody.region,
      location: reqBody.location,
      language: reqBody.language,
      about: reqBody.about,
      image: req.file ? req.file.filename : undefined,
    };
    const farmer = await Farmer.findByIdAndUpdate(
      userId,
      {
        $set: dataToUpdate,
      },
      { new: true }
    );

    let imageUrl = null;
    if (farmer.image) {
      imageUrl = `${process.env.BASE_URL}/uploads/profiles/${farmer.image}`;
    }
    res
      .status(200)
      .json({
        message: "User updated successfully.",
        farmer: { ...farmer.toObject(), imageUrl: imageUrl },
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user data.", error: error });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;

    const user = await Farmer.findById(userId);
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Farmer.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error changing password.', error: error.message });
  }
};
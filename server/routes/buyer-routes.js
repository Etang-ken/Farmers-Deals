const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer = require("multer");
const userController = require("../controllers/auth/BuyerController");
const { storage } = require("../utils/functions");

const secretKey = process.env.JWT_SECRET;

function verifyJwtToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secretKey); // Replace with your actual secret key
    req.user = decoded; // Attach decoded user data to request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

const userStorage = storage("./uploads/profiles", "user");
const userUpload = multer({ storage: userStorage });

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/", verifyJwtToken, userController.getUser);

router.post(
  "/update",
  verifyJwtToken,
  userUpload.single("image"),
  userController.updateUser
);
router.post("/change-password", verifyJwtToken, userController.changePassword);

module.exports = router;

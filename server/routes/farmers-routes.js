const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require('path')
const fs = require('fs');
const router = express.Router();
const productControlller = require("../controllers/ProductController");
const userController = require("../controllers/auth/FarmerController");

const secretKey = process.env.JWT_SECRET;

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/profile");
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}${ext}`);
//   },
// });

const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationFolder = "./uploads/profile";
    
    // Create the folder if it doesn't exist
    createFolderIfNotExists(destinationFolder);

    cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `user_${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage });

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

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/product", verifyJwtToken, productControlller.postProduct);
router.get("/", verifyJwtToken, userController.getUser);
router.post(
  "/update",
  verifyJwtToken,
  upload.single("image"),
  userController.updateUser
);
router.post("/change-password", verifyJwtToken, userController.changePassword);

module.exports = router;

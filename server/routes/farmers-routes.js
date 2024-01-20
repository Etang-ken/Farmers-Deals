const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const productControlller = require("../controllers/ProductController");
const userController = require("../controllers/auth/FarmerController");
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

// const createFolderIfNotExists = (folderPath) => {
//   if (!fs.existsSync(folderPath)) {
//     fs.mkdirSync(folderPath, { recursive: true });
//   }
// };

const userStorage = storage("./uploads/profiles", "user");

const productStorage = storage("./uploads/products", "product");

const otherProductImagesStorage = storage("./uploads/other_products", "other_product");

const userUpload = multer({ storage: userStorage });
const productUpload = multer({ storage: productStorage });
// const otherProductImageUpload = multer({ storage: otherProductImagesStorage });

router.post("/register", userController.register);
router.post("/login", userController.login);
// after auth
router.get("/", verifyJwtToken, userController.getUser);
router.post(
  "/update",
  verifyJwtToken,
  userUpload.single("image"),
  userController.updateUser
);
router.post("/change-password", verifyJwtToken, userController.changePassword);

//products
router.post(
  "/product/create",
  verifyJwtToken,
  productUpload.fields([{ name: 'product_image', maxCount: 1 }, { name: 'other_product_images', maxCount: 10 }]),
  // otherProductImageUpload.array("other_product_images", 10),
  productControlller.postProduct
);
router.get(
  "/product/all",
  verifyJwtToken,
  productControlller.getAll
);

module.exports = router;

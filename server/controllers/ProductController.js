const Product = require("../models/Product");
module.exports.postProduct = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId)
    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      farmer: userId
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create Product", message: error.message });
  }
};

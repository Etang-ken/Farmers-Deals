const Product = require("../models/Product");
const ProductImage = require("../models/ProductImage");
module.exports.postProduct = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reqBody = req.body;
    const newProduct = new Product({
      name: reqBody.name,
      category: reqBody.category,
      unitMeasurement: reqBody.unit_measurement,
      pricePerUnit: reqBody.price_per_unit,
      location: reqBody.location,
      description: reqBody.description,
      quantity: reqBody.quantity,
      dateHarvested: reqBody.date_harvested,
      image: req.files["product_image"][0].filename,
      farmer: userId,
    });

    await newProduct.save();
    if (req.files["other_product_images"]?.length > 0) {
      const otherProductImages = req.files["other_product_images"].map(
        (file) => ({
          product: newProduct._id,
          image: file.filename,
        })
      );
      await ProductImage.insertMany(otherProductImages);
      console.log(otherProductImages);
    }

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create Product", message: error.message });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const userId = req.user.userId;
    const products = await Product.find({ farmer: userId })
      .sort({ createdAt: -1 })
      .exec();
    const productsWithImageUrls = products.map((product) => {
      const imageUrl = `${process.env.BASE_URL}/uploads/products/${product.image}`;
      const productWithImageUrl = {
        ...product.toObject(), // Convert Mongoose document to plain JavaScript object
        imageUrl: imageUrl,
      };
      return productWithImageUrl;
    });
    res
      .status(200)
      .json({
        message: "Product fetched successfully",
        products: productsWithImageUrls,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get Products", message: error.message });
  }
};

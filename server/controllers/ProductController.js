const Product = require("../models/Product");
const ProductImage = require("../models/ProductImage");
const path = require("path");
const fs = require("fs");

const getAllProducts = async (userId) => {
  const products = await Product.find({ farmer: userId })
    .sort({ createdAt: -1 })
    .exec();
  const productsWithImageUrls = products.map((product) => {
    const imageUrl = `${process.env.BASE_URL}/uploads/products/${product.image}`;
    const productWithImageUrl = {
      ...product.toObject(),
      imageUrl: imageUrl,
    };
    return productWithImageUrl;
  });
  return productsWithImageUrls;
};

const deleteAllProductImages = async (imageToDelete) => {
  const prodImgIds = imageToDelete.replace(/\s/g, "").split(",");
  for (const imgId of prodImgIds) {
    const prodImg = await ProductImage.findById(imgId);
    const imagePath = path.resolve(
      __dirname,
      "../uploads/products",
      prodImg.image
    );
    fs.unlinkSync(imagePath);
    await ProductImage.findByIdAndDelete(imgId);
  }
};

const addProductImages = async (productImages, product_id) => {
  const otherProductImages = productImages["other_product_images"].map(
    (file) => ({
      product: product_id,
      image: file.filename,
    })
  );
  await ProductImage.insertMany(otherProductImages);
};
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
      addProductImages(req.files, newProduct._id);
    }

    const productsWithImageUrls = await getAllProducts(userId);
    res.status(201).json({
      message: "Product created successfully",
      products: productsWithImageUrls,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create Product", message: error.message });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reqBody = req.body;
    console.log(reqBody);
    let dataToUpdate = {
      name: reqBody.name,
      category: reqBody.category,
      unitMeasurement: reqBody.unit_measurement,
      pricePerUnit: reqBody.price_per_unit,
      location: reqBody.location,
      description: reqBody.description,
      quantity: reqBody.quantity > 0 ? reqBody.quantity : 0,
      dateHarvested: reqBody.date_harvested,
    };

    const existingProduct = await Product.findById(reqBody.product_id);
    if (req.files["product_image"]) {
      console.log(existingProduct);
      const imagePath = path.resolve(
        __dirname,
        "../uploads/products",
        existingProduct.image
      );
      console.log(imagePath);
      fs.unlinkSync(imagePath);
      dataToUpdate = {
        ...dataToUpdate,
        image: req.files["product_image"][0].filename,
      };
    }
    await Product.findByIdAndUpdate(reqBody.product_id, dataToUpdate, {
      new: true,
    });
    if (reqBody.images_to_delete) {
      deleteAllProductImages(reqBody.images_to_delete);
    }
    if (req.files["other_product_images"]?.length > 0) {
      addProductImages(req.files, existingProduct._id);
    }

    const productsWithImageUrls = await getAllProducts(userId);
    res.status(200).json({
      message: "Product Updated Successfully.",
      products: productsWithImageUrls,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productsWithImageUrls = await getAllProducts(userId);
    res.status(200).json({
      message: "Product fetched successfully",
      products: productsWithImageUrls,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get Products", message: error.message });
  }
};

module.exports.getImages = async (req, res) => {
  try {
    const productImages = await ProductImage.find({
      product: req.params.id,
    }).exec();
    const productImagesWithImageUrls = productImages.map((productImage) => {
      const imageUrl = `${process.env.BASE_URL}/uploads/products/${productImage.image}`;
      const productImageUrl = {
        ...productImage.toObject(),
        imageUrl: imageUrl,
      };
      return productImageUrl;
    });
    res.status(200).json({
      message: "Product fetched successfully",
      productImages: productImagesWithImageUrls,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get Products", message: error.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.body.product_id;
    const existingProduct = await Product.findById(productId);

    const productImages = await ProductImage.find({
      product: productId,
    }).exec();

    for (const productImage of productImages) {
      const imageId = productImage._id;
      const imagePath = path.resolve(
        __dirname,
        "../uploads/products",
        productImage.image
      );
      fs.unlinkSync(imagePath);
      await ProductImage.findByIdAndDelete(imageId);
    }
    const mainImagePath = path.resolve(
      __dirname,
      "../uploads/products",
      existingProduct.image
    );
    fs.unlinkSync(mainImagePath);
    await Product.findByIdAndDelete(productId);
    const allProducts = await getAllProducts(req.user.userId);
    res
      .status(200)
      .json({ message: "Product Deleted Successfully", products: allProducts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Deleting product.", error: error.message });
  }
};

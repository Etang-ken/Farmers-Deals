// const express = require('express');
const Product = require('../models/Product'); // Adjust the path as per your file structure

// POST endpoint for creating a new Product
module.exports.postProduct = async (req, res) => {
  try {
    // Create a new Product based on the incoming request body
    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price
      // Map other fields from the request body as needed
    });

    // Save the new Product to the database
    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
    // return res
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Product', message: error.message });
    // return res
  }
};

// export = postProduct;
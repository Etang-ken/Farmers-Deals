const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Add timestamps
  }
);

// Create the 'Deal' model using the schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;

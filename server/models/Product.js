const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    unitMeasurement: {
      type: String,
      required: true,
    },
    pricePerUnit: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: null
    },
    quantity: {
      type: Number,
      required: false,
      default: 0,
    },
    dateHarvested: {
      type: Date,
      required: false,
      default: null,
    },
    image: {
      type: String,
      required: true,
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
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

const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    region: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      required: false,
    },
    yearsOfFarmingExperience: {
      type: String,
      required: false,
    },
    productSupplyType: {
      type: String,
      required: false,
    },
    about: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Farmer = mongoose.model("Farmer", farmerSchema);

module.exports = Farmer;

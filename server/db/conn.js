const mongoose = require('mongoose');

// Function to establish the connection and return the connected database
const connectToDb = () => {
  return mongoose.connect('mongodb://127.0.0.1/farmer_deal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDb;
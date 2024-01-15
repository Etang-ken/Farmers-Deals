const mongoose = require('mongoose');

// Function to establish the connection and return the connected database
const connectToDb = () => {
  return mongoose.connect(`${process.env.DB_CONN}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDb;
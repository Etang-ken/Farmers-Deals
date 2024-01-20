const express = require('express');
const connectToDb = require('./db/conn')
const cors = require('cors');
const path = require("path")

const app = express();
const bodyParser = require('body-parser');
require('dotenv').config()
const port = 5000; // Choose any available port
const farmerRoutes = require('./routes/farmers-routes')
// console.log(__dirname)
app.use(cors())
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/', (req, res) => {
  res.send('Hello, welcome to your Node.js server!');
});

connectToDb()
  .then(() => {
    console.log('Database connected');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

    app.use('/farmer', farmerRoutes);
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
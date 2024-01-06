const express = require('express');
const connectToDb = require('./db/conn')
const app = express();
const bodyParser = require('body-parser');
const port = 5000; // Choose any available port
const farmerRoutes = require('./routes/parents-routes')

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello, welcome to your Node.js server!');
});

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// connectToDb

// app.use('/farmer', farmerRoutes)
connectToDb()
  .then(() => {
    console.log('Database connected');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

    // Use routes after the database connection is established
    app.use('/farmer', farmerRoutes);
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
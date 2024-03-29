// app.js

const express = require('express');
const bodyParser = require('body-parser'); // Import bodyParser to parse JSON request bodies
const db = require('./config/database');
const swaggerConfig = require('./config/swaggerConfig'); // Import the Swagger configuration
const app = express();
const PORT = process.env.PORT || 3000;
const route=require("./src/routes/authRoutes");
const dbConnection=require("./src/controllers/ConnectionDb");
// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Set up Swagger middleware
app.use('/api-docs', swaggerConfig.serve, swaggerConfig.setup);


// routes 
app.get("/", (req, res) => {
  res.send("a js working");
});

app.use("/api", route);


// Start the server

app.listen(PORT, async () => {
await dbConnection();
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');



// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();



// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/photos', require('./routes/photoRoutes'));
app.use('/api/contact', require('./routes/messageRoutes'));
app.use("/uploads", express.static("uploads"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to the database
connectDb();

// Initialize Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes

app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/auth',require('./routes/userRoutes'));
app.use('/api/v1/restaurant',require('./routes/restaurantRoutes'));
app.use('/api/v1/category',require('./routes/categoryRoutes'));
app.use('/api/v1/food',require('./routes/foodRoutes'));




// Default route

app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome to Food Server APP</h1>");
});

// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({
        message: "Route not found",
    });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.white.bgMagenta);
});

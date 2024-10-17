import express from 'express';  // ES module syntax
import dotenv from 'dotenv';    // Import dotenv
import morgan from 'morgan';
import { connectDB } from './config/db.js'; // Adjust the path as necessary
import authRoutes from './routes/authroute.js';

const app = express();

// Configure environment variables
dotenv.config();

// Connect to the database
connectDB();

// Middleware setup
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);

// Route definition
app.get('/', (req, res) => {
    res.send("<h1>Welcome</h1>");
});

// Define the port from environment variables or default to 8088
const PORT = process.env.PORT || 8088;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE || 'development'} mode on port ${PORT}`);
});

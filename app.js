// Import required modules and packages
const express = require('express'); // Import the Express.js framework
const userRoutes = require('./routes/userRoutes'); // Import user routes
const expenseRoutes = require('./routes/expenseRoutes'); // Import expense routes
const sequelize = require('./util/database'); // Import the Sequelize database instance
const bodyparser = require('body-parser'); // Import the body-parser middleware for parsing JSON request bodies
const cors = require('cors'); // Import the CORS middleware for handling Cross-Origin Resource Sharing

// Create an instance of the Express application
const app = express();

// Parse JSON request bodies
app.use(bodyparser.json());

// Enable CORS to allow cross-origin requests
app.use(cors());

// Define routes for handling user-related requests
app.use(userRoutes);

// Define routes for handling expense-related requests
app.use(expenseRoutes);

// Synchronize the Sequelize database with the defined models
sequelize.sync()
    .then((res) => {
        // Start the Express server on port 3000 once the database is synchronized
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => {
        console.log(err);
    });

// Import required modules and packages
const express = require('express'); // Import the Express.js framework
const controller = require('../controller/userController'); // Import the user controller

// Create a new Express Router instance
const router = express.Router();

// Define routes for user-related actions (sign up and login)
router.post('/signup', controller.signup); // Route for user registration
router.post('/login', controller.login); // Route for user login

// Export the router to make it available for use in other parts of your application
module.exports = router;

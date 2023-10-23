// Import required modules and packages
const express = require('express'); // Import the Express.js framework
const controller = require('../controller/expenseController'); // Import the expense controller

// Create a new Express Router instance
const router = express.Router();

// Define routes for expense-related actions
router.post('/expense/addexpense', controller.addexpense); // Route for adding an expense
router.get('/expense/getexpense', controller.getexpense); // Route for retrieving expenses
router.delete('/expense/delexpense/:id', controller.delexpense); // Route for deleting an expense by its ID

// Export the router to make it available for use in other parts of your application
module.exports = router;

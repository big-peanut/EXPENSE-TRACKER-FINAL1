// Import the Sequelize library
const Sequelize = require('sequelize');

// Create a new Sequelize instance and configure it to connect to a MySQL database
const sequelize = new Sequelize('expensetracker', 'root', '12345678', {
    dialect: 'mysql', // Specify the database type (in this case, MySQL)
    host: 'localhost' // Specify the database server's host (in this case, localhost)
});

// Export the configured Sequelize instance to make it available for use in other parts of your application
module.exports = sequelize;

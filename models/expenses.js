// Import the Sequelize library
const Sequelize = require('sequelize');

// Import the Sequelize instance configured for a database connection
const sequelize = require('../util/database');

// Define a Sequelize model for 'expenses' table
const Expenses = sequelize.define('expenses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Export the 'Expenses' model to make it available for use in other parts of your application
module.exports = Expenses;

// Import the Sequelize library
const Sequelize = require('sequelize');

// Import the Sequelize instance configured for database conection
const sequelize = require('../util/database');

// Define a Sequelize model for 'users' table
const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Export the 'Users' model to make it available for use in other parts of your application
module.exports = Users;

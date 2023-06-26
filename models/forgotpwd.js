const Sequelize = require('sequelize');
const sequelize = require('../util/database');



const forgotpassword = sequelize.define('forgotpassword', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    userID:Sequelize.INTEGER,
    isactive: Sequelize.BOOLEAN,
    
})

module.exports = forgotpassword;
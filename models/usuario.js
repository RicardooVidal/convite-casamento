const Sequelize = require('sequelize');
const database = require('../db');
 
const Usuario = database.define('usuario', {
    login: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true
    },
}, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // If don't want createdAt
        createdAt: false,
    
        // If don't want updatedAt
        updatedAt: false,
});
 
module.exports = Usuario;
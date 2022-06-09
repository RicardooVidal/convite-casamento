const Sequelize = require('sequelize');
const database = require('../db');
 
const Convidado = database.define('convidado', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    link: Sequelize.STRING,
    confirmacao: Sequelize.BOOLEAN
},{
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
});
 
module.exports = Convidado;
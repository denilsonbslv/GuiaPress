// Importando Sequelize e realizando a conexão com o bd
const Sequelize = require("sequelize");
const connection = require("../database/database");

// Criando Model User
const User = connection.define('users',{
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


// Exportando Model
module.exports = User;
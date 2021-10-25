// Importando Sequelize e realizando a conexão com o bd
const Sequelize = require("sequelize");
const connection = require("../database/database");

// Criando Model Categories
const Category = connection.define('categories',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Relacionamento feito no Model Articles

// Sincronizando Model com o banco de dados

// Exportando Model
module.exports = Category;
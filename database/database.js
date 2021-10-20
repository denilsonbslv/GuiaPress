// Importando Sequelize
const Sequelize = require('sequelize');

// Criando conexão com o banco
const connection = new Sequelize('guiapress', 'user', 'pass', {
    host: './database/sqlite/dev.sqlite',
    dialect: 'sqlite',
})

// Exportando conexão
module.exports = connection;
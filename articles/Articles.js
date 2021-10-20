// Importando Sequelize e realizando a conexão com o bd
const Sequelize = require("sequelize");
const connection = require("../database/database");

// Importando Model Category para poder fazer relação
const Category = require("./../categories/Category");

// Criando Model Categories
const Article = connection.define('articles',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Fazendo relação com o Model Category e visse versa
Category.hasMany(Article);   // Relacionamento: Uma categoria para muitos artigos; 1 para Muitos
Article.belongsTo(Category); // Relacionamento: Um artigo para uma categoria; 1 para 1

// Sincronizando Model com o banco de dados
Article.sync({force: false});

// Exportando Model
module.exports = Article;
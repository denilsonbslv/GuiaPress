// Importando express e criando uma istância
const express = require("express");
const app = express();

// Especifica em qual porta a aplicação vai rodar
const port = 8080;

// Carregando instancia do banco de dados
const connection = require("./database/database");

// Importando Controllers
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

// Conectando com o banco de dados
connection
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados OK");
    })
    .catch((msgErro) => {
        console.log("Erro ao conectar com o banco de dados: \n" + msgErro);
    });

// Configurando View Engine e a pasta Public como arquivos estaticos
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Configurando o "body-passer"
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Rotas
app.use("/", categoriesController);
app.use("/", articlesController);
app.get("/", (req, res) => {
    res.render("index");
});

// Iniciando aplicação
app.listen(port, () => {
    console.log("A aplicação está rodando na porta: " + port);
});
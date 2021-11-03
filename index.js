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

// Importando Models
const Category = require("./categories/Category");
const Article = require("./articles/Articles");

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

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
});

app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        });
    });
});

// Iniciando aplicação
app.listen(port, () => {
    console.log("A aplicação está rodando na porta: " + port);
});
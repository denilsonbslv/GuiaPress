const express = require("express");
const router = express.Router();

// Carregando o Slugify
const slugify = require("slugify");

// Importando o models
const Article = require("../articles/Articles");
const Category = require("../categories/Category");

router.get("/admin/articles", (req, res) => {
    res.send("Rota das artigos!");
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories});
    });
});

router.post("/admin/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
    Article.create({
        title: title,
        body: body,
        categoryId: category,
        slug: slugify(title)
    }).then(() => {
        res.redirect("/admin/articles/");
    });
});
// Exportando rotas
module.exports = router;
// Importando o express
const express = require("express");
const router = express.Router();

// Importando o modal Category
const Category = require("./Category");

// Carregando o Slugify
const slugify = require("slugify");

// Rotas
router.get("/admin/categories/new", (req, res) => { // Rota para criar uma categoria
    res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => { //Rota para salvar uma categoria
    var title = req.body.title;

    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories");
        });
    }else{
        res.redirect("/admin/categories/new");
    }
});

router.get("/admin/categories", (req, res) => { // Rota padrão da categoria
    Category.findAll({ raw: true, order:[
        ['id', 'ASC']
    ]}).then(categories => {
        res.render("admin/categories/index", {
            categories: categories
        });
    });
});

router.post("/admin/categories/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if (!isNaN(id)) {
            Category.destroy({ // Apagando uma linha por meio de um ID
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories");
            });
        }else{
            res.redirect("/admin/categories");
        }
    }else{
        res.redirect("/admin/categories");
    }
});

// Exportando rotas
module.exports = router;
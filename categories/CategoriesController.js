// Importando o express
const express = require("express");
const router = express.Router();

// Carregando middleware
const adminAuth = require("../midllewares/adminAuth");

// Importando o model Category
const Category = require("./Category");

// Carregando o Slugify
const slugify = require("slugify");

// Rotas
router.get("/admin/categories/new", adminAuth, (req, res) => { // Rota para criar uma categoria
    res.render("admin/categories/new");
});

router.post("/categories/save", adminAuth, (req, res) => { //Rota para salvar uma categoria
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

router.get("/admin/categories",  adminAuth, (req, res) => { // Rota padrão da categoria
    Category.findAll({ raw: true, order:[
        ['id', 'ASC']
    ]}).then(categories => {
        res.render("admin/categories/index", {
            categories: categories
        });
    });
});

router.post("/admin/categories/delete", adminAuth, (req, res) => {
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

router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        res.redirect("/admin/categories");
    }

    Category.findByPk(id).then(category => {
        if (category != undefined) {
            
            res.render("admin/categories/edit", {category: category});

        }else{
            res.redirect("/admin/categories");
        }
    }).catch(erro => {
        res.redirect("/admin/categories");
    });
});

router.post("/admin/categories/update", adminAuth, (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    if (id != undefined && title != undefined) {
        Category.update(
            {title: title, slug: slugify(title)},
            {where: {
                id: id
            }
        }).then(() => {
            res.redirect("/admin/categories");
        });
    }
});

// Exportando rotas
module.exports = router;
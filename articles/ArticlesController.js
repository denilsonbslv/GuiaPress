const express = require("express");
const router = express.Router();

// Carregando o Slugify
const slugify = require("slugify");

// Importando o models
const Article = require("../articles/Articles");
const Category = require("../categories/Category");

router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render("admin/articles/index", {articles: articles});
    });
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

router.post("/admin/articles/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if (!isNaN(id)) {
            Article.destroy({ // Apagando uma linha por meio de um ID
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            });
        }else{
            res.redirect("/admin/articles");
        }
    }else{
        res.redirect("/admin/articles");
    }
});

router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;
    console.log(id);

    if (isNaN(id)) {
        res.redirect("/admin/articles");
    }

    Article.findByPk(id).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                if (categories != undefined) {
                    res.render("admin/articles/edit", {article: article, categories: categories});
                }
            });
        }else{
            res.redirect("/admin/articles");
        }
    }).catch(erro => {
        res.redirect("/admin/articles");
    });
});

router.post("/admin/article/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var categoryId = req.body.category;

    if (id != undefined && title != undefined && body != undefined && categoryId != undefined) {
        Article.update(
            {title: title, slug: slugify(title), body: body, categoryId: categoryId},
            {where: {
                id: id
            }
        }).then(() => {
            res.redirect("/admin/articles");
        });
    }
});

router.get("/articles/page/:num", (req, res) => {
    var page = req.params.num;
    var offset = 0;

    if (isNaN(page) || page == 1 || page == 0) {
        offset = 0;
    }else{
        offset = (parseInt(page) - 1)  * 4;
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        var next;

        if (offset + 4 >= articles.count) {
            next = false;
        }else{
            next = true;
        }
        var result = {
            page: parseInt(page),
            next,
            articles: articles
        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page", {result: result, categories: categories});
        });
    });
});

// Exportando rotas
module.exports = router;
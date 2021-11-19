const express = require("express");
const router = express.Router();

// Carregando middleware
const adminAuth = require("../midllewares/adminAuth");

// Carregando o controller
const User = require("./User");

// Importando o BCryptJS
const bcrypt = require("bcryptjs");

// Rotas
router.get("/admin/users", adminAuth, (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {users});
    });
});

router.get("/admin/users/create", adminAuth, (req, res) => {
    res.render("admin/users/create");
});

router.post("/users/create", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email: email}}).then(userEmail => {
        if (userEmail == undefined) {
            
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch((err) => {
                res.redirect("/");
            });
        }else{
            res.redirect("/admin/users/create");
        }
    });

});

router.get("/login", (req, res) => {
    res.render("admin/users/login");
});

router.post("/authenticate", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {email: email}
    }).then(user => {
        if (user != undefined) {
            // Validar senha
            var correct = bcrypt.compareSync(password, user.password);

            if (correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }

                res.json(req.session.user);
            }else{
                res.redirect("/login");    
            }
        }else{
            res.redirect("/login");
        }
    });
});

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
});

// Exportando rotas
module.exports = router;
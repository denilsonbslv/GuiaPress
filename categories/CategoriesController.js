// Importando o express
const express = require("express");
const router = express.Router();

// Rotas
router.get("/category", (req, res) => {
    res.send("Rota das categorias!");
});

// Exportando rotas
module.exports = router;
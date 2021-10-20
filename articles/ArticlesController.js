const express = require("express");
const router = express.Router();

router.get("/articles", (req, res) => {
    res.send("Rota das artigos!");
});

// Exportando rotas
module.exports = router;
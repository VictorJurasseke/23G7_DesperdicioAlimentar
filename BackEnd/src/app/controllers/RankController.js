const express = require('express');
const rotas = express.Router();
const model = require("../../app/models/RankModel");
const verificarToken = require('../middleware/autenticar')



//Retorna o rank do jogo atual
rotas.get('/', verificarToken, async (req, res) => {

    try {
        const rank = await model.retornarRank();
        res.json(rank);
    } catch (error) {
        console.error("Erro ao listar os jogos", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

module.exports = rotas
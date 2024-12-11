const express = require('express');
const rotas = express.Router();
const model = require("../../app/models/RelatorioModel");
const verificarToken = require('../middleware/autenticar')


{/* Buscar emm todos jogos a soma de todos os pesos acumulados em cada turma, devolver um array com todas as turmas, o peso de total de cada uma, e a escola */}
rotas.get('/', verificarToken, async (req, res) => {
   
    try {
        const TotalAnual = await model.retornarTotalAnual();
        res.json(TotalAnual);
    } catch (error) {
        console.error("Erro ao listar os jogos", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

{/* Buscar emm todos jogos a soma de todos os pesos acumulados em cada turma, devolver um array com todas as turmas, o peso de total de cada uma, e a escola */}
rotas.get('/Temporadas', verificarToken, async (req, res) => {
   
    try {
        const TotalTemporadas = await model.retornarTotalTemporadas();
        res.json(TotalTemporadas);
    } catch (error) {
        console.error("Erro ao listar os jogos", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});



module.exports = rotas;

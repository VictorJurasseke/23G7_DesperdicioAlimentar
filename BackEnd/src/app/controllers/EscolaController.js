const express = require('express');
const rotas = express.Router();
const model = require("../../app/models/EscolaModel");
const verificarToken = require('../middleware/autenticar')


rotas.get('/', verificarToken, async (req, res) => {
    console.log("Requisição recebida em /api/escola para listar"); // Log
    try {
        const escola = await model.retornarTodosEscola();
        res.json(escola);
        console.log(escola)
    } catch (error) {
        console.error("Erro ao listar todas as escolas", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});


rotas.delete('/:id', verificarToken, async (req, res) => {
    const {id} = req.params
    console.log(id)
    console.log(`Requisição delete em /api/escola/${id}`); // Log
    try {
        const escola = await model.ApagarEscola(id);
        res.json(escola);
        
    } catch (error) {
        console.error("Erro ao apagar uma escola", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

module.exports = rotas;

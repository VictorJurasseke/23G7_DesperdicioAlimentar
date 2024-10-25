const express = require('express');
const rotas = express.Router();
const model = require("../../app/models/TurmasModel");
const verificarToken = require('../middleware/autenticar')


rotas.get('/', verificarToken, async (req, res) => {
   
    try {
        const turmas = await model.retornarTodosTurmas();
        res.json(turmas);
    } catch (error) {
        console.error("Erro ao listar os jogos", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

rotas.delete('/:id', verificarToken, async (req, res) => {
    const {id} = req.params
    console.log(id)
    console.log(`Requisição delete em /api/turmas/${id}`); // Log
    try {
        const turmas = await model.ApagarTurmas(id);
        res.json(turmas);
        
    } catch (error) {
        console.error("Erro ao apagar um jogo", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
module.exports = rotas;

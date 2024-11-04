const express = require('express');
const rotas = express.Router();
const model = require("../../app/models/MatriculadosModel"); // Ajuste o caminho conforme necessário
const verificarToken = require('../middleware/autenticar')

rotas.get('/', verificarToken, async (req, res) => {
    try {
        console.log(`Requisição get recebida em /api/matriculados `); // Log
        const matriculas = await model.retornarTodosMatriculados();
        res.json(matriculas);
    } catch (error) {
        console.error("Erro ao listar as matrículas", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

rotas.delete('/', verificarToken, async (req, res) => {
    console.log(`Requisição delete recebida em /api/matriculados/${req.info.ID_usuarios}`); // Log
    try {
        const jogos = await model.ApagarMatriculas(req.info.ID_usuarios);
        res.json(jogos);
        
    } catch (error) {
        console.error("Erro ao apagar um jogo", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});


rotas.get('/semmatricula', verificarToken, async (req, res) => {
    try {
        res.json(await model.retornarNaoMatriculados())
    } catch (error) {
        console.log("Erro ao listar os perfis", error)
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})


module.exports = rotas;

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

rotas.delete('/:id', verificarToken, async (req, res) => {
    console.log(`Requisição delete recebida em /api/matriculados/${req.params.id}`); // Log
    try {
        const jogos = await model.ApagarMatriculas(req.params.id);
        res.json(jogos);
        
    } catch (error) {
        console.error("Erro ao apagar um jogo", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});


rotas.get('/semmatricula', verificarToken, async (req, res) => {
    try {
        const semMatricula = await model.retornarNaoMatriculados()
        res.json(semMatricula)
        
    } catch (error) {
        console.log("Erro ao listar os perfis", error)
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})


// MATRICULAR DA TELADEV
rotas.post('/', verificarToken, async (req, res) => {
    console.log("REQ EM MATRICULAR USER:", req.body)
    const {ID_jogo, ID_turmas, ID_usuarios} = req.body
    console.log(req.body)
    try {
        const Matricular = await model.MatricularAlunos(ID_usuarios, ID_jogo, ID_turmas)
        res.json(Matricular)
    } catch (error) {
        console.log("Erro ao listar os perfis", error)
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})


module.exports = rotas;

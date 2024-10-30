const express = require('express');
const rotas = express.Router();
const model = require("../../app/models/PerfilModel");
const verificarToken = require('../middleware/autenticar')

rotas.get('/', verificarToken, async (req, res) => {

    console.log('Função de perfil chamada')
    try {
        res.json(await model.retornarPerfil(req.info.ID_usuarios))
    } catch (error) {
        console.error("Erro ao listar o seu perfil", error)
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})

rotas.get('/dev', async (req, res) => {

    console.log('Função de perfil chamada')
    try {
        res.json(await model.verificarDev())
    } catch (error) {
        console.error("Erro ao listar o seu perfil", error)
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})

module.exports = rotas
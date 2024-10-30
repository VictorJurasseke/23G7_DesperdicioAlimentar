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

    console.log('Função de dev chamada')
    try {
        res.json(await model.verificarDev())
    } catch (error) {
        console.error("Erro ao verificar dev", error)
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})

rotas.post('/dev', async (req, res) => {
   

    const {dev_email, dev_senha, dev_confirmar_senha} = req.body

    console.log('Função de perfil chamada para criar')
    try {
        res.json(await model.criarDev(dev_email, dev_senha, dev_confirmar_senha))
    } catch (error) {
        console.error("Erro ao listar o seu perfil", error)
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})

module.exports = rotas
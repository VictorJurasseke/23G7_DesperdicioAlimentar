const express = require('express');
const rotas = express.Router();
const model = require("../../app/models/DevModel");
const verificarToken = require('../middleware/autenticar')


rotas.get('/verifyDev', verificarToken, async (req, res) => {
    
    try {
        const dev = await model.VerificarDev();
        res.json(dev);
    } catch (error) {
        console.error("Deu erro em verificar a existencia de algum dev em sua escolas:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});



rotas.post('/CriarDev', verificarToken, async (req, res) => {
    const {
        user_nome,
        user_email,
        user_senha,
        user_tipo_acesso,
        user_img_caminho,
        user_qrcode
    } = req.body
    try {
        const dev = await model.CriarDev(user_nome, user_email, user_senha, user_tipo_acesso, user_img_caminho, user_qrcode);
        res.json(dev);
    } catch (error) {
        console.error("Deu erro em criar dev dev:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

module.exports = rotas
const express = require('express');
const rotas = express.Router();
const model = require("../../app/models/PetsModel");
const verificarToken = require('../middleware/autenticar');
const multer = require('multer');
const { storage } = require('../../app');  // Importando o storage configurado
const upload = multer({ storage });  // Usando o multer com a configuração de armazenamento

// Rota para criar um pet
rotas.post('/', verificarToken, upload.single('pet_img_caminho'), async (req, res) => {
    const { pet_nome, desc_pet, ponto_pet, raridade_pet, peso_pet } = req.body;

    // Se a imagem foi enviada, atribuímos o caminho correto para 'caminho_pet'
    let caminho_pet = '';
    if (req.file) {
        caminho_pet = `/public/Pets/${req.file.filename}`;  // Aqui, armazenamos o caminho da imagem
    }

    try {
        const resultado = await model.CriarPet(pet_nome, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet);
        res.json(resultado);
    } catch (error) {
        console.error("Erro ao cadastrar pet:", error.message);
        res.status(500).json({ status: false, message: "Erro Interno do servidor!" });
    }
});

module.exports = rotas;

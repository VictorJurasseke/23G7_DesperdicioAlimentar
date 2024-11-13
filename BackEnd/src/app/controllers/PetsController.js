const express = require('express');
const rotas = express.Router();
const model = require("../../app/models/PetsModel");
const verificarToken = require('../middleware/autenticar');


// Rota para listar todos os pets
rotas.get('/', verificarToken, async (req, res) => {
    console.log('Função de listar todos os pets chamada');
    try {
        res.json(await model.retornarPets());
    } catch (error) {
        console.error("Erro ao listar os pets", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

// Rota para criar um novo pet (com upload de imagem)
rotas.post('/', verificarToken, async (req, res) => {
    console.log('Função de criar pet chamada');

    // Obtém os dados do corpo da requisição
    const { nome_pet, desc_pet, ponto_pet, raridade_pet, peso_pet } = req.body;

    // Verifica se o arquivo foi enviado
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    // O caminho do arquivo será acessado via `req.file.path`
    const caminho_pet = req.file.path;  // Caminho do arquivo enviado

    try {
        // Chama a função do model para criar o pet com a imagem
        const novoPet = await model.CriarPet(nome_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet);
        res.json({ message: 'Pet criado com sucesso!', pet: novoPet });
    } catch (error) {
        console.error('Erro ao criar pet', error);
        res.status(500).json({ error: 'Erro interno ao criar pet' });
    }
});

module.exports = rotas;

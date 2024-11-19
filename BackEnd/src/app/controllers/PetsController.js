const express = require('express');
const rotas = express.Router();
const model = require("../../app/models/PetsModel");
const verificarToken = require('../middleware/autenticar');
const multer = require('multer');
const { storage } = require('../middleware/multer');
const path = require('path')

function getUltimasPastas(caminho, nome) {
    const partes = caminho.split(path.sep); // Divide o caminho em partes
    const ultimasPastas = partes.slice(-3, -1).join(path.sep); // Pega as últimas duas pastas
    return path.join(ultimasPastas, nome); // Junta com o nome do arquivo
}


const upload = multer({ storage: storage })

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
rotas.post('/', verificarToken, upload.single('pet_img_caminho'), async (req, res) => {

    console.log("Corpo inteiro", req.body)
    console.log('Função de criar pet chamada', req.file.filename);

    // Obtém os dados do corpo da requisição
    const { nome_pet, desc_pet, ponto_pet, raridade_pet } = req.body;

    const pesosPorRaridade = {
        Lendario: 0.005,
        Comum: 0.6,
        Raro: 0.2,
        Incomum: 0.4,
        Epico: 0.1,
    };
    let peso_pet = pesosPorRaridade[raridade_pet];
    console.log(peso_pet)

    // Verifica se o arquivo foi enviado
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    // Extrair as últimas duas pastas
    caminho_pet = req.file.filename



    console.log(caminho_pet)



    try {
        // Chama a função do model para criar o pet com a imagem
        const novoPet = await model.CriarPet(nome_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet);
        res.json({ message: 'Pet criado com sucesso!', pet: novoPet, status: true });
    } catch (error) {
        console.error('Erro ao criar pet', error);
        res.status(500).json({ error: 'Erro interno ao criar pet' });
    }
});


// Apaga um pet especifico
rotas.delete('/:id/:nome', verificarToken, async (req, res) => {
    console.log(`Requisição delete recebida em /api/pets/${req.params.id}`); // Log
    console.log(`Requisição delete recebida em /api/pets/${req.params.nome}`); // Log
    try {
        const pets = await model.ApagarPet(req.params.id,req.params.nome);
        res.json(pets);
    } catch (error) {
        console.error("Erro ao apagar um pet", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});


// Rota que cria todos os pets padrões fornecidos pelo sistema
rotas.post('/criarPets', verificarToken, async (req, res) => {
    console.log(`Requisição post recebida em /api/pets`)

    try {
        const pets = await model.CriarPetPadrao();
        res.json(pets);
    } catch (error) {
        console.error("Erro ao apagar um pet", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});


rotas.get('/temporada', verificarToken, async (req, res) => {
    console.log(`Requisição get recebida em /api/pets/temporadaAtual`)



    
    try {
        const pets = await model.ProcurarPetJogo(req.info.ID_usuarios);
        res.json(pets);
    } catch (error) {
        console.error("Erro ao procurar seus pets", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});




module.exports = rotas;



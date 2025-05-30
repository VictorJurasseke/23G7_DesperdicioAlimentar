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
        Lendário: 0.05,
        Comum: 0.5,
        Raro: 0.3,
        Épico: 0.08,
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


// Rota que cria todos os pets padrões fornecidos pelo sistema e pasta PetsClientes
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



//Procura todos os pets e informações do jogador na temporada atual que ele participa, 
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


//Rota que simula o progresso do usuário, verifica se o seu pet atingiu passo de evolução, e atribui pontos para o pet, soma o total de desperdicio do usuário,
// e a quantidade de pontos já conseguida pelo mesmo
rotas.get('/progresso/:valorAleatorioDesperdicado/:ID_inventario', verificarToken, async (req,res) =>{
    console.log("Requisicão get recebida em api/pets/progresso")

    // Variavel que guarda um valor entre 0.800kg e 0.200kg
    let desperdicio = req.params.valorAleatorioDesperdicado
    const ID_inventario = req.params.ID_inventario
    const ID_usuarios = req.info.ID_usuarios
    try{
        const pets = await model.ProgressoPet(desperdicio,ID_inventario,ID_usuarios)
        res.json(pets)
    } catch (error){
        console.log("Erro ao simular progresso", error);
        res.status(500).json({error:"Erro interno do servidor :p"})
    }
})




// Ativa o pet principal escolhido pelo usuário, Usado na tela jogador
rotas.get('/principal/:ID_inventario', verificarToken, async (req,res) =>{
    console.log("Requisicão get recebida em api/pets/progresso")

    const ID_inventario = req.params.ID_inventario
    const ID_usuarios = req.info.ID_usuarios
    try{
        const pets = await model.MudarPrincipal(ID_inventario,ID_usuarios)
        res.json(pets)
    } catch (error){
        console.log("Erro ao mudar o pet principal", error);
        res.status(500).json({error:"Erro interno do servidor :p"})
    }
})

// Busca o mascote principal do usuario logado
rotas.get('/buscarpet/:ID_jogo', verificarToken, async (req,res)=>{
    console.log("Requisicão get recebida em api/pets/buscarpet")

    // ID do usuário que fez a requisição
    const ID_usuarios = req.info.ID_usuarios
    const id = req.params.ID_jogo
    console.log("ID DO JOGOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",id)
    
    try{
        const pets = await model.BuscarMascotePrincipalUsuario(ID_usuarios,id)
        res.json(pets)
    } catch (error){
        console.log("Erro ao simular progresso", error);
        res.status(500).json({error:"Erro interno do servidor :p"})
    }
})


rotas.delete('/apagartodos', verificarToken, async (req,res)=>{
    console.log(`Requisição delete recebida em /api/pets/apagartodos`); // Log
  
    try {
        const pets = await model.ApagarTodosPets();
        res.json(pets);
    } catch (error) {
        console.error("Erro ao apagar um pet", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
})





module.exports = rotas;



const express = require('express');
const rotas = express.Router();
const model = require("../../app/models/PetsModel");
const verificarToken = require('../middleware/autenticar');
const multer = require('multer');
const { storage } = require('../../app');  // Importando o storage configurado
const upload = multer({ storage });  // Usando o multer com a configuração de armazenamento
const db = require('../../db');
const { pets } = require('../pets');


module.exports.retornarPets = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [pets] = await conexao.execute('SELECT * FROM pets')
        return pets

    } catch (error) {
        console.error("Erro ao selecionar todos os pets:", error)
    }
    finally {
        db.liberarConexao(conexao)
    }
}


module.exports.CriarPet = async (nome_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet) => {
    let conexao;

    console.log("Antes do sql",{nome_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet })
    try {
        conexao = await db.criarConexao();
        const [pets] = await conexao.execute('INSERT INTO pets(nome_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet) VALUES (?,?,?,?,?,?)',
            [nome_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet]);
        return pets;
    } catch (error) {
        console.error("Erro ao criar pet!", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};


module.exports.ApagarPet = async (id, nome) => {
    let conexao;
    try {
        conexao = await db.criarConexao();
 
        const [linhas] = await conexao.execute('DELETE FROM pets WHERE ID_pet = ?', [id]);
        return { status: true, message:"Pet deletado com sucesso!"}
    } catch (error) {
        return { status: false, error: error }
        throw error // Repassa para a controller
    } finally {
        db.liberarConexao(conexao)

    }
};


module.exports.CriarPetPadrao = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        
        for (const pet of pets) {
            const { nome_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet } = pet;
            await conexao.execute(
                `INSERT INTO pets (nome_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [nome_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet]
            );
        }

        return { status: true, message: "Todos os pets foram inseridos com sucesso!" };
    } catch (error) {
        console.error("Erro ao inserir os pets", error);
        return { status: false, error: error.message };
    } finally {
        db.liberarConexao(conexao);
    }
};





module.exports.ProcurarPetJogo = async (ID_usuarios) => {

    let conexao;
    try {
        conexao = await db.criarConexao();
        
        
        // Preciso saber qual jogo o usuario participa

        const [Jogo] = await conexao.execute('SELECT m.ID_jogos FROM jogos j, jogos_matricula m  WHERE m.ID_usuarios = ? AND m.ID_jogos = j.ID_jogos AND j.jo_status = 1', [ID_usuarios]);

        const ID_jogos = Jogo[0].ID_jogos

        const [Pets] = await conexao.execute('SELECT p.nome_pet, p.caminho_pet, i.pontuacao_pet FROM inventario_matricula i, pets p WHERE i.ID_pets = p.ID_pet AND i.ID_usuarios = ? AND i.ID_jogos = ? ;', [ID_usuarios, ID_jogos]);
        console.log("Pets do usuario",Pets)

        return { status: true, message:"Pets selecionados com sucesso!", pets:Pets}
        
    } catch (error) {
        return { status: false, error: error }
        throw error // Repassa para a controller
    } finally {
        db.liberarConexao(conexao)

    }
};
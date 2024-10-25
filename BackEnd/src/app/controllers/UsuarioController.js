// Arquivo responsavel em crair as rotas e buscar as informações dos clientes

const express = require('express');
const rotas = express.Router()
const model = require("../../app/models/UsuarioModel")
const verificarToken = require('../middleware/autenticar')

//Buscar todos os perfis 

rotas.get('/', verificarToken, async (req, res) => {
    try {
        res.json(await model.retornarTodosUsuario())
    } catch (error) {
        console.log("Erro ao listar os perfis", error)
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})

// Retornar um especifico

rotas.get('/:id', verificarToken, async (req, res) => {
    const { id } = req.params

    try {
        res.json(await model.retornarUmUsuario(id))
    } catch (error) {
        console.error("Erro ao listar um perfil especifico", error)
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})

// Registra usuario 

rotas.post('/registrar', async (req, res) => {

    let senhaComprimento = 8
    let {
        nome,
        email,
        senha,
        confirmar_senha,
        turma,
        periodo,
        unidade,
        qrcode
    } = req.body

    user_img_caminho = "User.png"
   
        


    try {
        console.log(periodo)
        let linhas = await model.perfilNovo(nome, email, senha, qrcode, turma, unidade, periodo, user_img_caminho, confirmar_senha)
        res.json(linhas)
    } catch (error) {
        console.log("Erro ao criar seu perfil,", error)
    }
});



// Autentica usuário

rotas.post('/login', async (req, res) => {
   let {email, senha} = req.body
   
    try {
        res.json(await model.retornarLogin(email, senha));
    } catch (error) {
        console.log('Erro ao Logar', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
    

});


rotas.delete('/:id', async (req, res) => {
    const {id} = req.params
    
    console.log(`Requisição delete em /api/usuario/${id}`); // Log
    try {
        const usuario = await model.ApagarUsuario(id);
        res.json(usuario);
    } catch (error) {
        console.error("Erro ao apagar um jogo", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

module.exports = rotas;
// Arquivo responsavel em crair as rotas e buscar as informações dos clientes

const express = require('express');
const rotas = express.Router()
const model = require("../../app/models/UsuarioModel")
const verificarToken = require('../middleware/autenticar')


// Cadastrar usuário 
// user_nome: document.getElementById('user_nome').value,
// user_email: document.getElementById('user_email').value,
// user_senha: document.getElementById('user_senha').value,
// user_tipo_acesso: document.getElementById('tipo_acesso').value,
// user_periodo: document.getElementById('periodo').value,
// user_img_caminho: "", // Adicione o caminho da imagem se necessário
// user_qrcode: "" // Adicione o QR code se necessário



// ROTA DE CADASTRAR USUÁRIO SENDO USADA NA TELA DEV
rotas.post('/', async (req, res) => {

    console.log(req.body)
    let {
        user_nome,
        user_email,
        user_senha,
        user_tipo_acesso,
        user_periodo,
        user_img_caminho,
        user_qrcode
    } = req.body
    console.log(user_nome)
    try {
        res.json(await model.CadastrarUsuario(user_nome, user_email, user_senha, user_tipo_acesso, user_periodo, user_img_caminho, user_qrcode));
    } catch (error) {
        console.log('Erro ao Logar', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }


});





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

// // Registra usuario  DELETAR CASO FUNCIONE TUDO CORRETAMENTE
// rotas.post('/registrar', async (req, res) => {


//     let {
//         nome,
//         email,
//         senha,
//         confirmar_senha,
//         turma,
//         periodo,
//         unidade,
//         qrcode
//     } = req.body

//     user_img_caminho = "User.png"




//     try {
//         console.log(periodo)
//         let linhas = await model.perfilNovo(nome, email, senha, qrcode, turma, unidade, periodo, user_img_caminho, confirmar_senha)
//         res.json(linhas)
//     } catch (error) {
//         console.log("Erro ao criar seu perfil,", error)
//     }
// });


// Validar Conta do aluno para se tornar usuário; passar O FORMULARIO E INDICAR QUAL O ID DO MEMSO
const yup = require('yup');

//Valida os campos nome email senha e confirmar senha

const usuarioSchema =
    yup.object().shape({

        NovaSenha: yup.string().min(8, "8MIN").required("SENHAREQUIRED"),
        QRcode: yup.string().required("QRCODEREQUIRED"),
        ConfirmarNovaSenha: yup
            .string()
            .oneOf([yup.ref('NovaSenha'), null], "NEWSENHAWRONG")
            .required("SENHAREQUIRED"),
    });

// Validar a conta do usuário
rotas.post('/validar', verificarToken, async (req, res) => {
    console.log("Corpo da Requisição:", req.body);
    console.log("ID do Usuário:", req.info.ID_usuarios);

    const { NovaSenha, ConfirmarNovaSenha, QRcode } = req.body;

    try {
        // Valida o corpo da requisição usando yup
        await usuarioSchema.validate(req.body, { abortEarly: false });

        // Log para verificar se a validação foi bem-sucedida
        console.log("Validação bem-sucedida.");

        // Verifique os valores antes de chamar o model
        console.log("Chamando ValidarConta com os parâmetros:", {
            NovaSenha,
            QRcode,
            ConfirmarNovaSenha,
            ID_usuarios: req.info.ID_usuarios
        });

        // Chama a função do modelo para validar a conta
        const linhas = await model.ValidarConta(NovaSenha, QRcode, ConfirmarNovaSenha, req.info.ID_usuarios);

        // Verifica o retorno da model antes de enviar a resposta
        console.log("Retorno de ValidarConta:", linhas);

        res.json(linhas);
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            console.log("Erros de validação do Yup:", error.errors);
            return res.json({ errors: error.errors });
        }
        console.error("Erro inesperado:", error); // Log para erros não esperados
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});


// Autentica usuário

rotas.post('/login', async (req, res) => {
    let { email, senha } = req.body

    try {
        res.json(await model.retornarLogin(email, senha));
    } catch (error) {
        console.log('Erro ao Logar', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }


});


rotas.delete('/:id', async (req, res) => {
    const { id } = req.params

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
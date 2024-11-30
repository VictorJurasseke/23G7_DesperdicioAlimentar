// Arquivo responsavel em crair as rotas e buscar as informações dos clientes

const express = require('express');
const rotas = express.Router()
const model = require("../../app/models/UsuarioModel")
const verificarToken = require('../middleware/autenticar')


// Validar Conta do aluno para se tornar usuário; passar O FORMULARIO E INDICAR QUAL O ID DO MEMSO


//Valida os campos nome email senha e confirmar senha

const yup = require('yup');


const ValidarusuarioSchema = yup.object().shape({


    // Validar conta do usuario
    NovaSenha: yup
        .string()
        .min(8, "8MIN")
        .required("SENHAREQUIRED"),

    QRcode: yup
        .string()
        .required("QRCODEREQUIRED"),

    ConfirmarNovaSenha: yup
        .string()
        .oneOf([yup.ref('NovaSenha'), null], "NEWSENHAWRONG")
        .required("SENHAREQUIRED"),


});
//

const CriarusuarioSchema = yup.object().shape({
    // Criar usuário
    user_nome: yup
        .string()
        .required("- O nome não foi preenchido"),

    user_email: yup
        .string()
        .required("- O email não foi preenchido")
        .email("- O email não é valido"),

    user_senha: yup
        .string()
        .required("- A senha não foi preenchida")
        .min(8, "- A senha precisa ter no minimo 8 caractéres"),

    user_tipo_acesso: yup
        .string()
        .required("- Não foi selecionado o nivel de acesso do usuário"),

    user_periodo: yup
        .string()
        .required("- Não foi selecionado o periodo do usuário"),

    user_img_caminho: yup
        .string()
        .required(),

    // 
});





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

        await CriarusuarioSchema.validate(req.body, { abortEarly: false });




        res.json(await model.CadastrarUsuario(user_nome, user_email, user_senha, user_tipo_acesso, user_periodo, user_img_caminho, user_qrcode));
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            console.log("Erros de validação do Yup:", error.errors);
            return res.json({ errors: error.errors, status: 301,  });
        }
        console.error("Erro inesperado:", error); // Log para erros não esperados
        res.status(500).json({ error: "Erro interno do servidor" });
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





// Validar a conta do usuário
rotas.post('/validar', verificarToken, async (req, res) => {
    console.log("Corpo da Requisição:", req.body);
    console.log("ID do Usuário:", req.info.ID_usuarios);

    const { NovaSenha, ConfirmarNovaSenha, QRcode } = req.body;

    try {
        // Valida o corpo da requisição usando yup
        await ValidarusuarioSchema.validate(req.body, { abortEarly: false });

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


rotas.delete('/:id_deletar', verificarToken, async (req, res) => {
    const ID_usuarios = req.info.ID_usuarios 
    const { id_deletar } = req.params
   
    console.log(`Requisição delete em /api/usuario/${id_deletar}`); // Log
    try {
        const usuario = await model.ApagarUsuario(id_deletar, ID_usuarios);
        
        res.json(usuario);
    } catch (error) {
        console.error("Erro ao apagar um usuário", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});








module.exports = rotas;
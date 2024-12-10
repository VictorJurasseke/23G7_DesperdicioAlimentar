const db = require('../../db')
const validator = require('validator');

module.exports.retornarTodosUsuario = async () => {
    let conexao;



    try {

        // Faz a conexao com o banco com uma funçãos
        conexao = await db.criarConexao();

        //Executa o sql no bd
        const [linhas] = await conexao.execute(
            'SELECT u.ID_usuarios, u.user_nome, u.user_email, u.user_periodo, u.user_tipo_acesso FROM usuarios u ORDER BY u.user_tipo_acesso ASC LIMIT 15;')



        return linhas

    } catch (error) {
        console.error("Erro ao listar todos os usuarios", error)
        throw error // Repassa o erro para a controller
    } finally {
        db.liberarConexao(conexao)// Libera a conexao
    }
}

// MODEL DE CADASTRAR - SENDO USADA NA TELA DEV
module.exports.CadastrarUsuario = async (user_nome, user_email, user_senha, user_tipo_acesso, user_periodo, user_img_caminho, user_qrcode) => {

    let senhaHash = crypto.createHash('sha256').update(user_senha).digest('hex');

    let conexao;

    try {

        // Faz a conexao com o banco com uma funçãos
        conexao = await db.criarConexao();

        //Executa o sql no bd
        const [linhas] = await conexao.execute(
            'INSERT INTO usuarios (user_nome,user_email, user_senha, user_tipo_acesso, user_periodo, user_img_caminho, user_qrcode) VALUES (?,?, ?, ?, ?, ?, ?)', [user_nome, user_email, senhaHash, user_tipo_acesso, user_periodo, user_img_caminho, user_qrcode])


        return { status: true }

    } catch (error) {
        console.error("Erro ao cadastrar os usuarios", error)
        if (error.code == 'ER_DUP_ENTRY') {
            return { status: false, message: "Entrada de dados dupla" }
        } else {
            return { status: false, message: "Erro Interno do servidor!" }
        }
        throw error // Repassa o erro para a controller
    } finally {
        db.liberarConexao(conexao)// Libera a conexao
    }

}






module.exports.retornarUmUsuario = async (id) => {
    let conexao;

    try {
        conexao = await db.criarConexao();
        const [linhas] = await conexao.execute(
            'SELECT ID_usuarios, user_nome, user_email, user_tipo_acesso, user_img_caminho, user_periodo, user_qrcode FROM usuarios WHERE ID_usuarios = ?', [id])


        return linhas
    } catch (error) {
        throw error // Repassa o erro para controller

    } finally {
        db.liberarConexao(conexao)
    }
}


// VALILDAR CONTA USADA NA TELA ALUNO
module.exports.ValidarConta = async (NovaSenha, QRcode, ConfirmarNovaSenha, ID_usuarios, Caminho_Banco) => {

    // Criptografando a senha em hexadecimal no algoritmo de sha256 para não mandar para o banco em plano branco
    let senhaHash = crypto.createHash('sha256').update(NovaSenha).digest('hex');



    let conexao;



    // 'SELECT * FROM usuarios WHERE user_nome = ?',[nome]
    try {
        conexao = await db.criarConexao();
        const [resultado] = await conexao.execute(
            'UPDATE usuarios SET user_qrcode = ?, user_senha = ?, user_tipo_acesso = 2, user_img_caminho = ? WHERE ID_usuarios = ?',
            [QRcode, senhaHash, Caminho_Banco, ID_usuarios]
        )
        return { status: true, message: "Sua conta foi validada com sucesso!" }
    } catch (error) {
        console.log(error)
        if (error.code == 'ER_DUP_ENTRY') {
            return { status: false, message: "Algum usuário já usou este QRCODE, Tente Novamente:" }
        } else {
            return { status: false, message: " Erro desconhecido!", erro: error }
        }
        throw error // Repassa para a controller
    } finally {
        db.liberarConexao(conexao)

    }
}



const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { param } = require('../controllers/UsuarioController');
const { isArgumentsObject } = require('util/types');

module.exports.retornarLogin = async (email, senha) => {


    let conexao;
    let senhaHash = crypto.createHash('sha256').update(senha).digest('hex');
    let token; // Declare a variável token aqui
    try {
        conexao = await db.criarConexao();

        // Executa a consulta ao banco de dados
        const [linhas] = await conexao.execute('SELECT * FROM usuarios WHERE user_email = ? AND user_senha = ?', [email, senhaHash]);

        // Verifica se o usuário foi encontrado
        if (linhas.length === 0) {
            return { status: false };
        }

        // meu codigo secreto, guardar em variavel de ambiente mais tarde? sei nem oq é isso
        let senhaCodigoSecreto = crypto.createHash('sha256').update("94018fjsalknxz").digest('hex');


        // o jwt só consegue manipular a informação por objetos simples, então é necessario colocar aqui
        // as informações necessarias para manipulação de outras rotas, por exemplo, por causa da rota
        // de autentificação, sera necessario agora dar req.info.ID_usuarios para chegar ate o 
        //resultado da linha do payload

        let payload = {
            ID_usuarios: linhas[0].ID_usuarios,
        };


        // Gera o token através do codigo secreto
        token = jwt.sign(payload, senhaCodigoSecreto, { expiresIn: '1h' });



    } catch (error) {
        throw error; // Lança erro para ser tratado em outro lugar
    } finally {
        db.liberarConexao(conexao); // Libera a conexão com o banco de dados
    }

    return { token }; // Retorna o token após o bloco try/catch
};
module.exports.ApagarUsuario = async (id_deletar, ID_usuarios) => {
    console.log(id_deletar, ID_usuarios)
    let conexao;
    try {
        conexao = await db.criarConexao();

        // Verifica se o usuário esta tentando deletar a própria conta
        if (id_deletar == ID_usuarios) {
            return { status: false, message: "Você não pode deletar sua conta!" }
        }

        // Finalmente, deletar a escola
        const [linhas] = await conexao.execute('DELETE FROM usuarios WHERE ID_usuarios = ?', [id_deletar]);
        return { status: true }
    } catch (error) {
        return { status: false, error: error }
        throw error // Repassa para a controller
    } finally {
        db.liberarConexao(conexao)

    }
};



module.exports.EditarUsuario = async (user_nome, user_email, user_senha, user_tipo_acesso, user_periodo, user_img_caminho, user_qrcode, ID_usuarios) => {
    let senhaHash = crypto.createHash('sha256').update(user_senha).digest('hex');
    let conexao;
    console.log("Parametros:",user_nome, user_email, user_senha, user_tipo_acesso, user_periodo, user_img_caminho, user_qrcode, ID_usuarios)
    try {
        // Faz a conexão com o banco com uma função
        conexao = await db.criarConexao();

        // Executa o SQL de edição no banco de dados
        const [linhas] = await conexao.execute(
            'UPDATE usuarios SET user_nome = ?, user_email = ?, user_senha = ?, user_tipo_acesso = ?, user_periodo = ?, user_img_caminho = ?, user_qrcode = ? WHERE ID_usuarios = ?',
            [user_nome, user_email, senhaHash, user_tipo_acesso, user_periodo, user_img_caminho, user_qrcode, ID_usuarios]
        );
   
        // Verifica se algum registro foi atualizado
        if (linhas.affectedRows > 0) {
            console.log("Retornando")
            return { status: true, message:"Concluido, informações alterada com sucesso" };
        } else {
            return { status: false, message: "Não houve alterações" };
        }

    } catch (error) {
        console.error("Erro ao editar o usuário", error);
        if (error.code == 'ER_DUP_ENTRY') {
            return { status: false, message: "Entrada de dados duplicada" };
        } else {
            return { status: false, message: "Erro interno do servidor!" };
        }
        throw error; // Repassa o erro para a controller
    } finally {
        db.liberarConexao(conexao); // Libera a conexão
    }
};




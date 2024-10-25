const db = require('../../db')
const validator = require('validator');

module.exports.retornarTodosUsuario = async () => {
    let conexao;

    try {

        // Faz a conexao com o banco com uma funçãos
        conexao = await db.criarConexao();

        //Executa o sql no bd
        const [linhas] = await conexao.execute(
            'SELECT u.ID_usuarios, u.user_nome, u.user_email, u.user_periodo, u.user_tipo_acesso, t.tur_nome, e.es_nome from usuarios u, turmas t, escola e WHERE u.ID_escola = e.ID_escola AND u.ID_turmas = t.ID_turmas LIMIT 15')
        
        

        console.log(linhas)
        return linhas

    } catch (error) {
        console.error("Erro ao listar todos os usuarios", error)
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
            'SELECT * FROM usuarios WHERE ID_usuarios = ?', [id])
        return linhas
    } catch (error) {
        throw error // Repassa o erro para controller

    } finally {
        db.liberarConexao(conexao)
    }
}

module.exports.perfilNovo = async (nome, email, senha, qrcode, turma, unidade, periodo, user_img_caminho, confirmar_senha) => {

    errors = {}
    if (!validator.isEmail(email)) {
        errors.email = 1 // 'E-mail inválido.';
    }

    if (!validator.isLength(senha, { min: 8 })) {
        errors.senha = 2 //'A senha deve ter pelo menos 8 caracteres.';
    }

    if (senha !== confirmar_senha) {
        errors.confirmar_senha = 3 //'As senhas não coincidem.';
    }

    if (qrcode.length <= 1) {
        errors.qrcode = 6 // QRCODE não existe
    }

    // Se houver erros, retorne-os
    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    // TODOS OS CAMPOS FORAM LIMPADOS - VERIFICAR SE JÁ EXISTE NO BANCO ANTES DE REGISTRAR

    // Sanitizar dados
    nome = validator.escape(nome);
    email = validator.normalizeEmail(email);
    qrcode = validator.escape(qrcode);
    periodo = validator.escape(periodo);


    // Criptografando a senha em hexadecimal no algoritmo de sha256 para não mandar para o banco em plano branco
    let senhaHash = crypto.createHash('sha256').update(senha).digest('hex');



    let conexao;
    let aluno = 1
    let nutricionista = 2



    // 'SELECT * FROM usuarios WHERE user_nome = ?',[nome]
    try {
        conexao = await db.criarConexao();
        const [resultado] = await conexao.execute(
            'INSERT INTO usuarios (user_nome, user_email, user_qrcode, user_senha, user_tipo_acesso, ID_turmas, ID_escola, user_periodo, user_img_caminho) VALUES (?,?,?,?,?,?,?,?,?)',
            [nome, email, qrcode, senhaHash, aluno, turma, unidade, periodo, user_img_caminho]
        )
        return { status: true }
    } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
            return { status: false }
        }
        throw error // Repassa para a controller
    } finally {
        db.liberarConexao(conexao)

    }
}


const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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
module.exports.ApagarUsuario = async (id) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        // Deletar usuários associados à escola

        // Finalmente, deletar a escola
        const [linhas] = await conexao.execute('DELETE FROM usuarios WHERE ID_usuarios = ?', [id]);
        return { status: true }
    } catch (error) {
        return { status: false, error: error }
        throw error // Repassa para a controller
    } finally {
        db.liberarConexao(conexao)

    }
};
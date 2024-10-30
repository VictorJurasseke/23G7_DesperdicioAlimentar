const db = require('../../db');
const validator = require('validator');
const crypto = require('crypto');

module.exports.retornarPerfil = async (id) => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        
        //se tiver algum usuário verificar se o usuário esta logado
        const [usuario] = await conexao.execute(
            'SELECT ID_usuarios, user_nome, user_tipo_acesso, user_periodo, user_img_caminho FROM usuarios WHERE ID_usuarios = ?',
            [id]
        );

        return usuario


    } catch (error) {
        throw error; // Repassa o erro para o controller
    } finally {
        db.liberarConexao(conexao);
    }
};

module.exports.verificarDev = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        // verifica se há algum usuario na tabela, se não houver retorna false, e mostra a tela de criar a conta dev
        const [qtd_usuario] = await conexao.execute(
            'select count(*) AS usuarios from usuarios'
        )
        return qtd_usuario

    } catch (error) {
        throw error; // Repassa o erro para o controller
    } finally {
        db.liberarConexao(conexao);
    }
};

module.exports.criarDev = async (dev_email, dev_senha, dev_confirmar_senha) => {

    let conexao;

    errors = {}
    if (!validator.isEmail(dev_email)) {
        errors.dev_email = 1 // 'E-mail inválido.';
    }

    if (!validator.isLength(dev_senha, { min: 8 })) {
        errors.dev_senha = 1 //'A senha deve ter pelo menos 8 caracteres.';
    }

    if (dev_confirmar_senha !== dev_senha) {
        errors.dev_confirmar_senha = 1 //'As senhas não coincidem.';
    }

    // Se houver erros, retorne-os
    if (Object.keys(errors).length > 0) {
        return { errors };
    }


    // Sanitizar dados
    dev_senha = validator.escape(dev_senha);
    dev_email = validator.normalizeEmail(dev_email);


    // Criptografando a senha em hexadecimal no algoritmo de sha256 para não mandar para o banco em plano branco
    let senhaHash = crypto.createHash('sha256').update(dev_senha).digest('hex');


    try {
        conexao = await db.criarConexao();

        // cria no banco o administrador 
        const [linhas] = await conexao.execute(
            'INSERT INTO usuarios(user_nome, user_email, user_senha, user_tipo_acesso, user_img_caminho, user_periodo, user_qrcode) VALUES("ADM", ?, ?, 0, "User.png", "Matutino", "0")', [dev_email, senhaHash]
        )
        return linhas
    } catch (error) {
        throw error; // Repassa o erro para o controller
    } finally {
        db.liberarConexao(conexao);
    }
};



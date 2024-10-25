
const db = require('../../db');


// Esta função verifica e cria a conta dev no banco
module.exports.VerificarDev = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        // Verifica se já existe algum dev
        const [resultado] = await conexao.execute(
            'SELECT COUNT(*) as total FROM usuarios WHERE user_tipo_acesso = 0'
        );
        if (resultado[0].total > 0) {
            return res.status(400).json({ error: "Já existe um perfil dev" });
        }
        //Verifica se há dev, se não existir ele fala, true, ou seja true, pode inserir novo dev
        return { status: true }
    } catch (error) {
        console.error("Erro ao verificar e criar um dev", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};

module.exports.CriarDev = async (user_nome, user_email, user_senha, user_tipo_acesso, user_img_caminho, user_qrcode) => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        // Insere a conta dev com os campos corretos
        await conexao.execute(
            'INSERT INTO usuarios (ID_escola, ID_turmas, user_nome, user_email, user_senha, user_tipo_acesso, user_img_caminho,  user_qrcode) VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?)',
            [user_nome, user_email, user_senha, user_tipo_acesso, user_img_caminho, user_qrcode]
        );


        return { status: true }
    } catch (error) {
        console.error("Erro ao verificar e criar um dev", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};
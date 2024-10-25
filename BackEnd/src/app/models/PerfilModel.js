const db = require('../../db');

module.exports.retornarPerfil = async (id) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        const [linhas] = await conexao.execute(
            'SELECT ID_usuarios, user_nome, user_tipo_acesso, user_periodo, user_img_caminho FROM usuarios WHERE ID_usuarios = ?', 
            [id]
        );

        return linhas;
    } catch (error) {
        throw error; // Repassa o erro para o controller
    } finally {
        db.liberarConexao(conexao);
    }
};

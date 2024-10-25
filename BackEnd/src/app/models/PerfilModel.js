const db = require('../../db')


module.exports.retornarPerfil = async (id) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        const [linhas] = await conexao.execute(
        'SELECT u.ID_usuarios, u.user_nome, u.user_tipo_acesso, u.user_periodo, e.es_nome, e.ID_escola, u.user_img_caminho FROM usuarios u, escola e WHERE u.ID_usuarios = ? AND u.ID_escola = e.ID_escola', [id])
        return linhas
    } catch (error) {
        throw error // Repassa o erro para controller

    } finally {
        db.liberarConexao(conexao)
    }
}
const db = require('../../db');

module.exports.retornarRank = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [linhas] = await conexao.execute('select u.user_nome, u.user_periodo, jm.pontos_usuario, jm.rank_usuario, t.tur_nome from usuarios u, jogos_matricula jm, turmas t where u.ID_usuarios = jm.ID_usuarios AND t.ID_turmas = u.ID_turmas order by jm.pontos_usuario limit 10');
        return linhas;
    } catch (error) {
        console.error("Erro ao listar os ranks dos usuarios", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};
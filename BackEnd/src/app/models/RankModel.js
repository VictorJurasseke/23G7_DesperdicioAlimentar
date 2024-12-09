const db = require('../../db');

module.exports.retornarRank = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [linhas] = await conexao.execute('select u.user_nome, u.user_periodo, jm.pontos_usuario, jm.rank_usuario, t.tur_nome, j.ID_jogos, j.jo_nome, j.jo_tema, u.ID_usuarios from usuarios u, jogos_matricula jm, turmas t, jogos j where u.ID_usuarios = jm.ID_usuarios AND t.ID_turmas = jm.turmas_ID_turmas AND j.jo_status = 1 order by jm.rank_usuario ASC limit 10');
        return linhas;
    } catch (error) {
        console.error("Erro ao listar os ranks dos usuarios", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};
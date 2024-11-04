const db = require('../../db');

module.exports.retornarTodosMatriculados = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [linhas] = await conexao.execute('SELECT m.pontos_usuario, m.rank_usuario, u.user_nome, j.jo_nome, e.es_nome FROM jogos_matricula m, usuarios u, jogos j, escola e WHERE u.ID_usuarios = m.ID_usuarios AND m.ID_jogos = j.ID_jogos AND j.ID_escola = e.ID_escola;');
        return linhas;
    } catch (error) {
        console.error("Erro ao listar todas as matriculas", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};

module.exports.ApagarMatriculas = async (id) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        const [linhas] = await conexao.execute('DELETE FROM jogos_matricula WHERE ID_usuarios = ?', [id]);
        return { status: true }
    } catch (error) {
        return { status: false, error: error }
        throw error // Repassa para a controller
    } finally {
        db.liberarConexao(conexao)

    }
};


module.exports.retornarNaoMatriculados = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [linhas] = await conexao.execute('SELECT u.ID_usuarios, u.user_nome, u.user_email, u.user_periodo, u.user_tipo_acesso FROM usuarios u WHERE u.user_tipo_acesso = 2 LIMIT 15;');
        return linhas;
    } catch (error) {
        console.error("Erro ao listar todos os usuarios", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};
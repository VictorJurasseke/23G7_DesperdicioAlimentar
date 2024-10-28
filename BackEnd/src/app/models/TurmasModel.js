const db = require('../../db');

module.exports.retornarTodosTurmas = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [linhas] = await conexao.execute('SELECT * FROM turmas');
        return linhas;
    } catch (error) {
        console.error("Erro ao listar todas as turmas", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};

module.exports.CriarTurma = async (nome_turma) => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [linhas] = await conexao.execute('INSERT INTO turmas (tur_nome) VALUES(?)', [nome_turma]);
        return { status: true };
    } catch (error) {
        console.error("Erro ao criar turma!", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};



module.exports.ApagarTurmas = async (id) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        // Deletar usuários associados à escola

        // Finalmente, deletar a escola
        const [linhas] = await conexao.execute('DELETE FROM turmas WHERE ID_turmas = ?', [id]);
        return { status: true }
    } catch (error) {
        return { status: false, error: error }
        throw error // Repassa para a controller
    } finally {
        db.liberarConexao(conexao)

    }
};

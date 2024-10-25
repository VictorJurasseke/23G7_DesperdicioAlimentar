const db = require('../../db');

module.exports.retornarTodosEscola = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [linhas] = await conexao.execute('SELECT * FROM escola');
        return linhas;
    } catch (error) {
        console.error("Erro ao listar todas as escolas!", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};

module.exports.CriarEscola = async (nome_escola) => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [linhas] = await conexao.execute('INSERT INTO escola (es_nome) VALUES(?)', [nome_escola]);
        return { status: true };
    } catch (error) {
        console.error("Erro ao criar escola!", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};

module.exports.ApagarEscola = async (id) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        // Deletar usuários associados à escola

        // Finalmente, deletar a escola
        const [linhas] = await conexao.execute('DELETE FROM escola WHERE ID_escola = ?', [id]);

        return { status: true }
    } catch (error) {
        return { status: false, error: error }
        throw error // Repassa para a controller
    } finally {
        db.liberarConexao(conexao)

    }
};





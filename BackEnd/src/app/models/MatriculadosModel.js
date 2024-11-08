const db = require('../../db');

module.exports.retornarTodosMatriculados = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [linhas] = await conexao.execute('SELECT m.pontos_usuario, u.ID_usuarios, j.ID_jogos  , m.rank_usuario, u.user_nome, j.jo_nome, e.es_nome FROM jogos_matricula m, usuarios u, jogos j, escola e WHERE u.ID_usuarios = m.ID_usuarios AND m.ID_jogos = j.ID_jogos AND j.ID_escola = e.ID_escola;');
        return linhas;
    } catch (error) {
        console.error("Erro ao listar todas as matriculas", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};

module.exports.ApagarMatriculas = async (ID_usuarios) => {
    

    // Passo 4: Alterar o tipo de acesso do jogador para usuario - 2
    let conexao;
    try {
        conexao = await db.criarConexao();
        
        const [usuarios] = await conexao.execute(
            `UPDATE usuarios SET user_tipo_acesso = 2 WHERE ID_usuarios = ?;`,
            [ID_usuarios]
        );
        const [linhas] = await conexao.execute('DELETE FROM jogos_matricula WHERE ID_usuarios = ?', [ID_usuarios]);
        return { status: true }
    } catch (error) {
        return { status: false, message: error }
        throw error // Repassa para a controller
    } finally {
        db.liberarConexao(conexao)

    }
};

// Não matriculados no jogo
module.exports.retornarNaoMatriculados = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [linhas] = await conexao.execute('SELECT u.ID_usuarios, u.user_nome, u.user_email, u.user_periodo, u.user_tipo_acesso FROM usuarios u WHERE u.user_tipo_acesso = 2 LIMIT 15;');
        console.log(linhas)
        return linhas;
    } catch (error) {
        console.error("Erro ao listar todos os usuarios", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};

module.exports.MatricularAlunos = async (ID_jogo, ID_turmas, ID_usuarios) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        // Passo 0: Ver se o jogo está ativo (1 = ATIVO, 2 = INATIVO)
        const [JogosStatus] = await conexao.execute(
            `SELECT * FROM jogos j WHERE j.ID_jogos = ? AND j.jo_status = 1`,
            [ID_jogo]
        );

        console.log("Jogo", JogosStatus);

        // Verifica se o array está vazio (significa que o jogo não está ativo)
        if (JogosStatus.length === 0) {
            console.log("Inativo");
            return { status: false, message: "O jogo está inativo" };
        }


        // Passo 1: Obter todos os pontos dos usuários já matriculados nesse jogo
        const [usuariosMatriculados] = await conexao.execute(
            `SELECT ID_usuarios FROM jogos_matricula WHERE ID_jogos = ?`,
            [ID_jogo]
        );

        // Passo 2: Calcular o rank do novo usuário (sempre no final, considerando que ele tem 0 pontos)
        const rank_usuario = usuariosMatriculados.length + 1; // O novo usuário vai ter o rank seguinte ao último

        // Passo 3: Inserir o novo usuário com rank 0 e o rank calculado
        const [linhas] = await conexao.execute(
            `INSERT INTO jogos_matricula (ID_jogos, ID_usuarios, turmas_ID_turmas, pontos_usuario, rank_usuario, peso_acumulativo) VALUES (?, ?, ?, ?, ?, ?)`,
            [ID_jogo, ID_usuarios, ID_turmas, 0, rank_usuario, 0]
        );

        // Passo 4: Alterar o tipo de acesso do usuario para jogador - 3
        const [jogando] = await conexao.execute(
            `UPDATE usuarios SET user_tipo_acesso = 3 WHERE ID_usuarios = ?;`,
            [ID_usuarios]
        );

        console.log(jogando)
        return { status: true }

        return linhas;
    } catch (error) {
        console.error("Erro ao matricular os usuarios", error)
        if (error.code == 'ER_DUP_ENTRY') {
            return { status: false, message: "Entrada de dados dupla" }
        } else {
            return { status: false, message: "Erro Interno do servidor!" }
        }

    } finally {
        db.liberarConexao(conexao);
    }
}

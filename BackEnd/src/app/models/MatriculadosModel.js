const db = require('../../db');
const {sorteioComBaseNoPeso } = require('../pets');

module.exports.retornarTodosMatriculados = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [linhas] = await conexao.execute('SELECT m.pontos_usuario, u.ID_usuarios, j.ID_jogos, j.jo_tema, m.rank_usuario, u.user_nome, j.jo_nome, e.es_nome FROM jogos_matricula m, usuarios u, jogos j, escola e WHERE u.ID_usuarios = m.ID_usuarios AND m.ID_jogos = j.ID_jogos AND j.ID_escola = e.ID_escola;');
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

        const [inventario] = await conexao.execute('DELETE FROM inventario_matricula WHERE ID_usuarios', [ID_usuarios])
        const [matricula] = await conexao.execute('DELETE FROM jogos_matricula WHERE ID_usuarios = ?', [ID_usuarios]);
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
        return linhas;
    } catch (error) {
        console.error("Erro ao listar todos os usuarios", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};

//Matriculados pela tela dev - Função em andamento porque tem que arrumar o sorteamento do ovo por aqui tambem, capaz de eu só apagar esta
module.exports.MatricularAlunos = async (ID_usuarios, ID_jogos, ID_turmas) => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        
        
        
        
        // Passo 0: Verificar se o jogo está ativo
        const [JogosStatus] = await conexao.execute(
            `SELECT * FROM jogos j WHERE j.ID_jogos = ? AND j.jo_status = 1`,
            [ID_jogos]
        );
        if (JogosStatus.length === 0) {
            return { status: false, message: "O jogo está inativo" };
        }
        
        const pets = await conexao.execute('SELECT * FROM pets')
       

        if(pets.length == 0){
            return{status:false, message:"Precisa cadastrar pets no sistema"}
        }

        // Passo 1: Obter os usuários matriculados
        const [usuariosMatriculados] = await conexao.execute(
            `SELECT ID_usuarios FROM jogos_matricula WHERE ID_jogos = ?`,
            [ID_jogos]
        );

        // Passo 2: Calcular o rank do novo usuário
        const rank_usuario = usuariosMatriculados.length + 1; // O novo usuário terá o próximo rank

        // Passo 3: Inserir o novo usuário no jogo
        const [linhas] = await conexao.execute(
            `INSERT INTO jogos_matricula (ID_jogos, ID_usuarios, turmas_ID_turmas, pontos_usuario, rank_usuario, peso_acumulativo) VALUES (?, ?, ?, ?, ?, ?)`,
            [ID_jogos, ID_usuarios, ID_turmas, 0, rank_usuario, 0]
        );

        // Passo 4: Alterar o tipo de acesso para jogador
        const [jogando] = await conexao.execute(
            `UPDATE usuarios SET user_tipo_acesso = 3 WHERE ID_usuarios = ?;`,
            [ID_usuarios]
        );


    

        // Passo 5: Sortear um ovo aleatório
        const ovo = sorteioComBaseNoPeso(pets[0]);  // Função sorteia o ovo com base no peso dos pets

        console.log("PetSorteado",ovo)

        // Passo 6: Criar o inventário do usuário com o ovo sorteado
        const [Inventario] = await conexao.execute(
            'INSERT INTO inventario_matricula (ID_jogos, ID_usuarios, ID_pets, pet_data, pontuacao_pet, evolucao) VALUES(?,?,?,?,?,?)',
            [ID_jogos, ID_usuarios, ovo.ID_pet, new Date().toISOString().slice(0, 19).replace('T', ' '), 0, 1]
        );

        return { status: true, message: "Jogando!" };

    } catch (error) {
        console.error("Erro ao matricular os usuários em jogosModel", error);
        if (error.code == 'ER_DUP_ENTRY') {
            return { status: false, message: "Entrada de dados dupla" };
        } else {
            return { status: false, message: "Erro Interno do servidor!" };
        }

    } finally {
        db.liberarConexao(conexao);
    }
};


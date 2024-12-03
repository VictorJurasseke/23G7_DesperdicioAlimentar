const db = require('../../db');
const pet = require('../pets')
const { sorteioComBaseNoPeso } = require('../pets');



module.exports.retornarTodosJogos = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [linhas] = await conexao.execute('SELECT j.jo_status, j.ID_jogos, j.jo_nome, j.jo_tema, j.jo_datai, j.jo_dataf, e.es_nome FROM jogos j, escola e WHERE j.ID_escola = e.ID_escola ORDER BY j.jo_datai;');
        return linhas;
    } catch (error) {
        console.error("Erro ao listar todos os jogos", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};


module.exports.retornarTodosJogosAtivos = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [linhas] = await conexao.execute('SELECT j.*, e.es_nome FROM jogos j, escola e WHERE j.ID_escola = e.ID_escola AND j.jo_status = 1 ORDER BY j.jo_datai;');
        return linhas;
    } catch (error) {
        console.error("Erro ao listar todos os jogos ATIVOS", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};

//
module.exports.retornarJogosDaEscola = async (ID_escola) => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [linhas] = await conexao.execute('SELECT j.jo_status, j.ID_jogos, j.jo_nome, j.jo_datai, j.jo_dataf, e.es_nome, j.jo_tema FROM jogos j, escola e WHERE j.ID_escola = e.ID_escola AND j.ID_escola = ? AND j.jo_status = 1 ORDER BY j.jo_datai;', [ID_escola]);
        return linhas;
    } catch (error) {
        console.error("Erro ao listar jogo especifico da escola", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};

module.exports.ApagarJogos = async (id) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        // Deletar usuários associados à escola

        // Finalmente, deletar a escola
        const [linhas] = await conexao.execute('DELETE FROM jogos WHERE ID_jogos = ?', [id]);
        return { status: true }
    } catch (error) {
        return { status: false, error: error }
        throw error // Repassa para a controller
    } finally {
        db.liberarConexao(conexao)

    }
};


module.exports.MudarStatus = async (Status, ID_jogo) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        // Deletar usuários associados à escola

        const [jogosInativos] = await conexao.execute('UPDATE jogos SET jo_status = 2 WHERE id_jogos != ?', [ID_jogo])

        // Finalmente, deletar a escola
        const [linhas] = await conexao.execute('UPDATE jogos SET jo_status = ? WHERE id_jogos = ?', [Status, ID_jogo]);


        return { status: true }
    } catch (error) {
        return { status: false, error: error }
        throw error // Repassa para a controller
    } finally {
        db.liberarConexao(conexao)

    }
};


// Participar jogo, usando id do usuario logado, tela usuario
module.exports.ParticiparJogo = async (ID_usuarios, ID_jogos, ID_turmas) => {
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

        const pets = await conexao.execute('SELECT * FROM pets')



        // Passo 5: Sortear um ovo aleatório
        const ovo = sorteioComBaseNoPeso(pets[0]);  // Função sorteia o ovo com base no peso dos pets

        console.log("PetSorteado", ovo)

        // Passo 6: Criar o inventário do usuário com o ovo sorteado
        const [Inventario] = await conexao.execute(
            'INSERT INTO inventario_matricula (ID_jogos, ID_usuarios, ID_pets, pet_data, pontuacao_pet, evolucao, pet_principal, pet_quantidade) VALUES(?,?,?,?,?,?, ?,?)',
            [ID_jogos, ID_usuarios, ovo.ID_pet, new Date().toISOString().slice(0, 19).replace('T', ' '), 0, 1, 1, 1]
        );

        return { status: true, message: "Jogando!" };

    } catch (error) {
        console.error("Erro ao tentar participar do jogo", error);
        if (error.code == 'ER_DUP_ENTRY') {
            return { status: false, message: "Entrada de dados dupla" };
        } else {
            return { status: false, message: "Erro Interno do servidor!" };
        }

    } finally {
        db.liberarConexao(conexao);
    }
};




module.exports.CriarJogo = async (unidade, jo_tema, jo_nome, jo_datai_formatada, jo_dataf_formatada, jo_status, jogos_pts_segunda, jogos_pts_terca, jogos_pts_quarta, jogos_pts_quinta, jogos_pts_sexta, jogos_pts_sabado, jogos_pts_domingo, dataMudada, valor_grama, valor_pontos, tara_prato, jo_desc) => {
    let conexao;

    try {
        conexao = await db.criarConexao();

        // Inserir nova configuração na tabela 'jogos_config'
        const [configCriada] = await conexao.execute(
            `INSERT INTO jogos_config (
                jogos_pts_segunda,
                jogos_pts_terca,
                jogos_pts_quarta,
                jogos_pts_quinta,
                jogos_pts_sexta,
                jogos_pts_sabado,
                jogos_pts_domingo,
                jogos_data_mudanca,
                valor_grama,
                valor_pontos,
                tara_prato
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                jogos_pts_segunda,
                jogos_pts_terca,
                jogos_pts_quarta,
                jogos_pts_quinta,
                jogos_pts_sexta,
                jogos_pts_sabado,
                jogos_pts_domingo,
                dataMudada,
                valor_grama,
                valor_pontos,
                tara_prato
            ]
        );

        const ID_jogos_config = configCriada.insertId; // Pega o ID da nova configuração inserida

        // Inserir novo jogo na tabela 'jogos'
        const [jogoCriado] = await conexao.execute(
            `INSERT INTO jogos (
                ID_escola,
                jo_nome,
                jo_datai,
                jo_dataf,
                ID_jogos_config,
                jo_status,
                jo_tema,
                jo_desc
            ) VALUES (?, ?, ?, ?, ?, ?,?,?)`,
            [unidade, jo_nome, jo_datai_formatada, jo_dataf_formatada, ID_jogos_config, jo_status, jo_tema, jo_desc]
        );
        if (jogoCriado && configCriada) {
            return { status: true };
        }
        return { status: false, message: "Algo deu errado!" }
    } catch (error) {
        console.error("Erro ao criar jogo:", error.message);
        if (error.errno == 1062) {
            return { status: false, message: "Você não pode adicionar duas temporadas iguais!" }
        } else {
            return { status: false, message: "Erro Interno do servidor!" }
        }
    } finally {
        db.liberarConexao(conexao);
    }
};





// Preciso de um select para tela jogadores que busca então:

// * user_nome & user_img_caminho * tur_nome tur_id &   WHERE user_tipo_acesso = 3 do jogo especifico

// * pet_principal ->  pet_evolucao & * pets


// Busca todos os jogadores do jogo atual
module.exports.BuscarJogadores = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        // Pega todos os jogadores que são jogadores e estão no jogo atual, só pra ter certeza da integridade
        const [TodosJogadores] = await conexao.execute(`
            SELECT 
                u.user_nome,
                u.user_img_caminho,
                u.ID_usuarios,
                m.turmas_ID_turmas,
                m.pontos_usuario,
                m.peso_acumulativo,
                m.rank_usuario,
                t.tur_nome,
                j.jo_nome,
                j.jo_tema,
                p.nome_pet,
                p.caminho_pet,
                p.raridade_pet,
                im.ID_inv_pets,
                im.evolucao
                FROM usuarios u
                JOIN jogos_matricula m ON u.ID_usuarios = m.ID_usuarios 
                JOIN jogos j ON j.ID_jogos = m.ID_jogos 
                JOIN inventario_matricula im ON im.ID_usuarios = u.ID_usuarios  
                JOIN pets p ON p.ID_pet = im.ID_pets 
                JOIN turmas t ON t.ID_turmas = m.turmas_ID_turmas
                WHERE u.user_tipo_acesso = 3  
                AND j.jo_status = 1  
                AND im.pet_principal = 1;  
 
        `);

        // Busca todas as turmas
        const [TodasTurmas] = await conexao.execute('SELECT * FROM turmas');

        // Retorna as informações completas
        return {
            status: true,
            TodosJogadores: TodosJogadores,  // Retorna todos os jogadores
            TodasTurmas: TodasTurmas         // Retorna todas as turmas
        };
    } catch (error) {
        console.error("Erro ao buscar informações dos jogadores", error);
        return { status: false, error: error };
    } finally {
        db.liberarConexao(conexao);
    }
};

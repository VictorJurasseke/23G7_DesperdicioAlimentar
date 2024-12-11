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
module.exports.retornarJogoEspecifico = async (ID_jogos) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        // Primeira consulta: busca o jogo específico com as informações da configuração
        const [linhasJogo] = await conexao.execute(
            `SELECT * 
             FROM jogos j
             JOIN jogos_config jc ON j.ID_jogos_config = jc.ID_jogos_config
             WHERE j.ID_jogos = ?`,
            [ID_jogos]
        );

        // Segunda consulta: busca todos os jogos (se necessário)
        const [todosJogos] = await conexao.execute('SELECT * FROM jogos');

        return linhasJogo

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

        // Muda o status dos jogadores associados para usuario 

        const [jogosInativos] = await conexao.execute('UPDATE jogos SET jo_status = 2 WHERE id_jogos != ?', [id])


        const [Matricula] = await conexao.execute('DELETE FROM jogos_matricula WHERE ID_jogos = ? ', [id])
        const [inventario] = await conexao.execute('DELETE FROM inventario_matricula WHERE ID_jogos = ?'[id])


        // Finalmente, deletar o jogo
        const [linhas] = await conexao.execute('DELETE FROM jogos WHERE ID_jogos = ?', [id]);

        return { status: true, message: "Deletou o jogo com sucesso" }
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

        // coloca os jogadores como usuarios

        const [jogosInativos] = await conexao.execute('UPDATE jogos SET jo_status = 2 WHERE id_jogos != ?', [ID_jogo])

        // Finalmente, muda o status
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



// Progresso PET
module.exports.ProgressoJogador = async (pesoComTara, QRcode) => {
    let conexao;
    let desperdicio
    console.log("Valor desperdiçado junto com a tara:", pesoComTara);
    try {
        conexao = await db.criarConexao();




        // Busca o pet que precisa evoluir no inventario do jogador do jogo atual, pra isso eu preciso do qrcode
        // pra descobrir o id do usuario e descobrir o id da matricula pra descobrir o id de inventario responsavel por ter o mascote de evolucao 1 

        const [matricula] = await conexao.execute(`
        SELECT 
            im.ID_inv_pets, 
            u.ID_usuarios,
            u.user_nome,
            j.jo_nome
        FROM 
            usuarios u
        JOIN 
            inventario_matricula im ON im.ID_usuarios = u.ID_usuarios
        JOIN 
            jogos j ON j.ID_jogos = im.ID_jogos -- Relaciona o inventário ao jogo
        WHERE 
            u.user_qrcode = ?
            AND im.evolucao = 1 
            AND j.jo_status = 1
        LIMIT 1; -- Garante que apenas um resultado seja retornado`, [QRcode])

        if (matricula.length == 0) {
            return { status: false, message: "Não foi achado nenhum usuário e mascote com este qrcode" }
        }
        console.log(matricula[0].ID_usuarios)
        console.log(matricula)

        const ID_usuarios = matricula[0].ID_usuarios
        const ID_inventario = matricula[0].ID_inv_pets

        console.log("INVENTARIO", ID_inventario)
        console.log("USUARIO", ID_usuarios)

        // Busca o jogo atual
        const [jogo] = await conexao.execute(
            "SELECT jc.*, j.ID_jogos FROM jogos j, inventario_matricula i, jogos_config jc WHERE i.ID_inv_pets = ? AND i.ID_jogos = j.ID_jogos AND j.jo_status = 1",
            [ID_inventario]
        );
        console.log(ID_inventario)
        desperdicio = pesoComTara - jogo[0].tara_prato;
        console.log("Desperdicio sem a tara:", desperdicio)
        const ID_jogo = jogo[0].ID_jogos;
        const MediaRefeicao = jogo[0].valor_grama;
        const PontosPorRefeicaoPerfeita = jogo[0].valor_pontos;
        console.log("Pontos perfeito", PontosPorRefeicaoPerfeita)

        // Multiplicador com base no dia da semana
        const diaDaSemana = new Date().getDay();
        let multiplicadorDia = 1;

        switch (diaDaSemana) {
            case 0: multiplicadorDia = jogo[0].jogos_pts_domingo; break;
            case 1: multiplicadorDia = jogo[0].jogos_pts_segunda; break;
            case 2: multiplicadorDia = jogo[0].jogos_pts_terca; break;
            case 3: multiplicadorDia = jogo[0].jogos_pts_quarta; break;
            case 4: multiplicadorDia = jogo[0].jogos_pts_quinta; break;
            case 5: multiplicadorDia = jogo[0].jogos_pts_sexta; break;
            case 6: multiplicadorDia = jogo[0].jogos_pts_sabado; break;
        }

        // Aumento de pontos
        let pontosAtribuidos = 0;
        // menor que 50 gramas de comida
        if (desperdicio <= 0.050) {
            console.log("Pontuação perfeita atingida")
            pontosAtribuidos = PontosPorRefeicaoPerfeita;
            // maior que 50gramas e menor que 200g
        } else if (desperdicio > 0.050 && desperdicio <= 0.200) {
            console.log("Pontuação média atingida")
            pontosAtribuidos = PontosPorRefeicaoPerfeita / 2;
            // maior que 200g
        } else if (desperdicio > 0.200 && desperdicio < 2) {
            console.log("não conseguiu avanço nenhum por conta do peso")
            pontosAtribuidos = 0;
        } else if (desperdicio == 99.84999999403954) {
            console.log("Evoluir forçado, colocando 1000 pontos")
            pontosAtribuidos = 1000;
        }
        console.log("Multiplicando pelo fator diario:", multiplicadorDia)
        pontosAtribuidos *= multiplicadorDia;



        console.log("Valor desperdiçado:", desperdicio)
        console.log("PONTOS por refeição perfeita:", PontosPorRefeicaoPerfeita)
        console.log("PONTOS GANHOS:", pontosAtribuidos)

        if (pontosAtribuidos > 0) {
            // Garantir que desperdicio é um número
            let desperdicioNumerico = parseFloat(desperdicio);

            // Verificar se a conversão foi bem-sucedida
            if (isNaN(desperdicioNumerico)) {
                console.error("O valor de desperdicio não é um número válido.");
                return; // Ou outro tratamento adequado
            }

            // Agora você pode usar toFixed sem problemas
            const desperdicioArredondado = desperdicioNumerico.toFixed(2);

            console.log(pontosAtribuidos, ID_jogo, ID_usuarios, desperdicioArredondado)
            // Executar a consulta SQL
            const [AvancoPet] = await conexao.execute(
                'UPDATE jogos_matricula SET pontos_usuario = pontos_usuario + ?, peso_acumulativo = peso_acumulativo + ? WHERE ID_jogos = ? AND ID_usuarios = ?;',
                [pontosAtribuidos, desperdicioArredondado, ID_jogo, ID_usuarios,]
            );
            console.log("Avanço pet:", AvancoPet)

            const [pontuacao] = await conexao.execute(
                'UPDATE inventario_matricula SET pontuacao_pet = pontuacao_pet + ? WHERE ID_inv_pets = ?',
                [pontosAtribuidos, ID_inventario]
            );

            console.log("Pontuação", pontuacao)


            const [Mascote] = await conexao.execute(
                `SELECT i.pontuacao_pet, p.ponto_pet, i.evolucao, p.nome_pet, p.ID_pet FROM inventario_matricula i, pets p WHERE i.ID_pets = p.ID_pet AND i.pontuacao_pet >= p.ponto_pet AND i.ID_inv_pets = ? AND i.evolucao = 1`,
                [ID_inventario]
            );

            if (Mascote.length > 0) {
                // Mascote pode evoluir
                await conexao.execute(
                    'UPDATE inventario_matricula SET evolucao = 2 WHERE ID_inv_pets = ?',
                    [ID_inventario]
                );

                const [petsDisponiveis] = await conexao.execute(
                    'SELECT * FROM pets WHERE ID_pet NOT IN (SELECT ID_pets FROM inventario_matricula WHERE ID_usuarios = ? AND ID_jogos = ?)',
                    [ID_usuarios, ID_jogo]
                );

                // Garantir que há pets disponíveis para o sorteio
                if (petsDisponiveis.length > 0) {
                    let sorteado = sorteioComBaseNoPeso(petsDisponiveis, Mascote[0].ID_pet);

                    // Verifica se o pet sorteado já existe no inventário
                    const [ChecarMascoteRepetido] = await conexao.execute(
                        'SELECT i.ID_inv_pets FROM inventario_matricula i WHERE i.ID_pets = ? AND i.ID_usuarios = ? AND i.ID_jogos = ?',
                        [sorteado.ID_pet, ID_usuarios, ID_jogo]
                    );

                    // Se o mascote sorteado já existe no inventário, tenta outro sorteio
                    if (ChecarMascoteRepetido.length > 0) {
                        console.log("Mascote repetido, sorteando novamente...");
                        sorteado = sorteioComBaseNoPeso(petsDisponiveis, Mascote[0].ID_pet);
                    }

                    const DataAtual = new Date().toISOString().split('T')[0];

                    // Inserir o novo mascote
                    await conexao.execute(
                        'INSERT INTO inventario_matricula (ID_jogos, ID_usuarios, ID_pets, pet_data, pontuacao_pet, evolucao, pet_quantidade, pet_principal) VALUES(?,?,?,?,?,?,?,?)',
                        [ID_jogo, ID_usuarios, sorteado.ID_pet, DataAtual, 0, 1, 1, 0]
                    );

                } else {
                    console.log("Não há novos mascotes disponíveis para sorteio.");
                }

            } else {
                console.log("O mascote ainda não evoluiu");
            }
        } else {
            console.log("O usuário não ganhou nenhum ponto, sem progresso");
        }

        return { status: true, message: "Seu pet teve seu progresso aumentado com sucesso" };

    } catch (error) {
        console.error("Erro ao aumentar o progresso dos pets", error);
        return { status: false, error: error.message };
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



//usada na tela dev rota de editar jogo
module.exports.EditarJogo = async (jogos_pts_segunda, jogos_pts_terca, jogos_pts_quarta, jogos_pts_quinta, jogos_pts_sexta, jogos_pts_sabado, jogos_pts_domingo, ID_jogos) => {
    let conexao;

    try {
        // Criando a conexão com o banco de dados
        conexao = await db.criarConexao();

        // Verificando se o jogo existe antes de tentar a atualização
        const [jogoExistente] = await conexao.execute(`
            SELECT ID_jogos_config FROM jogos WHERE ID_jogos = ?
        `, [ID_jogos]);

        if (jogoExistente.length === 0) {
            return { status: false, message: "Nenhum jogo encontrado para o ID fornecido." };
        }

        // Recuperando o ID_jogos_config para a atualização
        const ID_jogos_config = jogoExistente[0].ID_jogos_config;

        // Executando a consulta de atualização
        const [result] = await conexao.execute(`
            UPDATE jogos_config
            SET 
                jogos_pts_segunda = ?,
                jogos_pts_terca = ?,
                jogos_pts_quarta = ?,
                jogos_pts_quinta = ?,
                jogos_pts_sexta = ?,
                jogos_pts_sabado = ?,
                jogos_pts_domingo = ?
            WHERE ID_jogos_config = ?
        `, [
            jogos_pts_segunda,
            jogos_pts_terca,
            jogos_pts_quarta,
            jogos_pts_quinta,
            jogos_pts_sexta,
            jogos_pts_sabado,
            jogos_pts_domingo,
            ID_jogos_config
        ]);

        // Retornando sucesso ou erro
        if (result.affectedRows > 0) {
            return { status: true, message: "Jogo atualizado com sucesso!" };
        } else {
            return { status: false, message: "Nenhuma atualização realizada. Verifique os dados." };
        }
    } catch (error) {
        console.error("Erro ao editar o jogo:", error.message);
        if (error.errno == 1062) {
            return { status: false, message: "Você não pode adicionar duas temporadas iguais!" };
        } else {
            return { status: false, message: "Erro Interno do servidor!" };
        }
    } finally {
        // Liberando a conexão
        db.liberarConexao(conexao);
    }
};



// Preciso de um select para tela jogadores que busca então:

// * user_nome & user_img_caminho * tur_nome tur_id &   WHERE user_tipo_acesso = 3 do jogo especifico

// * pet_principal ->  pet_evolucao & * pets


// Busca todos os jogadores do jogo atual usado na tela jogadores
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
    j.ID_jogos,
    t.tur_nome,
    j.jo_status,
    j.jo_nome,
    j.jo_tema,
    p.nome_pet,
    p.caminho_pet,
    p.raridade_pet,
    im.ID_inv_pets,
    im.evolucao
FROM 
    usuarios u
JOIN 
    jogos_matricula m ON u.ID_usuarios = m.ID_usuarios 
JOIN 
    jogos j ON j.ID_jogos = m.ID_jogos 
JOIN 
    inventario_matricula im ON im.ID_usuarios = u.ID_usuarios  
JOIN 
    pets p ON p.ID_pet = im.ID_pets 
JOIN 
    turmas t ON t.ID_turmas = m.turmas_ID_turmas
WHERE 
    u.user_tipo_acesso = 3  
    AND j.jo_status = 1  
    AND im.ID_jogos = j.ID_jogos -- Adiciona a relação com o jogo atual
ORDER BY m.rank_usuario ASC

 
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


// ProgressoJogador
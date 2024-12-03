const express = require('express');
const rotas = express.Router();
const model = require("../../app/models/PetsModel");
const verificarToken = require('../middleware/autenticar');
const multer = require('multer');
const { storage } = require('../../app');  // Importando o storage configurado
const upload = multer({ storage });  // Usando o multer com a configuração de armazenamento
const db = require('../../db');
const { pets, sorteioComBaseNoPeso } = require('../pets');
const e = require('express');

// TODOS OS OVOS FODAS



module.exports.retornarPets = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [pets] = await conexao.execute('SELECT * FROM pets')
        return pets

    } catch (error) {
        console.error("Erro ao selecionar todos os pets:", error)
    }
    finally {
        db.liberarConexao(conexao)
    }
}


module.exports.CriarPet = async (nome_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet) => {
    let conexao;

    console.log("Antes do sql", { nome_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet })
    try {
        conexao = await db.criarConexao();
        const [pets] = await conexao.execute('INSERT INTO pets(nome_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet) VALUES (?,?,?,?,?,?)',
            [nome_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet]);
        return pets;
    } catch (error) {
        console.error("Erro ao criar pet!", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};


module.exports.ApagarPet = async (id, nome) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        const [linhas] = await conexao.execute('DELETE FROM pets WHERE ID_pet = ?', [id]);
        return { status: true, message: "Pet deletado com sucesso!" }
    } catch (error) {
        return { status: false, error: error }
        throw error // Repassa para a controller
    } finally {
        db.liberarConexao(conexao)

    }
};


module.exports.CriarPetPadrao = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        for (const pet of pets) {
            const { nome_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet } = pet;
            await conexao.execute(
                `INSERT INTO pets (nome_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [nome_pet, caminho_pet, desc_pet, ponto_pet, raridade_pet, peso_pet]
            );
        }

        return { status: true, message: "Todos os pets foram inseridos com sucesso!" };
    } catch (error) {
        console.error("Erro ao inserir os pets", error);
        return { status: false, error: error.message };
    } finally {
        db.liberarConexao(conexao);
    }
};



// PROCURAR TELA PERFIL Procura todos os ultimos mascotes que já passaram por evolução

// Procura qual os pets que o usuario possui, e verifica se ele já esta em sua forma final, se o mascote chegou neste ponto, ele deveria ganhar um mascote novo
module.exports.ProcurarPetJogo = async (ID_usuarios) => {
    let conexao;
    try {

        console.log("ID DO USUARIO",ID_usuarios)


        conexao = await db.criarConexao();

        // Passo 1: Obter o jogo em que o usuário está participando e atualmente ativo
        const [Jogo] = await conexao.execute(
            'SELECT j.ID_jogos, j.jo_nome, j.jo_tema FROM jogos j, jogos_matricula m WHERE m.ID_usuarios = ? AND m.ID_jogos = j.ID_jogos AND j.jo_status = 1',
            [ID_usuarios]
        );

        console.log("Informações do jogo do usuário:", Jogo[0])

        // Passo 2: Obter os pets do usuário e ordenar pelo ultimo 
        const [Pets] = await conexao.execute(
            'SELECT p.nome_pet, p.caminho_pet, p.ID_pet, i.pontuacao_pet, p.raridade_pet, i.ID_inv_pets, i.pet_quantidade, i.pet_principal, p.ponto_pet, p.desc_pet, i.evolucao FROM inventario_matricula i, pets p WHERE i.ID_pets = p.ID_pet AND i.ID_usuarios = ? AND i.ID_jogos = ? ORDER BY i.ID_inv_pets DESC;',
            [ID_usuarios, Jogo[0].ID_jogos]
        );

        if(Pets.length == 0){
            return{status:false, message:`O usuário de ID:${ID_usuarios}, não possui nenhum mascote a ser procurado`,  }
        }

        

        console.log("Pets do usuário:", Pets);

        // Passo 3: Contar o total de mascotes disponíveis na tabela pets
        const [TotalMascotes] = await conexao.execute(
            'SELECT COUNT(*) AS total_mascotes FROM pets',
            []
        );

        // Passo 4: Contar o número de mascotes que o usuário possui no jogo
        const [MascotesColetados] = await conexao.execute(
            'SELECT COUNT(DISTINCT i.ID_pets) AS mascotes_coletados FROM inventario_matricula i WHERE i.ID_usuarios = ? AND i.ID_jogos = ?;',
            [ID_usuarios, Jogo[0].ID_jogos]
        );

        // Passo 5: Verificiar qual o rank atual do usuário com seu id de usuário e id_jogo atual
        const [RankJogoAtual] = await conexao.execute(
            'SELECT m.rank_usuario, m.pontos_usuario, m.turmas_ID_turmas FROM jogos_matricula m WHERE m.ID_usuarios = ? AND m.ID_jogos = ?;',
            [ID_usuarios, Jogo[0].ID_jogos]
        );

        // Passo 6: Busca o rank do usuário
        const [TurmasJogador] = await conexao.execute(
            `SELECT tur_nome FROM turmas WHERE ID_turmas = ?`, [RankJogoAtual[0].turmas_ID_turmas]
        )

        //Passo 7: Seleciona o pet principal do usuário neste jogo
        const [ID_Pet] = await conexao.execute('SELECT i.ID_pets, i.evolucao FROM inventario_matricula i, jogos j WHERE pet_principal = 1 AND i.ID_usuarios = ? AND j.ID_jogos = i.ID_jogos AND j.ID_jogos = ?', [ID_usuarios, Jogo[0].ID_jogos])


        console.log("id do pet:", ID_Pet[0].ID_pets)

        const [info_pet] = await conexao.execute('SELECT * FROM pets WHERE ID_pet = ?', [ID_Pet[0]?.ID_pets])

        const MascotePrincipal = { ...info_pet[0], evolucao: ID_Pet[0]?.evolucao }

        console.log("Mostrar informação do pet principal", MascotePrincipal)

        console.log("RANK DO USUÁRIO:", RankJogoAtual[0].rank_usuario)

        // Retorna a quantidade de mascotes coletados e o total de mascotes 1/114
        const mascotesStatus = `${MascotesColetados[0].mascotes_coletados}/${TotalMascotes[0].total_mascotes}`;

        // Retorna o resultado com a quantidade de mascotes coletados
        return {
            status: true,
            message: "Pets selecionados com sucesso!",
            pets: Pets,
            jo_nome: Jogo[0].jo_nome,
            jo_tema: Jogo[0].jo_tema,
            mascotesStatus: mascotesStatus, // Exemplo: "150/200"
            RankJogoAtual: RankJogoAtual[0].rank_usuario,
            PontosUsuario: RankJogoAtual[0].pontos_usuario,
            TurmasUsuario: TurmasJogador[0].tur_nome,
            ID_Jogos: Jogo[0].ID_jogos,
            PetPrincipal:MascotePrincipal
        };
    } catch (error) {
        console.error("Erro ao procurar pets:", error);
        return { status: false, error: error };
    } finally {
        db.liberarConexao(conexao);
    }
};






// APENAS SIMULA O PROGRESSO DO PET, FALTA REGISTRAR POR QRCODE E NÃO POR ID
module.exports.ProgressoPet = async (desperdicio, ID_inventario, ID_usuarios) => {
    console.log("Valor desperdiçado:", desperdicio);
    let conexao;
    try {
        conexao = await db.criarConexao();

        const [jogo] = await conexao.execute(
            "SELECT jc.*, j.ID_jogos FROM jogos j, inventario_matricula i, jogos_config jc WHERE i.ID_inv_pets = ? AND i.ID_jogos = j.ID_jogos AND j.jo_status = 1",
            [ID_inventario]
        );

        const ID_jogo = jogo[0].ID_jogos;
        const MediaRefeicao = jogo[0].valor_grama;
        const PontosPorRefeicaoPerfeita = jogo[0].valor_pontos;

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
        if (desperdicio <= 0.050) {
            pontosAtribuidos = PontosPorRefeicaoPerfeita;
        } else if (desperdicio > 0.050 && desperdicio <= 0.200) {
            pontosAtribuidos = PontosPorRefeicaoPerfeita / 2;
        } else if (desperdicio > 0.200 && desperdicio < 2) {
            pontosAtribuidos = 0;
        } else if (desperdicio == 100) {
            pontosAtribuidos = 1000;
        }

        pontosAtribuidos *= multiplicadorDia;

        console.log("Valor desperdiçado:",desperdicio)
    

        if (pontosAtribuidos > 0) {
            await conexao.execute(
                'UPDATE jogos_matricula SET pontos_usuario = pontos_usuario + ? WHERE ID_jogos = ? AND ID_usuarios = ? AND peso_acumulativo ?',
                [pontosAtribuidos, ID_jogo, ID_usuarios, desperdicio]
            );

            await conexao.execute(
                'UPDATE inventario_matricula SET pontuacao_pet = pontuacao_pet + ? WHERE ID_inv_pets = ?',
                [pontosAtribuidos, ID_inventario]
            );

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
            console.log("O usuário não ganhou nenhum ponto");
        }

        return { status: true, message: "Seu pet teve seu progresso aumentado com sucesso" };

    } catch (error) {
        console.error("Erro ao aumentar o progresso dos pets", error);
        return { status: false, error: error.message };
    } finally {
        db.liberarConexao(conexao);
    }
};







module.exports.MudarPrincipal = async (ID_inventario, ID_usuarios) => {

    let conexao;
    try {
        conexao = await db.criarConexao();


        const [TirarAntigoPrincipal] = await conexao.execute(`
            UPDATE inventario_matricula SET pet_principal = 0 WHERE ID_inv_pets != ? AND ID_usuarios = ?`
            , [ID_inventario, ID_usuarios])

        const [UpdateInventario] = await conexao.execute(
            `UPDATE inventario_matricula SET pet_principal = 1 WHERE ID_inv_pets = ?`,
            [ID_inventario]
        );

        console.log(TirarAntigoPrincipal)

        console.log(UpdateInventario)

        if (TirarAntigoPrincipal && UpdateInventario) {
            return { status: true, message: "Mascote selecionado como principal com sucesso!" };

        } else {
            return { status: false, message: "Algo deu errado!" }
        }
    } catch (error) {
        console.error("Erro ao inserir os pets", error);
        return { status: false, error: error.message };
    } finally {
        db.liberarConexao(conexao);
    }
};


module.exports.BuscarMascotePrincipalUsuario = async (ID_usuarios, ID_jogo) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        console.log("Informação dos parametros:", ID_usuarios, ID_jogo)

        // Toda vez que alguem sair de algum jogo, ou seja se o campo user_tipo_Acesso mudar preciso colocar todos os campos de pet principal para 0, resetando o pet principal escolhido pelo usuario, assim não necessario um filtro maior?
        const [ID_Pet] = await conexao.execute('SELECT i.ID_pets, i.evolucao FROM inventario_matricula i, jogos j WHERE pet_principal = 1 AND i.ID_usuarios = ? AND j.ID_jogos = i.ID_jogos AND j.ID_jogos = ?', [ID_usuarios, ID_jogo])

        console.log("ID:", ID_Pet)

        console.log("id do pet:", ID_Pet[0].ID_pets)

        const [info_pet] = await conexao.execute('SELECT * FROM pets WHERE ID_pet = ?', [ID_Pet[0]?.ID_pets])

        

        console.log("Buscando")
        if (info_pet.length > 0) {
            return { status: true, message: "A busca do pet foi concluida com sucesso!", pet: info_pet.push(ID_Pet.evolucao) };
        } else {
            return { staus: false, message: "O usuário não tem um mascote principal definido" }
        }
    } catch (error) {
        console.error("Erro ao inserir os pets", error);
        return { status: false, error: error.message };
    } finally {
        db.liberarConexao(conexao);
    }
};



// Função que apaga todos os pets cadastrado no sistema
module.exports.ApagarTodosPets = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        const [inventario_matricula] = await conexao.execute('SELECT * FROM inventario_matricula')
        if(inventario_matricula.length > 0){
            return {status:false, message:'Você não pode deletar todos os pets caso eles estejam sendo usados'}
        }

        const [linhas] = await conexao.execute('DELETE FROM pets');
        return { status: true, message: "Todos os pets foram deletado com sucesso!" }
    } catch (error) {
        return { status: false, error: error }
        throw error // Repassa para a controller
    } finally {
        db.liberarConexao(conexao)

    }
};

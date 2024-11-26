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
        conexao = await db.criarConexao();

        // Passo 1: Obter o jogo em que o usuário está participando
        const [Jogo] = await conexao.execute(
            'SELECT j.ID_jogos, j.jo_nome FROM jogos j, jogos_matricula m WHERE m.ID_usuarios = ? AND m.ID_jogos = j.ID_jogos AND j.jo_status = 1',
            [ID_usuarios]
        );

        // Passo 2: Obter os pets do usuário
        const [Pets] = await conexao.execute(
            'SELECT p.nome_pet, p.caminho_pet, p.ID_pet, i.pontuacao_pet, p.raridade_pet, i.ID_inv_pets, i.pet_quantidade, i.pet_principal, p.ponto_pet, p.desc_pet, i.evolucao FROM inventario_matricula i, pets p WHERE i.ID_pets = p.ID_pet AND i.ID_usuarios = ? AND i.ID_jogos = ? ORDER BY i.ID_inv_pets DESC LIMIT 9;',
            [ID_usuarios, Jogo[0].ID_jogos]
        );

        console.log("Pets do usuário:", Pets);

        // Passo 3: Contar o total de mascotes disponíveis
        const [TotalMascotes] = await conexao.execute(
            'SELECT COUNT(*) AS total_mascotes FROM pets',
            []
        );

        // Passo 4: Contar o número de mascotes que o usuário possui no jogo
        const [MascotesColetados] = await conexao.execute(
            'SELECT COUNT(DISTINCT i.ID_pets) AS mascotes_coletados FROM inventario_matricula i WHERE i.ID_usuarios = ? AND i.ID_jogos = ?;',
            [ID_usuarios, Jogo[0].ID_jogos]
        );

        // Retorna a quantidade de mascotes coletados e o total de mascotes
        const mascotesStatus = `${MascotesColetados[0].mascotes_coletados}/${TotalMascotes[0].total_mascotes}`;

        // Retorna o resultado com a quantidade de mascotes coletados
        return {
            status: true,
            message: "Pets selecionados com sucesso!",
            pets: Pets,
            jo_nome: Jogo[0].jo_nome,
            mascotesStatus: mascotesStatus, // Exemplo: "150/200"
        };

    } catch (error) {
        console.error("Erro ao procurar pets:", error);
        return { status: false, error: error };
    } finally {
        db.liberarConexao(conexao);
    }
};

// Função que verifica a raridade do mascote para trocar a cor do ovo:


// for (let pet of Pets) {
//     const [PontoEvoPet] = await conexao.execute(
//         'SELECT ponto_pet FROM pets WHERE ID_pet = ?',
//         [pet.ID_pet]
//     );

//     //Ponto para evoluir o mascote
//     const pontoEvolucao = PontoEvoPet[0].ponto_pet;

//     if (pet.pontuacao_pet >= pontoEvolucao) {
//         if (pet.evolucao === 1) {
//             console.log("O mascote acabou de evoluir!!!");
//             pet.evolucao = 2;
//         } else if (pet.evolucao === 2) {
//             console.log("O mascote já passou por uma evolução!");
//             pet.evolucao = 3; // Pet evolui para o nível 3
//         }

//         await conexao.execute(
//             'UPDATE inventario_matricula SET evolucao = ? WHERE ID_usuarios = ? AND ID_pets = ?',
//             [pet.evolucao, ID_usuarios, pet.ID_pet]
//         );
//     } else {
//         pet.evolucao = 1;
//         pet.caminho_pet = TrocarOvo(pet.raridade_pet);
//         pet.nome_pet = 'Egg';
//         await conexao.execute(
//             'UPDATE inventario_matricula SET evolucao = 1 WHERE ID_usuarios = ? AND ID_pets = ?',
//             [ID_usuarios, pet.ID_pet]
//         );
//     }
// }







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

        if (pontosAtribuidos > 0) {
            await conexao.execute(
                'UPDATE jogos_matricula SET pontos_usuario = pontos_usuario + ? WHERE ID_jogos = ? AND ID_usuarios = ?',
                [pontosAtribuidos, ID_jogo, ID_usuarios]
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





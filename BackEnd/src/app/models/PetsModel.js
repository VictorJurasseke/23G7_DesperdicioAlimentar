const express = require('express');
const rotas = express.Router();
const model = require("../../app/models/PetsModel");
const verificarToken = require('../middleware/autenticar');
const multer = require('multer');
const { storage } = require('../../app');  // Importando o storage configurado
const upload = multer({ storage });  // Usando o multer com a configuração de armazenamento
const db = require('../../db');
const { pets } = require('../pets');

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

        const ID_jogos = Jogo[0].ID_jogos;
        const jo_nome = Jogo[0].jo_nome;

        // Passo 2: Obter os pets do usuário
        const [Pets] = await conexao.execute(
            'SELECT p.nome_pet, p.caminho_pet, p.ID_pet, i.pontuacao_pet, p.raridade_pet, i.ID_inv_pets, p.ponto_pet, i.evolucao FROM inventario_matricula i, pets p WHERE i.ID_pets = p.ID_pet AND i.ID_usuarios = ? AND i.ID_jogos = ?;',
            [ID_usuarios, ID_jogos]
        );
        console.log("Pets do usuário:", Pets);



        // Função que verifica qual a raridade do mascote para trocar a cor do ovo:
        const TrocarOvo = (raridade) => {
            let CaminhoOvo;
            switch (raridade) {
              case "Comum":
                CaminhoOvo = "EggComum.gif";  // Azul
                break;
              case "Raro":
                CaminhoOvo = "EggRaro.gif";  // Laranja
                break;
              case "Épico":
                CaminhoOvo = "EggEpico.gif";  // Roxo
                break;
              case "Lendário":
                CaminhoOvo = "EggLendario.gif";  // Dourado
                break;
              default:
                CaminhoOvo = "Egg.gif";  // CaminhoOvo padrao (caso o tipo nao seja reconhecido)
            }
            return CaminhoOvo;
          };

        // Passo 3: Verificar a pontuação de evolução de cada pet
        for (let pet of Pets) {

            // Acha o valor de pontuação do pet especifico pertencente ao usuario
            const [PontoEvoPet] = await conexao.execute(
                'SELECT ponto_pet FROM pets WHERE ID_pet = ?',
                [pet.ID_pet]
            );

            console.log(pet.evolucao)
            // Verifica se a pontuação do pet é suficiente para evoluir
            if (pet.pontuacao_pet >= PontoEvoPet[0].ponto_pet && pet.evolucao === 1) {
                console.log("O mascote acabou de evoluir!!! usando valor evolucao 2 para simular primeira vez, necessario dar um novo ovo para o usuario!");
                
                // Altera na função atual e no banco, para a proxima chamada!
                pet.evolucao = 2
                await conexao.execute(
                    'UPDATE inventario_matricula SET evolucao = 2 WHERE ID_usuarios = ? AND ID_pets = ?',
                    [ID_usuarios, pet.ID_pet]
                );
           
            } else if (pet.evolucao == 2) {
               
                console.log("O mascote já passou por uma evolução, não será necessário simular primeira vez");

                pet.evolucao = 3; // Pet evolui para o nível 3 não é necessario nenhuma mudança no front
                await conexao.execute(
                    'UPDATE inventario_matricula SET evolucao = 3 WHERE ID_usuarios = ? AND ID_pets = ?',
                    [ID_usuarios, pet.ID_pet]
                );

               
            } else if(pet.evolucao == 3){
                console.log('Evoluido')
            }else{
                pet.caminho_pet = 'Egg.gif'
                pet.nome_pet = 'Egg'
            }

        }

        // Retorna os pets com a informação de se podem evoluir ou não, com o nome e imagem alterados se necessário
        return {
            status: true,
            message: "Pets selecionados com sucesso!",
            pets: Pets,
            jo_nome: jo_nome,
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

        // Preciso saber a configuração do jogo para poder dar os pontos corretamente
        const [jogo] = await conexao.execute(
            "SELECT jc.*, j.ID_jogos FROM jogos j, inventario_matricula i, jogos_config jc WHERE i.ID_inv_pets = ? AND i.ID_jogos = j.ID_jogos AND j.jo_status = 1",
            [ID_inventario]
        );

        console.log(jogo[0]);

        // Valor grama é a média de uma refeição - pode ser usada para relatório
        console.log(jogo[0].valor_grama);
        const MediaRefeicao = jogo[0].valor_grama;

        // Pontos dado na configuração do jogo!
        const PontosPorRefeicaoPerfeita = jogo[0].valor_pontos;

        // Lógica de multiplicador diário
        const diaDaSemana = new Date().getDay(); // Obtém o dia da semana (0 - domingo, 1 - segunda, ... 6 - sábado)

        let multiplicadorDia = 1; // Valor default para multiplicador (caso não haja multiplicador específico)

        switch (diaDaSemana) {
            case 0: // Domingo
                multiplicadorDia = jogo[0].jogos_pts_domingo;
                break;
            case 1: // Segunda
                multiplicadorDia = jogo[0].jogos_pts_segunda;
                break;
            case 2: // Terça
                multiplicadorDia = jogo[0].jogos_pts_terca;
                break;
            case 3: // Quarta
                multiplicadorDia = jogo[0].jogos_pts_quarta;
                break;
            case 4: // Quinta
                multiplicadorDia = jogo[0].jogos_pts_quinta;
                break;
            case 5: // Sexta
                multiplicadorDia = jogo[0].jogos_pts_sexta;
                break;
            case 6: // Sábado
                multiplicadorDia = jogo[0].jogos_pts_sabado;
                break;
            default:
                multiplicadorDia = 1; // Caso o valor de `getDay()` não seja válido da multiplicador de 1
        }

        // Pega o id do jogo e guarda nesta variavel
        const ID_jogo = jogo[0].ID_jogos;
        console.log(ID_usuarios);

        // Atualiza o peso acumulativo do usuário no jogos_matricula
        const [PesoAcumulativoSoma] = await conexao.execute(
            'UPDATE jogos_matricula SET peso_acumulativo = peso_acumulativo + ? WHERE ID_jogos = ? AND ID_usuarios = ?',
            [desperdicio, ID_jogo, ID_usuarios]
        );
        console.log("Peso acumulativo", PesoAcumulativoSoma);

        // Verifica o desperdício e aplica os pontos conforme a regra
        let pontosAtribuidos = 0;

        if (desperdicio <= 50) {
            // Desperdício mínimo, ganha pontuação máxima
            pontosAtribuidos = PontosPorRefeicaoPerfeita;
        } else if (desperdicio > 50 && desperdicio <= 200) {
            // Desperdício moderado, ganha metade dos pontos
            pontosAtribuidos = (PontosPorRefeicaoPerfeita / 2);
            console.log("Meio coiso-suposto 5", pontosAtribuidos)
        } else {
            // Desperdício alto, não ganha pontos
            pontosAtribuidos = 0;
        }

        // Aplica o multiplicador diário à pontuação
        pontosAtribuidos *= multiplicadorDia;

        // Atualiza os pontos do usuário com a pontuação calculada, se houver alguma mudança
        if (pontosAtribuidos > 0) {

            // Soma os pontos do usuario em total em sua matricula, ou sejá quantidade de pontos usadas no rank
            await conexao.execute(
                'UPDATE jogos_matricula SET pontos_usuario = pontos_usuario + ? WHERE ID_jogos = ? AND ID_usuarios = ?',
                [pontosAtribuidos, ID_jogo, ID_usuarios]
            );

            // Soma os pontos que o ovo ganhou para poder ser chocado

            await conexao.execute(
                'UPDATE inventario_matricula SET pontuacao_pet = pontuacao_pet + ? WHERE ID_jogos = ? AND ID_usuarios = ?',
                [pontosAtribuidos, ID_jogo, ID_usuarios]
            );
        }

        const [pontuacao_final] = await conexao.execute(
            'SELECT pontuacao_pet FROM inventario_matricula WHERE ID_jogos = ? AND ID_usuarios = ?',
            [ID_jogo, ID_usuarios]
        );


        return { status: true, message: "Seu pet teve seu progresso aumentado com sucesso", pontucao_final: pontuacao_final[0].pontuacao_pet };
    } catch (error) {
        console.error("Erro ao inserir os pets", error);
        return { status: false, error: error.message };
    } finally {
        db.liberarConexao(conexao);
    }
};


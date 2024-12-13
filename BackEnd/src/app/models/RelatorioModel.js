const db = require('../../db');




{/* Buscar emm todos jogos a soma de todos os pesos acumulados em cada turma, devolver um array com todas as turmas, o peso de total de cada uma, e a escola */ }
module.exports.retornarTotalAnual = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        // Vai retornar o desperdicio total em KG sem filtrar por turma  
        // # tur_nome, total_desperdicio
        // 3 EM, 100.10000305250287

        const [TotalAnual] = await conexao.execute(`
            SELECT t.tur_nome, SUM(jm.peso_acumulativo) AS total_desperdicio
            FROM jogos_matricula jm
            JOIN turmas t ON jm.turmas_ID_turmas = t.ID_turmas
            GROUP BY t.tur_nome;
        `);
        const turmas = [];
        const desperdicio = [];

        TotalAnual.forEach(row => {
            turmas.push(row.tur_nome);
            desperdicio.push(row.total_desperdicio);
        });

        console.log(turmas); // ['3EM', '2EM', '1EM']
        console.log(desperdicio); // [4.3, 4.3, 8.4]
        return { status: true, message: "Busca realizada com sucesso", turmas: turmas, desperdicio }
    } catch (error) {
        console.error("Erro ao buscar informações do relatorio anual", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};




module.exports.retornarTotalTemporadas = async () => {
    let conexao;
    try {
        // Cria a conexão com o banco de dados
        conexao = await db.criarConexao();

        // Executa a consulta SQL ajustada
        const [TotalTemporada] = await conexao.execute(`
            SELECT 
                j.jo_nome AS temporada,  
                t.tur_nome AS turma,     
                SUM(jm.peso_acumulativo) AS total_desperdicio  
            FROM 
                jogos_matricula jm  
            JOIN 
                turmas t ON jm.turmas_ID_turmas = t.ID_turmas  
            JOIN 
                jogos j ON jm.ID_jogos = j.ID_jogos  
            GROUP BY 
                j.jo_nome, t.tur_nome, j.jo_datai
            ORDER BY 
                j.jo_datai;

        `);

        // Armazenando o resultado por temporada
        const resultados = {};

        TotalTemporada.forEach(row => {
            const temporada = row.temporada;
            const turma = row.turma.replace(" ", "").toUpperCase(); // Remove espaço e formata turma
            const desperdicio = row.total_desperdicio;

            // Verifica se a temporada já existe no objeto, se não, cria
            if (!resultados[temporada]) {
                resultados[temporada] = {
                    jo_nome: temporada,
                    turmas: [],
                    desperdicio: []
                };
            }

            // Adiciona a turma e o desperdício aos arrays
            resultados[temporada].turmas.push(turma);
            resultados[temporada].desperdicio.push(desperdicio);
        });

        // Converte o objeto para o formato desejado
        const output = Object.values(resultados).map(item => ({
            jo_nome: item.jo_nome,
            turmas: item.turmas,
            desperdicio: item.desperdicio
        }));

        console.log(output); // Exibe os resultados no formato desejado

        return {
            status: true,
            message: "Busca das temporadas realizada com sucesso",
            resultados: output
        };
    } catch (error) {
        console.error("Erro ao buscar informações do relatorio por temporadas", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};

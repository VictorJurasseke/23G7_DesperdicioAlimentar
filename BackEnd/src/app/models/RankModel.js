
const db = require('../../db');
// peso_acumulativo = { Peso_Acumulativo }
// turma = { TurmasUsuario }
// nome_pet = { PetPrincipal.nome_pet }
// raridade_pet = { PetPrincipal.raridade_pet }
// evolucao = { PetPrincipal.evolucao }
// QuantidadeMascote = { QuantidadeMascote }
// caminho_pet = { PetPrincipal.caminho_pet }
// img = { Dados_usuario.user_img_caminho }
// nome = { Dados_usuario.user_nome }
// rank_usuario = { jo_rank }
// pontos_usuario = { pontos }
module.exports.retornarRank = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();
     

        const [InfoJogo] = await conexao.execute(`SELECT * FROM jogos WHERE jo_status = 1`)
       

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
                j.jo_nome,
                j.jo_tema,
                j.jo_status,
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
                AND im.pet_principal = 1 
                order by m.rank_usuario ASC limit 10`);
        return {InfoRank: TodosJogadores, InfoJogo:InfoJogo};
    } catch (error) {
        console.error("Erro ao listar os ranks dos usuarios", error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};
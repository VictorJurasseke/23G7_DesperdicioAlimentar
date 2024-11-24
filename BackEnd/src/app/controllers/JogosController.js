const express = require('express');
const rotas = express.Router();
const model = require("../../app/models/JogosModel");
const verificarToken = require('../middleware/autenticar')


// Puxar todos os jogos (TEMPORADAS)
rotas.get('/', verificarToken, async (req, res) => {
    console.log("Requisição recebida em /api/jogos"); // Log
    try {
        const jogos = await model.retornarTodosJogos();
        res.json(jogos);
    } catch (error) {
        console.error("Erro ao listar os jogos", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

// Puxar todos OS JOGOS ATIVOS
rotas.get('/ativos', verificarToken, async (req, res) => {
    console.log("Requisição recebida em /api/jogos"); // Log
    try {
        const jogos = await model.retornarTodosJogosAtivos();
        res.json(jogos);
    } catch (error) {
        console.error("Erro ao listar os jogos", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});



// Puxar todos os jogos disponiveis em escola  X
rotas.get('/disp/:ID_escola', verificarToken, async (req, res) => {
    
    console.log("Requisição recebida em /api/jogos"); // Log
    console.log("Controller",req.params.ID_escola)
    try {
        const jogos = await model.retornarJogosDaEscola(req.params.ID_escola);
        res.json(jogos);
    } catch (error) {
        console.error("Erro ao listar os jogos", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

// Altera o stado do jogo
rotas.put('/mudarStatus/:statusReal/:ID_jogo', verificarToken, async (req, res) => {
    
    console.log("Requisição recebida em /api/jogos/mudarStatus"); // Log

    try {
        const jogos = await model.MudarStatus(req.params.statusReal, req.params.ID_jogo);
        res.json(jogos);
    } catch (error) {
        console.error("Erro ao listar os jogos", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});



// DELETAR ESCOLA ESPECIFICA
rotas.delete('/:id', verificarToken, async (req, res) => {
    const { id } = req.params
    console.log(id)
    console.log(`Requisição delete em /api/jogos/${id}`); // Log
    try {
        const jogos = await model.ApagarJogos(id);
        res.json(jogos);

    } catch (error) {
        console.error("Erro ao apagar um jogo", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});



// ROTA DE PARTICIPAR DO JOGO - puxa o id do usuario atual
rotas.post('/participar', verificarToken, async (req, res) => {
    // Antes era por req.params, mas foi feita mudanças no banco então muda aqui também
    let {ID_jogos, ID_turmas} = req.body
    console.log("Requisição recebida em /api/jogos/:", ID_jogos, " no id do usuario", req.info.ID_usuarios); // Log
    try {
                                                // ID DO USUARIO, ID DO JOGO QUE VAI PARTICIPAR, periodo do usuario, e a turma do usuario
        const jogos = await model.ParticiparJogo(req.info.ID_usuarios, ID_jogos, ID_turmas);
        res.json(jogos);
    } catch (error) {
        console.error("Erro ao tentar participar do jogo", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

// Criar jogo
rotas.post('/', verificarToken, async (req, res) => {
    const {
        unidade,
        jo_tema,
        jo_nome,
        jo_dataf_formatada,
        jo_datai_formatada,
        jo_status,
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
    } = req.body
    console.log("Unidade:", unidade)
    console.log("Requisição recebida em /api/jogos no id do usuario", req.info.ID_usuarios); // Log
    console.log("Controller",unidade,jo_nome,jo_datai_formatada,jo_dataf_formatada,jo_status,jogos_pts_segunda,jogos_pts_terca,jogos_pts_quarta,jogos_pts_quinta,jogos_pts_sexta,jogos_pts_sabado,jogos_pts_domingo,dataMudada,valor_grama,valor_pontos,tara_prato)
    try {
        const jogos = await model.CriarJogo(unidade,jo_tema,jo_nome,jo_datai_formatada,jo_dataf_formatada,jo_status,jogos_pts_segunda,jogos_pts_terca,jogos_pts_quarta,jogos_pts_quinta,jogos_pts_sexta,jogos_pts_sabado,jogos_pts_domingo,dataMudada,valor_grama,valor_pontos,tara_prato)
        res.json(jogos);
    } catch (error) {
        console.error("Erro ao criar jogo:", error.message);
        res.status(500).json({ error: "Erro interno do servidor", resp:error });
    }
});




module.exports = rotas;

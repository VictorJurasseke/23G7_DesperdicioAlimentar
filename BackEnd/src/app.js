const express = require('express');
const cors = require('cors');

const app = express();
const port = 3025;

app.use(cors());
app.use(express.json());
app.use("/public", express.static("./public/img"));

const ctrlUsuario = require("./app/controllers/UsuarioController");
app.use('/api/usuario', ctrlUsuario);

const ctrlJogos = require("./app/controllers/JogosController");
app.use('/api/jogos', ctrlJogos);

const ctrlTurmas = require("./app/controllers/TurmasController");
app.use('/api/turmas', ctrlTurmas);

const ctrlMatriculados = require("./app/controllers/MatriculadosController");
app.use('/api/matriculados', ctrlMatriculados);

const ctrlEscola = require("./app/controllers/EscolaController"); 
app.use('/api/escola', ctrlEscola);

const ctrlRank = require("./app/controllers/RankController");
app.use('/api/rank', ctrlRank);

const ctrlPerfil = require("./app/controllers/PerfilController");
app.use('/api/perfil', ctrlPerfil);


async function iniciarApp() {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
        console.log(`foto http://localhost:${port}/public/User.png`);
    });
}

module.exports.iniciarApp = iniciarApp;

const express = require('express');
const cors = require('cors');


const app = express();
const port = 3025;

// Configuração do CORS e JSON
app.use(cors());
app.use(express.json());



// const upload = multer({ storage });  // Middleware do Multer para gerenciar uploads

// Serve arquivos estáticos da pasta public/img; ou seja para acessar as imagens de /public/img basta escrever /public/Pet.gif
app.use("/public", express.static("./public/img"));



// Serve arquivos estáticos da pasta public/Pets 
// ou seja para acessar as imagens de /public/Pets basta escrever /public/Pet.gif
app.use("/Pets", express.static("./public/PetsClientes"));

// Controllers
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

const crtlPets = require("./app/controllers/PetsController");
const { storage } = require('./app/middleware/multer');
app.use('/api/pets', crtlPets);

// Iniciar o servidor
async function iniciarApp() {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
        console.log(`Foto de perfil disponível em http://localhost:${port}/public/User.png`);
    });
}

module.exports.iniciarApp = iniciarApp;

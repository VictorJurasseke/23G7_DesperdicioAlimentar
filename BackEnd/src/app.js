const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3025;

// Configuração do CORS e JSON
app.use(cors());
app.use(express.json());

// Definir onde os arquivos serão armazenados e como os nomes serão definidos
const uploadDir = path.join(__dirname, 'public', 'Pets');

// Verificar se a pasta existe, se não, criar
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
// Configuração do Multer para gerenciamento de uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);  // Define o diretório de upload
    },
    filename: (req, file, cb) => {
        // Garante que o nome do arquivo será único
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });  // Middleware do Multer para gerenciar uploads

// Serve arquivos estáticos da pasta public/img
app.use("/public", express.static("./public/img"));

// Serve arquivos estáticos da pasta public/Pets
app.use("/public/Pets", express.static("./public/pets"));

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
app.use('/api/pets', crtlPets);

// Iniciar o servidor
async function iniciarApp() {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
        console.log(`Foto de perfil disponível em http://localhost:${port}/public/img/User.png`);
        console.log(`Imagens de pets disponíveis em http://localhost:${port}/public/Pets/`);
    });
}

module.exports.iniciarApp = iniciarApp;

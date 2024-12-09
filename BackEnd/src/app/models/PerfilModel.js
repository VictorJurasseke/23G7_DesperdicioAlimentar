const db = require('../../db');
const validator = require('validator');
const crypto = require('crypto');

module.exports.retornarPerfil = async (id) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        // seleciona as informações do usuario do id correspondente a seu id assinado no token
        const [usuario] = await conexao.execute(
            'SELECT ID_usuarios, user_nome, user_tipo_acesso, user_periodo, user_img_caminho FROM usuarios WHERE ID_usuarios = ?',
            [id]
        );

        return usuario


    } catch (error) {
        throw error; // Repassa o erro para o controller
    } finally {
        db.liberarConexao(conexao);
    }
};

module.exports.verificarDev = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        // verifica se há algum usuario na tabela, se não houver retorna false, e mostra a tela de criar a conta dev
        const [qtd_usuario] = await conexao.execute(
            'select count(*) AS usuarios from usuarios WHERE user_tipo_acesso = 0'
        )
        return qtd_usuario

    } catch (error) {
        throw error; // Repassa o erro para o controller
    } finally {
        db.liberarConexao(conexao);
    }
};

module.exports.criarDev = async (dev_email, dev_senha, dev_confirmar_senha) => {

    let conexao;

    errors = {}
    if (!validator.isEmail(dev_email)) {
        errors.dev_email = 1 // 'E-mail inválido.';
    }

    if (!validator.isLength(dev_senha, { min: 8 })) {
        errors.dev_senha = 1 //'A senha deve ter pelo menos 8 caracteres.';
    }

    if (dev_confirmar_senha !== dev_senha) {
        errors.dev_confirmar_senha = 1 //'As senhas não coincidem.';
    }

    // Se houver erros, retorne-os
    if (Object.keys(errors).length > 0) {
        return { errors };
    }


    // Sanitizar dados
    dev_senha = validator.escape(dev_senha);
    dev_email = validator.normalizeEmail(dev_email);


    // Criptografando a senha em hexadecimal no algoritmo de sha256 para não mandar para o banco em plano branco
    let senhaHash = crypto.createHash('sha256').update(dev_senha).digest('hex');


    try {
        conexao = await db.criarConexao();

        // cria no banco o administrador 
        const [linhas] = await conexao.execute(
            'INSERT INTO usuarios(user_nome, user_email, user_senha, user_tipo_acesso, user_img_caminho, user_periodo, user_qrcode) VALUES("ADM", ?, ?, 0, "User.png", "Matutino", "0")', [dev_email, senhaHash]
        )
        return linhas
    } catch (error) {
        throw error; // Repassa o erro para o controller
    } finally {
        db.liberarConexao(conexao);
    }
};


// Funções para visitar o perfil de algum usuário

module.exports.VisitarPerfil = async (ID_usuarios, ID_jogo) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        //Informação do usuario
        const [UsuarioVisitado] = await conexao.execute(
            'SELECT ID_usuarios, user_nome, user_tipo_acesso, user_periodo, user_img_caminho FROM usuarios WHERE ID_usuarios = ?',
            [ID_usuarios]
        );

        // Informação do jogo do perfil visitado:
        // Passo 1: Obter o jogo em que o usuário está participando e atualmente ativo
        const [Jogo] = await conexao.execute(
            'SELECT j.ID_jogos, j.jo_nome, j.jo_tema FROM jogos j, jogos_matricula m WHERE j.ID_jogos = ?',
            [ID_jogo]
        );
        // Passo 2: Obter os pets do usuário e ordenar pelo ultimo 
        const [Pets] = await conexao.execute(
            'SELECT p.nome_pet, p.caminho_pet, p.ID_pet, i.pontuacao_pet, p.raridade_pet, i.ID_inv_pets, i.pet_quantidade, i.pet_principal, p.ponto_pet, p.desc_pet, i.evolucao FROM inventario_matricula i, pets p WHERE i.ID_pets = p.ID_pet AND i.ID_usuarios = ? AND i.ID_jogos = ? ORDER BY i.ID_inv_pets DESC;',
            [ID_usuarios, ID_jogo]
        );

        if (Pets.length == 0) {
            return { status: false, message: `O usuário de ID:${ID_usuarios}, não possui nenhum mascote a ser procurado`, }
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
            [ID_usuarios, ID_jogo]
        );

        // Passo 5: Verificiar qual o rank atual do usuário com seu id de usuário e id_jogo atual
        const [RankJogoAtual] = await conexao.execute(
            'SELECT m.rank_usuario, m.pontos_usuario, m.turmas_ID_turmas, m.peso_acumulativo FROM jogos_matricula m WHERE m.ID_usuarios = ? AND m.ID_jogos = ?;',
            [ID_usuarios, ID_jogo]
        );

        // Passo 6: Busca o rank do usuário
        const [TurmasJogador] = await conexao.execute(
            `SELECT tur_nome FROM turmas WHERE ID_turmas = ?`, [RankJogoAtual[0].turmas_ID_turmas]
        )

        //Passo 7: Seleciona o pet principal do usuário neste jogo
        const [ID_Pet] = await conexao.execute('SELECT i.ID_pets, i.evolucao FROM inventario_matricula i, jogos j WHERE pet_principal = 1 AND i.ID_usuarios = ? AND j.ID_jogos = i.ID_jogos AND j.ID_jogos = ?', [ID_usuarios, ID_jogo])


        //Passo 8 pegar as informações do pet principal
        const [info_pet] = await conexao.execute('SELECT * FROM pets WHERE ID_pet = ?', [ID_Pet[0]?.ID_pets])

        const MascotePrincipal = { ...info_pet[0], evolucao: ID_Pet[0]?.evolucao }

        console.log("Mostrar informação do pet principal", MascotePrincipal)

        console.log("RANK DO USUÁRIO:", RankJogoAtual[0].rank_usuario)

        const mascotesStatus = `${MascotesColetados[0].mascotes_coletados}/${TotalMascotes[0].total_mascotes}`;

       


        // Retorna tudo que compoem a tela perfil
        return {
            status: true,
            message: "Perfil visitado com sucesso!",
            pets: Pets,
            jo_nome: Jogo[0].jo_nome,
            jo_tema: Jogo[0].jo_tema,
            mascotesStatus: mascotesStatus, // Exemplo: "150/200"
            RankJogoAtual: RankJogoAtual[0].rank_usuario,
            PontosUsuario: RankJogoAtual[0].pontos_usuario,
            TurmasUsuario: TurmasJogador[0].tur_nome,
            ID_Jogos: ID_jogo,
            PetPrincipal: MascotePrincipal,
            UsuarioVisitado: UsuarioVisitado,
            peso_acumulativo:RankJogoAtual[0].peso_acumulativo
            
        };

    } catch (error) {
        throw error; // Repassa o erro para o controller
    } finally {
        db.liberarConexao(conexao);
    }
};


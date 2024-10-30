const db = require('../../db');

module.exports.retornarPerfil = async (id) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        // verifica se há algum usuario na tabela, se não houver retorna false, e mostra um coiso de criar a conta dev
        const [qtd_usuario] = await conexao.execute(
            'SELECT count(*) FROM usuarios'
        )
        if (qtd_usuario == 0) {
            return (false)
        }

        //se tiver algum usuário verificar se o usuário esta logado
        const [usuario] = await conexao.execute(
            'SELECT ID_usuarios, user_nome, user_tipo_acesso, user_periodo, user_img_caminho FROM usuarios WHERE ID_usuarios = ?',
            [id]
        );

        console.log(qtd_usuario)


        console.log(usuario)




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
            'select count(*) AS usuarios from usuarios'
        )
        return qtd_usuario

    } catch (error) {
        throw error; // Repassa o erro para o controller
    } finally {
        db.liberarConexao(conexao);
    }
};



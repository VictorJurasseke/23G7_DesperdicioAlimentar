// Arquivo responsavl por conectar e desconectar o banco 


const mysql = require('mysql2/promise');


//Configurar meu banco com os dados corretos // o password em casa é requisito
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    // password: '12345678',
    database: "Banco_Projeto_Senai_Hatch",
    port:3306,
})
// em casa ele aponta que precisa de senha :1234

function criarConexao() {
    return pool.getConnection()
}

// @param {mysql.PoolConnection} conexao 


async function liberarConexao(conexao){
    if(conexao){
        conexao.release();
    }
}

module.exports =  {
    criarConexao,
    liberarConexao
}
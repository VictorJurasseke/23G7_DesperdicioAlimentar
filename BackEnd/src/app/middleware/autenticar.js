const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// meu codigo secreto que é usado para assinar meu token
const senhaCodigoSecreto = crypto.createHash('sha256').update("94018fjsalknxz").digest('hex');


const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido.' });
    }

    // Remove o prefixo 'Bearer ' se necessário /se começar com o bearer ele tira os 7 caract 
    // caso contrario é o token "puro"
    const tokenSemBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    jwt.verify(tokenSemBearer, senhaCodigoSecreto, (erro, decoded) => {
        if (erro) {
            return res.status(401).json({ error: 'Token inválido.' });
        }
        // Se o token for válido, decodifica os dados do usuário
        req.info = decoded; // armazenar os dados do usuário para uso posterior, sempre req.user pra chamar essas informações ai
        next(); // Chama a próxima função, ("./rota", verificarToken, (req,res)=>{}) chama a arrowfunction ai
    });
};

module.exports = verificarToken
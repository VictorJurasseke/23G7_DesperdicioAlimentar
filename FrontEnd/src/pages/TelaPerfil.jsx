import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import CardPerfil from '../components/TelaPerfil/CardPerfil';
import Header from '../components/TelaHome/Header';

import { usePerfilDados } from '../components/TelaPerfil/FunctionTelaPerfil';
import LoadingComponent from '../components/TelaPerfil/LoadingComponent';
import { useNavigate } from 'react-router-dom';

import Menu_Aluno from '../components/TelaPerfil/Menu_Aluno';
import Menu_Administrador from '../components/TelaPerfil/Menu_Administrador';



const TelaPerfil = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    console.log("Carregada")
    const { Dados_usuario, verificarUsuario } = usePerfilDados(token, navigate); // Pega os dados de usuario do cliente para criar a tela
    console.log(Dados_usuario)
   
    
    useEffect(() => {
        verificarUsuario();
    }, []);






    // console.log("JOGOS DADOS", TableJogosEspecifico);
    // console.log("Dados do usuario", Dados_usuario);
    // console.log("Tela carregada");

    return (
        <>
            {Dados_usuario ? ( // Verifica se Dados_usuario não é null e se o token está correto
                <>
                    <div className="col-12 d-flex flex-column overflow-hidden text-dark min-vh-100 position-relative z-2">
                        <Header />
                        <div className="col-12 mt-5 text-dark position-relative">
                            <CardPerfil
                                nome={Dados_usuario.user_nome}
                                periodo={Dados_usuario.user_periodo}
                                img={Dados_usuario.user_img_caminho}
                                token={token}
                                navigate={navigate}
                                nivel_acesso={Dados_usuario.user_tipo_acesso}
                            />

                            <div className="text-dark position-relative">
                                {/* Se for aluno, ele mostrara os jogos disponiveis para ele participar 1 == aluno, 2 == usuario, 3 == jogador  0 == DEV  */}
                                <Menu_Aluno Dados_usuario={Dados_usuario} token={token} navigate={navigate}/>
                                <Menu_Administrador OBJ_dados={Dados_usuario}></Menu_Administrador>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <LoadingComponent /> // Mensagem de carregamento enquanto verifica se o usuário está logado
            )}
        </>
    );
};

export default TelaPerfil;

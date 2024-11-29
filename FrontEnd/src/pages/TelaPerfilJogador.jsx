// React Components
import React, { useEffect } from 'react';
//-----
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/TelaPerfilJogador/CardPerfilJogador.css'
// ----
// Componentes 
import Header from '../components/TelaHome/Header';
// ----
// Funções
import { usePerfilDados } from '../components/TelaPerfil/FunctionTelaPerfil';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeaderCardJogador from '../components/TelaPerfilJogador/HeaderCardJogador';

//-----
// Imagem de wireframe
import ImagemPerfil from '../../public/img/Perfilmagem/GarotoCorteAzul.png'
import PetPrincipal from '../../public/img/CoelhoNeymar.gif'


// Ícones



import CardInfoJogador from '../components/TelaPerfilJogador/CardInfoJogador';
import { usePetsDados } from '../components/TelaPerfil/FunctionPets';

const PerfilJogador = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // Pega os dados do usuário e função de verificação
    const { Dados_usuario, verificarUsuario } = usePerfilDados(token, navigate);

    const { TodosPetsTemporada, ProcurarPets, jo_nome, QuantidadeMascote, jo_tema, pontos, jo_rank } = usePetsDados(token, navigate);


    // Verifica as informações do usuario e tals, e procura os pets e os jogos em ProcurarPets
    useEffect(() => {
        verificarUsuario();
        ProcurarPets()
    }, []);


    return (
        <>
            {Dados_usuario ? (
        
                    Dados_usuario.user_tipo_acesso === 3 ? (
                        <>

                            <Header Dados_usuario={Dados_usuario} />

                            {/* Tela principal */}
                            <div className="col-12 p-3 d-flex vh-100 justify-content-center align-items-center bg-light">

                                {/* Card principal */}
                                <div className="col-12 col-md-10 col-lg-10 rounded shadow " style={{ backgroundColor: "#F3E8D1", marginTop: '100px' }}>

                                    {/* Header que guarda o jogo atual e os coletados */}
                                    <HeaderCardJogador jo_nome={jo_nome} QuantidadeMascote={QuantidadeMascote} />
                                    <CardInfoJogador turma={"3 EM"} QuantidadeMascote={QuantidadeMascote} img={Dados_usuario.user_img_caminho} nome={Dados_usuario.user_nome} rank_usuario={jo_rank} pontos_usuario={pontos}  />
                                </div>
                            </div>

                        </>
                    ) : (<p>Você não devia estar aqui</p>)

            ) : (
                <h1>Carregando</h1>
            )
            }
        </>

    );
};

export default PerfilJogador;

{/* Barra progresso pets coletados até o momento */ }
{/* <div className="progress mt-2 m-2" style={{ height: '25px', border: "2px solid #243447", borderRadius: '80px', backgroundColor: "#2D4A5A" }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${40}%`,
                                                backgroundColor: "#D84B4B",
                                                borderRight: "1px solid #243447",
                                                transition: 'width 0.5s ease', // Suaviza a animação
                                            }}
                                            aria-valuenow={40}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        ></div>
                                    </div> */}
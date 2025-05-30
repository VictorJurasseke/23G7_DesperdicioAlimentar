// React Components
import React, { useEffect, useState } from 'react';
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

import '../components/TelaPerfilJogador/div_pets.css'

// Componentes
import CardInfoJogador from '../components/TelaPerfilJogador/CardInfoJogador';
import { usePetsDados } from '../components/TelaPerfil/FunctionPets';
import NavBarPets from '../components/TelaPerfilJogador/NavbarPets';

const PerfilJogador = () => {


    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    // Pega os dados do usuário e função de verificação
    const { Dados_usuario, verificarUsuario } = usePerfilDados(token, navigate);


    // Dados do jogo
    const { TodosPetsTemporada, ProcurarPets, jo_nome, QuantidadeMascote, jo_tema, pontos, jo_rank, TurmasUsuario, ID_Jogos, PetPrincipal, Peso_Acumulativo } = usePetsDados(token, navigate);

    // Filtro de raridade
    const [SelectRaridade, setSelectRaridade] = useState()

    // Gatilho de função
    const [Carregando, setCarregando] = useState(false)


    // Verifica as informações do usuario e tals, e procura os pets e os jogos em ProcurarPets
    useEffect(() => {
        // Procura os pets e outras informações do jogo 
        verificarUsuario();
        ProcurarPets()
    }, []);





    return (
        <>
            {Dados_usuario ? (

                Dados_usuario.user_tipo_acesso === 3 ? (
                    <>



                        <Header Dados_usuario={Dados_usuario} corLetra={"#ffffff"}/>

                        <div className="fundoIMG min-vh-100">
                            {/* Aqui vai o conteúdo da sua página */}
                        </div>

                        {/* Tela principal */}
                        <div className="col-12 p-3 d-flex justify-content-center min-vh-100  z-1">


                            {/* Card principal */}
                            <div className="col-12 col-md-10 col-lg-10 rounded shadow z-2" style={{ backgroundColor: "#F3E8D1", transform: 'scale(0.8, 0.8)' }}>

                                {/* Header que guarda o jogo atual e os coletados */}
                                <HeaderCardJogador jo_nome={jo_nome} QuantidadeMascote={QuantidadeMascote} />
                                <div className='p-4 '>
                                    {PetPrincipal ? (
                                        <CardInfoJogador 
                                        peso_acumulativo={Peso_Acumulativo}
                                        turma={TurmasUsuario}
                                        nome_pet={PetPrincipal.nome_pet}
                                        raridade_pet={PetPrincipal.raridade_pet}
                                        evolucao={PetPrincipal.evolucao}
                                        QuantidadeMascote={QuantidadeMascote}
                                        caminho_pet={PetPrincipal.caminho_pet}
                                        img={Dados_usuario.user_img_caminho}
                                        nome={Dados_usuario.user_nome}
                                        rank_usuario={jo_rank}
                                        pontos_usuario={pontos}
                                         />) : (<h1>Não carregou</h1>)}

                                    <div className='col-12 d-flex flex-column'>

                                        {/* Filtro dos pets */}

                                        <NavBarPets token={token} navigate={navigate} TodosPetsTemporada={TodosPetsTemporada} ProcurarPets={ProcurarPets} jo_nome={jo_nome} QuantidadeMascote={QuantidadeMascote} jo_tema={jo_tema} />


                                    </div>
                                    <div>

                                    </div>

                                </div>
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
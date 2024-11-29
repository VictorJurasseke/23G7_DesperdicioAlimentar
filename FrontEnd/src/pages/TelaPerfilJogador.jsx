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
import { FaBookOpen } from "react-icons/fa";
import { BiSolidTrophy } from "react-icons/bi";
import { RiCopperCoinFill } from "react-icons/ri";
import { FaGem } from "react-icons/fa";

const PerfilJogador = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // Pega os dados do usuário e função de verificação
    const { Dados_usuario, verificarUsuario } = usePerfilDados(token, navigate);

    useEffect(() => {
        verificarUsuario();
    }, []);

    const leaves = Array.from({ length: 10 });

    return (
        <>
            {Dados_usuario ? (
                <>
                    <Header Dados_usuario={Dados_usuario} />

                    {/* Tela principal */}
                    <div className="col-12 p-3 d-flex vh-100 justify-content-center align-items-center bg-light">

                        {/* Card principal */}
                        <div className="col-12 col-md-10 col-lg-10 rounded shadow " style={{ backgroundColor: "#F3E8D1", marginTop: '100px' }}>

                            {/* Header que guarda o jogo atual e os coletados */}
                            <HeaderCardJogador jo_nome={"Temporada Primavera"} QuantidadeMascote={"26/114"} />


                            {/* Card Informações do usuario */}
                            <div className=' d-flex flex-row flex-wrap' style={{ minHeight: '200px' }}>


                                {/* Div de imagem do usuário */}
                                <div className=' col-12 col-md-4 col-lg-2   d-flex justify-content-center align-items-center '>
                                    <img
                                        src={ImagemPerfil}
                                        className="rounded-circle"
                                        alt="User"
                                        style={{ objectFit: 'cover', maxHeight: "200px" }} // Circular e ajuste de imagem
                                    />
                                </div>

                                <div style={{ color: "#243447" }} className='col-12  col-md-6 col-lg-2 p-3 text-md-center text-lg-start align-items-center  d-flex flex-column h-100'>
                                    <h1 className='jaroFont mt-2 m-0'>Victor Sales</h1>
                                    <h5 className='jaroFont m-0'>Jogador do 3 EM</h5>
                                    <h5 className='jaroFont'>Pontos: <RiCopperCoinFill />300</h5>
                                </div>


                                {/* Mascote principal */}
                                <div className='col-6 col-md-12 col-lg-4 p-3 d-flex flex-column align-items-center justify-content-center h-100'>
                                    <img
                                        src={PetPrincipal}
                                        className=""
                                        alt="PetPrincipal"
                                        style={{ objectFit: 'contain', height: "150px" }} // Circular e ajuste de imagem
                                    />
                                    <p className='text-warning fs-4 jaroFont m-0'>Neylho</p>
                                </div>

                                {/* Status no jogo atual */}
                                <div className='col-6 d-flex align-items-center flex-column  col-md-12 col-lg-4 jaroFont' style={{ color: "#243447" }}>

                                    <h2 className='m-0 h-50 d-flex justify-content-end align-items-end fs-1'><BiSolidTrophy />143º</h2>


                                    <div className='h-50 w-100 p-2 d-flex justify-content-end flex-row align-items-end'>

                                        <h2 className='m-0 d-flex align-items-center'>20/117</h2>
                                    </div>
                                </div>
                            </div>
                            {/* CARD FIM DA TELA */}

                        </div>
                    </div>
                </>
            ) : (
                <h1>Carregando...</h1>
            )}
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
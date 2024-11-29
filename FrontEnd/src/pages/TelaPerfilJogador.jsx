import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/TelaHome/Header';
import { usePerfilDados } from '../components/TelaPerfil/FunctionTelaPerfil';
import ImagemPerfil from '../../public/img/Perfilmagem/GarotoCorteAzul.png'
// Ícones
import { FaBookOpen } from "react-icons/fa";
import { RiCopperCoinFill } from "react-icons/ri";
import HeaderCardJogador from '../components/TelaPerfilJogador/HeaderCardJogador';
import '../components/TelaPerfilJogador/CardPerfilJogador.css'

const PerfilJogador = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // Pega os dados do usuário e função de verificação
    const { Dados_usuario, verificarUsuario } = usePerfilDados(token, navigate);

    useEffect(() => {
        verificarUsuario();
    }, []);

    return (
        <>
            {Dados_usuario ? (
                <>
                    <Header Dados_usuario={Dados_usuario} />

                    {/* Tela principal */}
                    <div className="col-12 p-3 d-flex vh-100 justify-content-center align-items-center bg-light">

                        {/* Card principal */}
                        <div className="col-12 col-md-6 col-lg-8 rounded shadow " style={{ backgroundColor: "#F3E8D1", marginTop: '100px' }}>

                            {/* Header que guarda o jogo atual e os coletados */}
                            <HeaderCardJogador jo_nome={"Temporada Primavera"} QuantidadeMascote={"26/114"} />
                            {/* Card Informações do usuario */}
                            <div className=' d-flex flex-row flex-wrap' style={{ height: '200px' }}>
                                <div className=' col-8 col-md-3  d-flex justify-content-center align-items-center '>
                                    <img
                                        src={ImagemPerfil}
                                        className="rounded-circle"
                                        alt="User"
                                        style={{ objectFit: 'cover', height: "200px" }} // Circular e ajuste de imagem
                                    />
                                </div>
                                <div style={{ color: "#243447" }} className='col-4  col-md-3 py-2 align-items-start  d-flex flex-column'>
                                    <h1 className='jaroFont mt-2 m-0'>Victor Sales</h1>
                                    <h5 className='jaroFont m-0'>Jogador do 3 EM</h5>
                                    <h5 className='jaroFont m-0'>Matutino</h5>
                                    <h5 className='jaroFont m-0'>143º Lugar no ranking</h5>

                                </div>

                                <div className='col-6 col-md-3 p-3'>

                                    {/* Barra progresso pets coletados até o momento */}
                                    <div className="progress mt-2 m-2" style={{ height: '10px' }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${40}%`,
                                                backgroundColor: "#28A745",
                                                transition: 'width 0.5s ease', // Suaviza a animação
                                            }}
                                            aria-valuenow={40}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        ></div>
                                    </div>
                                </div>
                                <div className='col-6  col-md-3 p-3'>
                                    Desempenho
                                </div>
                            </div>

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

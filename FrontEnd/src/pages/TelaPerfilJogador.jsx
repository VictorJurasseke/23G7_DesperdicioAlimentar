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
                        <div className="col-12 col-md-6 col-lg-8 rounded shadow vh-100" style={{ backgroundColor: "#F3E8D1" }}>
                            <HeaderCardJogador jo_nome={"Temporada Primavera"} QuantidadeMascote={"26/114"} />

                            {/* Card Informações do usuario */}
                            <div className='bg-warning  d-flex flex-row flex-wrap '>
                                <div className='bg-danger col-8 col-md-3  d-flex justify-content-center'>
                                    <img
                                        src={ImagemPerfil}
                                        className="img-fluid rounded-circle"
                                        alt="User"
                                        style={{ objectFit: 'cover', height:'150px' }} // Circular e ajuste de imagem
                                    />
                                </div>
                                <div className='col-4 bg-primary col-md-3 p-3'>
                                    <h1 className='jaroFont'>Victor</h1>
                                    <h5 className='jaroFont'>Jogador</h5>
                                </div>
                                <div className='col-4 bg-danger col-md-3 p-3'>
                                    Desempenho
                                </div>
                                <div className='col-4 bg-primary col-md-3 p-3'>
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

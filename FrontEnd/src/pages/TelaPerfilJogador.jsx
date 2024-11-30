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
import ImagemPerfil from '../../public/img/Perfilmagem/GarotoCorteAzul.png'
import PetPrincipal from '../../public/img/CoelhoNeymar.gif'



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
    const { TodosPetsTemporada, ProcurarPets, jo_nome, QuantidadeMascote, jo_tema, pontos, jo_rank, TurmasUsuario, ID_Jogos, PetPrincipal } = usePetsDados(token, navigate);

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

                        <Header Dados_usuario={Dados_usuario} />

                        {/* Tela principal */}
                        <div className="col-12 p-3 d-flex vh-100 justify-content-center align-items-center bg-dark">

                            {/* Card principal */}
                            <div className="col-12 col-md-10 col-lg-10 rounded shadow " style={{ backgroundColor: "#F3E8D1" }}>
                             
                                {/* Header que guarda o jogo atual e os coletados */}
                                <HeaderCardJogador jo_nome={jo_nome} QuantidadeMascote={QuantidadeMascote} />
                                <div className='p-4 '>
                                    {PetPrincipal ? (
                                        <CardInfoJogador turma={TurmasUsuario} QuantidadeMascote={QuantidadeMascote} caminho_pet={PetPrincipal.caminho_pet} img={Dados_usuario.user_img_caminho} nome={Dados_usuario.user_nome} rank_usuario={jo_rank} pontos_usuario={pontos} />) : (<h1>Não carregou</h1>)}

                                    <div className='col-12'>

                                        {/* Filtro dos pets */}
                                        <div className='col-12 col-md-12 col-lg-12 border-top h-100 d-flex flex-row'>
                                            <form role="search" className='col-lg-2 col-md-12'>
                                                <select
                                                    value={SelectRaridade}
                                                    onChange={(e) => setSelectRaridade(e.target.value)}
                                                    style={{ border: "2px solid #243447", color: "#243447", backgroundColor: "#d9c89f", borderRadius: '20px' }}
                                                    className="form-select form-select-sm jaroFont text-center p-1 fs-4" // Adicionado 'me-2' para margem à direita
                                                    aria-label="Default select example">
                                                    <option style={{}} value="">Todos:</option>
                                                    <option style={{}} value="1">Comum</option>
                                                    <option style={{}} value="2">Raro</option>
                                                    <option style={{}} value="3">Épico</option>
                                                    <option style={{}} value="4">Lendário</option>
                                                </select>
                                            </form>
                                        </div>
                                        <NavBarPets token={token} navigate={navigate} TodosPetsTemporada={TodosPetsTemporada} ProcurarPets={ProcurarPets} jo_nome={jo_nome} QuantidadeMascote={QuantidadeMascote} jo_tema={jo_tema}/>

                                        
                                        


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
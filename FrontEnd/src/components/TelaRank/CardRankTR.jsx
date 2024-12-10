import React from 'react';
import { MostrarOvo } from '../TelaPerfil/FunctionPets';
import { MudarFundoraridade } from '../NivelAcesso';
import { motion } from 'framer-motion';
import { MudarCorLetraRaridade } from '../TelaPerfilJogador/FunctionPets';
// import { ModalInfoJogadores } from './FunctionListarUsuario';
import { BiSolidTrophy } from "react-icons/bi";
import { RiCopperCoinFill } from 'react-icons/ri'; // Importando ícone



//posivel visualizar inventario por aqui
const CardRankTR = ({ token, navigate, user_nome, user_img_caminho, ID_usuarios, pontos_usuario, peso_acumulativo, rank_usuario, jo_nome, jo_tema, nome_pet, caminho_pet, raridade_pet, ID_inv_pets, evolucao, tur_nome, ID_jogos }) => {

    // Se a evolução for 1, mudamos a imagem e o nome para "Ovo"
    if (evolucao === 1) {
        caminho_pet = MostrarOvo(raridade_pet);
        nome_pet = "Ovo";

    }


    // <img src= className=" img-fluid" alt="..." />


    const ImagemIP = "http://localhost:3025/Pets/"


    return (
        <>
                        < div className=' d-flex flex-row flex-wrap' style={{ minHeight: '200px'}}>
                            {/* Div de imagem do usuário */}
                            {/* Status no jogo atual */}
                            <div className=' d-flex align-items-center justify-content-center flex-column col-6  col-md-6 col-lg-2 jaroFont' style={{ color: "#243447" }}>

                                <h2 style={{ fontSize: '50px' }} className='m-0 h-50 d-flex justify-content-center align-items-center'><BiSolidTrophy />{rank_usuario}º</h2>

                            </div>
                            < div className='col-12 col-sm-12 col-md-4 col-lg-3 d-flex justify-content-center align-items-center ' >
                                <img
                                    src={`http://localhost:3025/public/${user_img_caminho}`}
                                    className="rounded-circle"
                                    alt={user_img_caminho}
                                    style={{ objectFit: 'cover', maxHeight: "150px", maxWidth: "150px" }} // Circular e ajuste de imagem
                                />
                            </div >

                            <div style={{ color: "#243447" }} className='col-sm-12 lh-lg TextoSemQuebra text-sm-center  col-md-8 col-lg-3 text-md-center text-lg-start p-2  d-flex flex-column h-100'>
                                <h1 className='jaroFont m-0 fs-1'>{user_nome}</h1>
                                <h4 className='jaroFont m-0 '>Jogador do {tur_nome}</h4>
                                <h4 className='jaroFont m-0 '>
                                    {peso_acumulativo ? peso_acumulativo.toFixed(2) : '0.00'}kg desperdiçados
                                </h4>

                            </div>
                            {/* Mascote principal */}
                            <div className='col-sm-12 col-md-12 col-lg-1 d-flex flex-column align-items-center justify-content-center h-100'>
                                <img
                                    src={ImagemIP + caminho_pet}
                                    className=""
                                    alt="PetPrincipal"
                                    style={{ objectFit: 'contain', height: "150px" }} // Circular e ajuste de imagem
                                />
                                <p className='fs-4 jaroFont m-0' style={{ color: MudarCorLetraRaridade(raridade_pet) }}>{nome_pet}</p>
                            </div>

                            <div className=' d-flex align-items-center justify-content-center flex-column col-6  col-md-6 col-lg-3 jaroFont' style={{ color: "#243447" }}>

                                <h4 style={{ fontSize: '50px' }} className='jaroFont m-0  d-flex justify-content-center align-items-center'><RiCopperCoinFill />{pontos_usuario}</h4>

                            </div>





                        </div >
             
        </>

    );
};

export default CardRankTR;
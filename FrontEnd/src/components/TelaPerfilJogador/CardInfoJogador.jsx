import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { FaBookOpen } from 'react-icons/fa'; // Importando ícone
import { RiCopperCoinFill } from 'react-icons/ri'; // Importando ícone
import { motion } from 'framer-motion';
import { BiSolidTrophy } from "react-icons/bi";

const CardInfoJogador = ({token, navigate,  nome, img, pontos_usuario, rank_usuario, turma, nome_pet, caminho_pet, QuantidadeMascote}) => {


    return (
        // Card Informações do usuario
        < div className=' d-flex flex-row flex-wrap' style={{ minHeight: '200px' }}>
            {/* Div de imagem do usuário */}
            < div className=' col-12 col-md-4 col-lg-2   d-flex justify-content-center align-items-center ' >
                <img
                    src={`http://localhost:3025/public/${img}`}
                    className="rounded-circle"
                    alt="User"
                    style={{ objectFit: 'cover', maxHeight: "200px", maxWidth:"150px" }} // Circular e ajuste de imagem
                />
            </div >

            <div style={{ color: "#243447" }} className='col-12  col-md-6 col-lg-2 p-3 text-md-center text-lg-start align-items-center  d-flex flex-column h-100'>
                <h1 className='jaroFont mt-2 m-0'>{nome}</h1>
                <h5 className='jaroFont m-0'>Jogador do {turma}</h5>
                <h5 className='jaroFont'>Pontos: <RiCopperCoinFill />{pontos_usuario}</h5>
            </div>


            {/* Mascote principal */}
            <div className='col-6 col-md-12 col-lg-4 p-3 d-flex flex-column align-items-center justify-content-center h-100'>
                <img
                    src={caminho_pet}
                    className=""
                    alt="PetPrincipal"
                    style={{ objectFit: 'contain', height: "150px" }} // Circular e ajuste de imagem
                />
                <p className='text-warning fs-4 jaroFont m-0'>{nome_pet}</p>
            </div>

            {/* Status no jogo atual */}
            <div className='col-6 d-flex align-items-center flex-column  col-md-12 col-lg-4 jaroFont' style={{ color: "#243447" }}>

                <h2 className='m-0 h-50 d-flex justify-content-end align-items-end fs-1'><BiSolidTrophy />{rank_usuario}º</h2>


                <div className='h-50 w-100 p-2 d-flex justify-content-end flex-row align-items-end'>

                    <h2 className='m-0 d-flex align-items-center'>{QuantidadeMascote}</h2>
                </div>
            </div>
        </div >
    );
};

export default CardInfoJogador;

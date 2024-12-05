import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { FaBookOpen } from 'react-icons/fa'; // Importando ícone
import { RiCopperCoinFill } from 'react-icons/ri'; // Importando ícone
import { motion } from 'framer-motion';
import { BiSolidTrophy } from "react-icons/bi";
import { MostrarOvo, MudarCorLetraRaridade } from './FunctionPets';

const CardInfoJogador = ({ token, navigate, nome, img, pontos_usuario, rank_usuario, turma, nome_pet, caminho_pet, QuantidadeMascote, evolucao, raridade_pet, desc_pet }) => {


    // Se a evolução for 1, mudamos a imagem e o nome para "Ovo"
    if (evolucao === 1) {
        caminho_pet = MostrarOvo(raridade_pet);
        nome_pet = "Ovo";
        desc_pet = "Ovo misterioso"
    }

    // caminho_pet
    // : 
    // "KawaiiRabbit.gif"
    // desc_pet
    // : 
    // "A coelha fofa querida por todos!"
    // nome_pet
    // : 
    // "Kawaii"
    // peso_pet
    // : 
    // 0.07999999821186066
    // ponto_pet
    // : 
    // 100
    // raridade_pet
    // : 
    // "Épico"
    const ImagemIP = "http://localhost:3025/Pets/"

    console.log("Card perfil foi carregado caminho:", caminho_pet, img)

    return (
        // Card Informações do usuario
        < div className=' d-flex flex-row flex-wrap' style={{ minHeight: '200px' }}>
            {/* Div de imagem do usuário */}
            < div className='col-12 col-sm-12 col-md-4 col-lg-2 d-flex justify-content-center align-items-center ' >
                <img
                    src={`http://localhost:3025/public/${img}`}
                    className="rounded-circle"
                    alt={img}
                    style={{ objectFit: 'cover', maxHeight: "150px", maxWidth: "150px" }} // Circular e ajuste de imagem
                />
            </div >

            <div style={{ color: "#243447" }} className='col-sm-12 lh-lg TextoSemQuebra text-sm-center  col-md-8 col-lg-2 text-md-center text-lg-start p-2  d-flex flex-column h-100'>
                <h1 className='jaroFont m-0 fs-1'>{nome}</h1>
                <h4 className='jaroFont m-0 '>Jogador do {turma}</h4>
            </div>
            {/* Mascote principal */}
            <div className='col-sm-12 col-md-12 col-lg-2 d-flex flex-column align-items-center justify-content-center h-100'>
                <img
                    src={ImagemIP + caminho_pet}
                    className=""
                    alt="PetPrincipal"
                    style={{ objectFit: 'contain', height: "150px" }} // Circular e ajuste de imagem
                />
                <p className='fs-4 jaroFont m-0' style={{color:MudarCorLetraRaridade(raridade_pet)}}>{nome_pet}</p>
            </div>

            <div className=' d-flex align-items-center justify-content-center flex-column col-6  col-md-6 col-lg-3 jaroFont' style={{ color: "#243447" }}>

                <h4 style={{ fontSize: '50px' }} className='jaroFont m-0  d-flex justify-content-center align-items-center'><RiCopperCoinFill />{pontos_usuario}</h4>

            </div>
            {/* Status no jogo atual */}
            <div className=' d-flex align-items-center justify-content-center flex-column col-6  col-md-6 col-lg-3 jaroFont' style={{ color: "#243447" }}>

                <h2 style={{ fontSize: '50px' }} className='m-0 h-50 d-flex justify-content-center align-items-center'><BiSolidTrophy />{rank_usuario}º</h2>

            </div>





        </div >
    );
};

export default CardInfoJogador;

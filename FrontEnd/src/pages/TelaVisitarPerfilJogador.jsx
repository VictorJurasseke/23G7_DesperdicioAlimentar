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
import { useParams } from 'react-router-dom';
//-----
// Imagem de wireframe

import '../components/TelaPerfilJogador/div_pets.css'

// Componentes
import CardInfoJogador from '../components/TelaPerfilJogador/CardInfoJogador';
import { usePetsDados } from '../components/TelaPerfil/FunctionPets';
import NavBarPets from '../components/TelaPerfilJogador/NavbarPets';

const VisitarPerfilJogador = () => {
    const { id } = useParams(); // Acessa o parâmetro 'id' da URL


    const token = localStorage.getItem("token");
    const navigate = useNavigate();

   

    return (
        <>
         {id && (<h1>{id}</h1>)}
        </>

    );
};

export default VisitarPerfilJogador;

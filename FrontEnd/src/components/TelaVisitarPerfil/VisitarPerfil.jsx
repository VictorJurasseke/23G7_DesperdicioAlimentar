import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { usePerfilJogadorVisitado } from './TelaVisitarPerfilJogador';


const TelaVisitarPerfil = ({token, navigate, ID_usuarios, ID_jogos}) => {


    // Info do usuário que esta sendo visitado
    const { Dados_Visitado, BuscarVisitado } = usePerfilJogadorVisitado(token, navigate, ID_usuarios, ID_jogos)

    useEffect(()=>{
        BuscarVisitado()
    },[])
    return (
        <>
        {Dados_Visitado && (
            <h1>Alo, {Dados_Visitado.jo_nome}</h1>
        )}
        </>
    );
};

export default TelaVisitarPerfil;

// TelaRank.jsx
import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/TelaHome/Header';
import TabelaRank from '../components/TelaRank/TableRank';
import '../components/TelaRank/Rank.css';

import { useNavigate } from 'react-router-dom';
import { useImportarDadosRank } from '../components/TelaRank/FunctionRank';
import { usePerfilDados } from '../components/TelaPerfil/FunctionTelaPerfil';



const TelaRank = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");



    // Info do usuário logado
    const { Dados_usuario, verificarUsuario } = usePerfilDados(token, navigate);


    const { TableRank, BuscarRank } = useImportarDadosRank(token, navigate); // Passa token e navigate corretamente
    console.log(TableRank)


    useEffect(() => {
        BuscarRank()
        verificarUsuario()
    }, [])
    {/*      
    {jo_tema === 1 && (
       <CardVerao
      )}

      {jo_tema === 2 && (
        <CardOutono
      )}
      {jo_tema === 3 && (
        <CardInverno
      )}
      {jo_tema === 4 && (
        <CardPrimavera */
    }
    return (
        <>
            {Dados_usuario && (
                <>
                    <Header corLetra={"#000000"} Dados_usuario={Dados_usuario} />
                    <div className='d-flex flex-column min-vh-100 justify-content-center'>

                        {TableRank.length > 0 ? ( // Verifica se há dados na tabela
                            <div className='d-flex flex-column jaroFont justify-content-center align-items-center min-vh-100'>
                                {TableRank[0].jo_tema == 4 && (<h1>Primavera</h1>)}

                                {/* Primavera */}

                                <TabelaRank info={TableRank} atualizar={BuscarRank} token={token} navigate={navigate} />
                            </div>
                        ) : (
                            <p>Não há jogadores</p>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default TelaRank;

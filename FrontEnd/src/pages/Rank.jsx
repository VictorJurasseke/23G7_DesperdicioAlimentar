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
import TableRankComponente from '../components/TelaRank/TableRankComponent';

import LoadingComponent from '../components/TelaPerfil/LoadingComponent'


const TelaRank = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");



    // Info do usuário logado
    const { Dados_usuario, verificarUsuario } = usePerfilDados(token, navigate);


    const { InfoRank, BuscarRank, InfoJogo} = useImportarDadosRank(token, navigate); // Passa token e navigate corretamente



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
            {Dados_usuario && InfoJogo &&(
                <>
                    <Header corLetra={"#ffffff"} Dados_usuario={Dados_usuario} />


                    <div className="fundoIMG min-vh-100">
                        {/* Aqui vai o conteúdo da sua página */}
                    </div>

                    {InfoJogo.length > 0 ? ( // Verifica se há algum jogo ativo
                        <div className='d-flex jaroFont col-12 justify-content-center min-vh-100'>

                            <div className='col-lg-8 col-md-9 col-sm-12 shadow h-100 rounded' style={{ marginTop: "100px", marginBottom:"100px", transform:"scale(0.9,0.9)" }}>

                                {InfoRank.length > 0 ?  (
                                    <>
                                        <TableRankComponente info={InfoRank} atualizar={BuscarRank} token={token} navigate={navigate} />
                                    </>


                                ) : (<h1 className='text-light text-center'>Ainda não existe jogadores!</h1>)}
                            </div>

                            {/* Primavera */}

                        </div>
                    ) : (
                        <LoadingComponent/>
                    )}

                </>
            )}
        </>
    );
};

export default TelaRank;

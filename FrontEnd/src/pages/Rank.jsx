// TelaRank.jsx
import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/TelaHome/Header';
import TabelaRank from '../components/TelaRank/TableRank';
import TelasTrocaRank from '../components/TelaRank/TelasTrocaRank';
import LoadingComponent from '../components/TelaPerfil/LoadingComponent';
import { useNavigate } from 'react-router-dom';
import { useImportarDadosRank } from '../components/TelaRank/FunctionRank';



const TelaRank = () => {
    const [Radio, setRadio] = useState('option1');
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { TableRank, atualizar } = useImportarDadosRank(token, navigate); // Passa token e navigate corretamente
    console.log(TableRank)

    const FuncaoAlvo = (alvoCapturado) => {
        setRadio(alvoCapturado);
    };

    return (
        <>
                <>
                    <Header />
                    <div className='d-flex flex-column min-vh-100'>
                        <div style={{ height: "100px" }}></div> {/* Cabeçalho */}
                        <TelasTrocaRank FuncaoAlvo={FuncaoAlvo} />
            {TableRank.length > 0 ? ( // Verifica se há dados na tabela
                        <div className='d-flex flex-column flex-fill'>
                            <TabelaRank info={TableRank} atualizar={atualizar} token={token} navigate={navigate} />
                        </div>
                        ) : (
                           <p>Não há jogadores</p>
                        )}
                    </div>
                </>
        </>
    );
};

export default TelaRank;

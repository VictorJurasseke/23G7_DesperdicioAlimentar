

import React, { useState, useEffect } from 'react';
import TableJogosTR from './JogosTR';
import { useImportarDadosJogos, ModalCriarJogo } from './FunctionJogos';
import LoadDev from '../LoadingDev';
import { BiAddToQueue } from "react-icons/bi";

import { useNavigate } from 'react-router-dom';
import { useImportarDadosUnidade } from '../TableUnidade/FunctionUnidade';

const TableJogos = ({ token, navigate }) => {

    const { TodosJogos, BuscarJogos } = useImportarDadosJogos(token, navigate)
    const { TodasUnidade } = useImportarDadosUnidade(token, navigate)


    // Formulario responsavel por guardar todas as informações de jogos
    const [Form, setForm] = useState({})

    useEffect(() => {
        BuscarJogos()
    }, [])



    return (
        <>

            <>
                <table className="table table-striped  table-hover text-center">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nome do Jogo</th>
                            <th>Data Inicio</th>
                            <th>Data Fim</th>
                            <th>Escola Resignada</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {TodosJogos.map((item) => (
                            <TableJogosTR
                                key={item.ID_jogos}
                                id={item.ID_jogos}
                                nome={item.jo_nome}
                                dataInicio={item.jo_datai}
                                dataFim={item.jo_dataf}
                                escola={item.es_nome}
                                atualizar={BuscarJogos}
                                token={token}
                                navigate={navigate}
                            />
                        ))}
                    </tbody>
                </table>
            </>
            <div className='text-center d-flex flex-fill justify-content-center align-items-end' style={{ fontSize: '40px' }} >
                <BiAddToQueue onClick={() => ModalCriarJogo(BuscarJogos, navigate, token, Tableunidade, setForm, Form)} />
            </div>
        </>
    );
};

export default TableJogos;

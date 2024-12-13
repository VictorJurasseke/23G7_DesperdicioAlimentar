

import React, { useState, useEffect } from 'react';
import TableJogosTR from './JogosTR';
import { useImportarDadosJogos, ModalCriarJogo } from './FunctionJogos';
import LoadDev from '../LoadingDev';
import { BiAddToQueue } from "react-icons/bi";

import { useNavigate } from 'react-router-dom';
import { useImportarDadosUnidade } from '../TableUnidade/FunctionUnidade';
import { StatusJogo } from '../../NivelAcesso';




const TableJogos = ({ token, navigate }) => {

    const { TodosJogos, BuscarJogos } = useImportarDadosJogos(token, navigate)
    const { TodasUnidade, BuscarUnidades } = useImportarDadosUnidade(token, navigate)




    console.log(TodosJogos)

    // Formulario responsavel por guardar todas as informações de jogos
    const [Form, setForm] = useState({})

    useEffect(() => {
        BuscarJogos()
        BuscarUnidades()
    }, [])



    return (
        <>

            <>
                {TodosJogos.length > 0 ?
                    (

                        <table className="table table-striped table-hover text-center table-bordered shadow-sm">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Nome do Jogo</th>
                                    <th>Data Inicio</th>
                                    <th>Data Fim</th>
                                    <th>Escola Resignada</th>
                                    <th>Functions</th>
                                    <th>Status</th>

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
                                        status={StatusJogo(item.jo_status)}
                                        atualizar={BuscarJogos}
                                        token={token}
                                        navigate={navigate}
                                    />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center mt-4 alert alert-warning">
                            <strong>Não há resultados para a pesquisa...</strong>
                        </div>
                    )}
            </>
            <div className='text-center d-flex flex-fill justify-content-center align-items-end' style={{ fontSize: '40px' }} >
                <BiAddToQueue onClick={() => ModalCriarJogo(BuscarJogos, navigate, token, TodasUnidade, setForm, Form)} />
            </div>
        </>
    );
};

export default TableJogos;

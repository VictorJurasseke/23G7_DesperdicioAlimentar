

import React, {useState, useEffect} from 'react';
import TableJogosTR from './JogosTR';
import { useImportarDadosJogos, ModalCriarJogo } from './FunctionJogos';
import LoadDev from '../LoadingDev';
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useImportarDadosUnidade } from '../TableUnidade/FunctionUnidade';

const TableJogos = ({token,navigate}) => {

    const { TableJogos, atualizar } = useImportarDadosJogos(token, navigate)
    const { Tableunidade} = useImportarDadosUnidade(token, navigate)
    
    const [Form, setForm] = useState({})
    useEffect(() => {
        console.log(Form)
       }, [Form])

    return (
        <>
            {TableJogos.length === 0 && <p className='text-center'>Não foi possivel achar nenhum registro</p>}
            {TableJogos.length != 0 &&
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

                            {TableJogos.map((item) => (
                                <TableJogosTR
                                    key={item.ID_jogos}
                                    id={item.ID_jogos}
                                    nome={item.jo_nome}
                                    dataInicio={item.jo_datai}
                                    dataFim={item.jo_dataf}
                                    escola={item.es_nome}
                                    atualizar={atualizar}
                                    token={token}
                                    navigate={navigate}
                                />
                            ))}
                        </tbody>
                    </table>
                </>}
                    <div className='text-center d-flex flex-fill justify-content-center align-items-end' style={{ fontSize: '80px' }} >
                    <IoMdAdd onClick={() => ModalCriarJogo(atualizar, navigate, token, Tableunidade, setForm, Form)} />
                    </div>
        </>
    );
};

export default TableJogos;



import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import TurmaTR from './TurmasTR';
import LoadDev from '../LoadingDev';
import { useImportarDadosTurmas, ModalCriarTurma } from './FunctionTurmas';
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { BiAddToQueue } from "react-icons/bi";



const TableTurmas = ({ token, navigate }) => {

    const { TodasTurmas, BuscarTurmas } = useImportarDadosTurmas(token, navigate)

    useEffect(() => {
        BuscarTurmas()
    }, [])

    return (
        <>


            <>
                {TodasTurmas.length > 0 ? (
                    <table className="table table-striped  table-hover text-center">
                        <thead >
                            <tr>
                                <th>id</th>
                                <th>Nome da turma</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {TodasTurmas.map((item) => (
                                <TurmaTR
                                    key={item.ID_turmas}
                                    id={item.ID_turmas}
                                    nome={item.tur_nome}
                                    atualizar={BuscarTurmas}
                                    navigate={navigate}
                                    token={token}
                                />
                            ))}
                        </tbody>
                    </table>
                ) : (<p className='text-center mt-4'>Não há resultados para busca...</p>)}

                <div className='text-center d-flex flex-fill justify-content-center align-items-end' style={{ fontSize: '40px' }} >
                    <BiAddToQueue onClick={() => { ModalCriarTurma(token, navigate, BuscarTurmas) }} />
                </div>
            </>
        </>
    );
};

export default TableTurmas;



import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import TurmaTR from './TurmasTR';
import LoadDev from '../LoadingDev';
import { useImportarDadosTurmas } from './FunctionTurmas';
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';




const TableTurmas = ({token,navigate}) => {

    const { TableTurmas, atualizar } = useImportarDadosTurmas(token,navigate)

    return (
        <>
            {TableTurmas.length === 0 && <LoadDev />}
            {TableTurmas.length > 0 &&
                <>
                    <table className="table table-striped  table-hover text-center">
                        <thead >
                            <tr>
                                <th>id</th>
                                <th>Nome da turma</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {TableTurmas.map((item) => (
                                <TurmaTR
                                    key={item.ID_turmas}
                                    id={item.ID_turmas}
                                    nome={item.tur_nome}
                                    atualizar={atualizar}
                                    navigate={navigate}
                                    token={token}
                                />
                            ))}
                        </tbody>
                    </table>
                    <div className='text-center d-flex flex-fill justify-content-center align-items-end' style={{ fontSize: '80px' }} >
                        <IoMdAdd />
                    </div>
                </>}
        </>
    );
};

export default TableTurmas;

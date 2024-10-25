import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import UnidadeTR from './UnidadeTR';
import { useImportarDadosUnidade } from './FunctionUnidade';

import LoadDev from '../LoadingDev';
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';





const TableUnidade = ({token,navigate}) => {

    const { Tableunidade, atualizar } = useImportarDadosUnidade(token,navigate)



    return (
        <>
            {Tableunidade.length === 0 && <LoadDev />}
            {Tableunidade.length > 0 &&
                <>
                    <table className="table table-striped  table-hover text-center">
                        <thead>
                            <tr >
                                <th>id</th>
                                <th>Nome da escola</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Tableunidade.map((item) => (
                                <UnidadeTR
                                    key={item.ID_escola}
                                    id={item.ID_escola}
                                    nome={item.es_nome}
                                    atualizar={atualizar}
                                    token={token}
                                    navigate={navigate}
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

export default TableUnidade;

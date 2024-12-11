import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import UnidadeTR from './UnidadeTR';
import { useImportarDadosUnidade, ModalCriarUnidade } from './FunctionUnidade';
import LoadDev from '../LoadingDev';
import { BiAddToQueue } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';





const TableUnidade = ({ token, navigate }) => {

    const { TodasUnidade, BuscarUnidades } = useImportarDadosUnidade(token, navigate)



    // Chama a função de pegar os dados da unidade
    useEffect(() => {
        BuscarUnidades();
    }, []);

    return (
        <>


            <>
                {TodasUnidade.length > 0 ? (
                    <table className="table table-striped  table-hover text-center">
                        <thead>
                            <tr >
                                <th>id</th>
                                <th>Nome da escola</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {TodasUnidade.map((item) => (
                                <UnidadeTR
                                    key={item.ID_escola}
                                    id={item.ID_escola}
                                    nome={item.es_nome}
                                    BuscarUnidades={BuscarUnidades}
                                    token={token}
                                    navigate={navigate}
                                />
                            ))}
                        </tbody>
                    </table>

                ) : (<div className="text-center mt-4 alert alert-warning">
                    <strong>Não há resultados para a pesquisa...</strong>
                </div>)}
                <div className='text-center d-flex flex-fill justify-content-center align-items-end' style={{ fontSize: '40px' }}>
                    <BiAddToQueue onClick={() => { ModalCriarUnidade(token, navigate, BuscarUnidades) }} />
                </div>

            </>
        </>
    );
};

export default TableUnidade;

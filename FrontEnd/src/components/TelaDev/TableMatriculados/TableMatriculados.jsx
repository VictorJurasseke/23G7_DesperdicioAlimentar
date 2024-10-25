import React from 'react';
import MatriculadosTR from './MatriculadosTR';
import { useImportarDadosMatriculados } from './FunctionMatriculados';
import LoadDev from '../LoadingDev';
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


const TableMatriculadosComponent = ({token,navigate}) => {

    const { TableMatriculados, atualizar } = useImportarDadosMatriculados(token,navigate); // Renomeando a variável retornada

    return (
        <>
            {TableMatriculados.length === 0 && <LoadDev/>}
            {/* Se não há registros */}
            {/* Exibindo registros */}
            {TableMatriculados.length > 0 &&
                <>
                    <table className="table table-striped table-hover text-center">

                        <thead>
                            <tr>
                                <th>ID Matricula</th>
                                <th>Jogo</th>
                                <th>Usuário</th>
                                <th>Pontos Usuário</th>
                                <th>Rank</th>
                                <th>Escola</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                TableMatriculados.map((item) => (
                                    <MatriculadosTR
                                        key={item.ID_matricula}
                                        idusermat={item.ID_matricula}
                                        idjogos={item.jo_nome}
                                        idusuarios={item.user_nome}
                                        pontos_usuario={item.pontos_usuario}
                                        rank_usuario={item.rank_usuario}
                                        es_nome={item.es_nome}
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
                </>
            }
        </>
    );
};

export default TableMatriculadosComponent;

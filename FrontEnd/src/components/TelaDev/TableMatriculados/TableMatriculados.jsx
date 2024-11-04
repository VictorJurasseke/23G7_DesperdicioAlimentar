import React, {useState, useEffect} from 'react';
import MatriculadosTR from './MatriculadosTR';
import LoadDev from '../LoadingDev';
import { BiAddToQueue } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useImportarDadosMatriculados, ModalCriarMatricula } from './FunctionMatriculados';
import { useImportarDadosJogos } from '../TableJogo/FunctionJogos';
import {useImportarDadosTurmas} from '../TableTurmas/FunctionTurmas'
import {useImportarDadosUsuario} from '../TableUsuarios/FunctionUsuario'

const TableMatriculadosComponent = ({ token, navigate }) => {

    const { TodosMatriculados, BuscarTodosMatriculados, NaoMatriculados, BuscarNaoMatriculados } = useImportarDadosMatriculados(token, navigate); // Busca todos os matriculados

    const { FormMatricula, setFormMatricula } = useState({}) // Guarda todas as matriculas
    
    const { TodosJogos, BuscarJogos} = useImportarDadosJogos(token, navigate)
  
    const { TodasTurmas, BuscarTurmas} = useImportarDadosTurmas(token, navigate)

    const {TodosUsuarios, BuscarTodosUsuarios } = useImportarDadosUsuario(token, navigate)
    

    // Quando a tela carregar ele busca todas as informações do banco
    useEffect(() => {
        BuscarTodosMatriculados()
        BuscarJogos()
        BuscarTurmas()
        BuscarNaoMatriculados()
    }, [])
    
    



    return (
        <>


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

                            TodosMatriculados.map((item) => (
                                <MatriculadosTR
                                    key={item.ID_matricula}
                                    idusermat={item.ID_matricula}
                                    idjogos={item.jo_nome}
                                    idusuarios={item.user_nome}
                                    pontos_usuario={item.pontos_usuario}
                                    rank_usuario={item.rank_usuario}
                                    es_nome={item.es_nome}
                                    atualizar={BuscarTodosMatriculados}
                                    token={token}
                                    navigate={navigate}
                                />
                            ))}
                    </tbody>
                </table>
                <div className='text-center d-flex flex-fill justify-content-center align-items-end' style={{ fontSize: '40px' }} >
                    <BiAddToQueue onClick={() => ModalCriarMatricula(NaoMatriculados, navigate, token, TodosJogos, TodasTurmas) } />
                </div>
            </>

        </>
    );
};

export default TableMatriculadosComponent;

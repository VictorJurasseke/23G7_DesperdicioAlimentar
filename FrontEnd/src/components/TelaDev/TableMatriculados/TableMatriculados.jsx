import React, { useState, useEffect } from 'react';
import MatriculadosTR from './MatriculadosTR';
import LoadDev from '../LoadingDev';
import { BiAddToQueue } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useImportarDadosMatriculados, ModalCriarMatricula } from './FunctionMatriculados';
import { useImportarDadosJogos } from '../TableJogo/FunctionJogos';
import { useImportarDadosTurmas } from '../TableTurmas/FunctionTurmas';

const TableMatriculadosComponent = ({ token, navigate }) => {
    const { TodosMatriculados, BuscarTodosMatriculados, NaoMatriculados, BuscarNaoMatriculados } = useImportarDadosMatriculados(token, navigate); // Busca todos os matriculados
    
    // Guarda todas as matriculas
    const [FormMatricula, setFormMatricula] = useState({}); // Guarda todas as matriculas
    
    // Guarda todos os jogos
    const { TodosJogos, BuscarJogos } = useImportarDadosJogos(token, navigate);
    
    // Guarda todas as turmas
    const { TodasTurmas, BuscarTurmas } = useImportarDadosTurmas(token, navigate);
    
    // Quando a tela carregar ele busca todas as informações do banco
    useEffect(() => {
        BuscarTodosMatriculados();
        BuscarJogos();
        BuscarTurmas();
        BuscarNaoMatriculados();
        console.log("TODOS JOGOS", TodosJogos);
    }, []);
    
    // Guarda o filtro selecionado
    const [SelectJogo, setSelectJogo] = useState('');
    
    // Guarda a barra de pesquisa
    const [Pesquisa, setPesquisa] = useState('');
    
    // Guarda os matriculados filtrados
    const [MatriculadoFiltrado, setMatriculadoFiltrado] = useState(TodosMatriculados);
    
    // Função para filtrar os matriculados
    useEffect(() => {
        const filtered = TodosMatriculados.filter(item => 
            (item.jo_nome.toLowerCase().includes(SelectJogo.toLowerCase()) || SelectJogo === '') &&
            (item.user_nome.toLowerCase().includes(Pesquisa.toLowerCase()) || Pesquisa === '')
        );
        setMatriculadoFiltrado(filtered);
    }, [TodosMatriculados, SelectJogo, Pesquisa]);

    // Função para carregar os jogos no select
    const CarregarJogosSelect = (TodosJogos) => {
        return TodosJogos.map(jogos => (
            <option key={jogos.ID_jogos} value={jogos.ID_jogos}>
                {jogos.jo_nome}
            </option>
        ));
    };

    if (!TodosMatriculados || !TodosJogos) {
        return <LoadDev />;
    }

    return (
        <>
            <div className='col-12 d-flex justify-content-end border-bottom'>
                <div className='align-items-center text-center d-flex flex-row gap-3 position-absolute' style={{ top: '27px' }}>
                    <form className="d-flex" role="search">
                        <select
                            value={SelectJogo}
                            onChange={(e) => setSelectJogo(e.target.value)}
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="">Selecione um jogo</option>
                            {CarregarJogosSelect(TodosJogos)}
                        </select>
                    </form>
                    <form className="d-flex" role="search">
                        <input
                            value={Pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                    </form>
                </div>
            </div>
            <table className="table table-striped table-hover text-center">
                <thead>
                    <tr>
                        <th>Jogo</th>
                        <th>Usuário</th>
                        <th>Pontos Usuário</th>
                        <th>Rank</th>
                        <th>Escola</th>
                        <th>Functions</th>
                    </tr>
                </thead>
                <tbody>
                    {MatriculadoFiltrado.map((item) => (
                        <MatriculadosTR
                            key={item.ID_matricula}
                            ID_usuarios={item.ID_usuarios}
                            ID_jogos={item.ID_jogos}
                            jo_nome={item.jo_nome}
                            user_nome={item.user_nome}
                            pontos_usuario={item.pontos_usuario}
                            rank_usuario={item.rank_usuario}
                            es_nome={item.es_nome}
                            BuscarTodosMatriculados={BuscarTodosMatriculados}
                            token={token}
                            navigate={navigate}
                            BuscarNaoMatriculados={BuscarNaoMatriculados}
                        />
                    ))}
                </tbody>
            </table>
            <div className='text-center d-flex flex-fill justify-content-center align-items-end' style={{ fontSize: '40px' }}>
                <BiAddToQueue onClick={() => ModalCriarMatricula(NaoMatriculados, BuscarNaoMatriculados, navigate, token, TodosJogos, TodasTurmas, BuscarTodosMatriculados)} />
            </div>
        </>
    );
};

export default TableMatriculadosComponent;

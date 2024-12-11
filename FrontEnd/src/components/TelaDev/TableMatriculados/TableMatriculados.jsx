import React, { useState, useEffect } from 'react';
import MatriculadosTR from './MatriculadosTR';
import LoadDev from '../LoadingDev';
import { BiAddToQueue } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useImportarDadosMatriculados, ModalCriarMatricula } from './FunctionMatriculados';
import { useImportarDadosJogos } from '../TableJogo/FunctionJogos';
import { useImportarDadosTurmas } from '../TableTurmas/FunctionTurmas';
import Fuse from 'fuse.js';

const TableMatriculadosComponent = ({ token, navigate }) => {
    const { TodosMatriculados, BuscarTodosMatriculados, NaoMatriculados, BuscarNaoMatriculados } = useImportarDadosMatriculados(token, navigate);
    const { TodosJogos, BuscarJogos } = useImportarDadosJogos(token, navigate);
    const { TodasTurmas, BuscarTurmas } = useImportarDadosTurmas(token, navigate);

    useEffect(() => {
        BuscarTodosMatriculados();
        BuscarJogos();
        BuscarTurmas();
        BuscarNaoMatriculados();
    }, []);

    const [SelectJogo, setSelectJogo] = useState('');
    const [Pesquisa, setPesquisa] = useState('');
    const [MatriculadoFiltrado, setMatriculadoFiltrado] = useState(TodosMatriculados);

    const SelectSwitchJogo = (SelectJogo) => {
        switch (SelectJogo) {
            case '1':
                setMatriculadoFiltrado(TodosMatriculados.filter((Jogos) => Jogos.jo_tema === 1));
                break;
            case '2':
                setMatriculadoFiltrado(TodosMatriculados.filter((Jogos) => Jogos.jo_tema === 2));
                break;
            case '3':
                setMatriculadoFiltrado(TodosMatriculados.filter((Jogos) => Jogos.jo_tema === 3));
                break;
            case '4':
                setMatriculadoFiltrado(TodosMatriculados.filter((Jogos) => Jogos.jo_tema === 4));
                break;
            default:
                setMatriculadoFiltrado(TodosMatriculados);
        }
    }

    useEffect(() => {
        SelectSwitchJogo(SelectJogo);
        setPesquisa('');
    }, [SelectJogo, TodosMatriculados]);

    const fuseOptions = {
        keys: ['user_nome'],
        threshold: 0.4,
    };

    const fuse = new Fuse(MatriculadoFiltrado, fuseOptions);

    const FiltrarBarraPesquisa = () => {
        if (Pesquisa.trim() === '') {
            setMatriculadoFiltrado(TodosMatriculados);
            SelectSwitchJogo(SelectJogo);
        } else {
            const resultados = fuse.search(Pesquisa).map((result) => result.item);
            setMatriculadoFiltrado(resultados);
        }
    }

    useEffect(() => {
        FiltrarBarraPesquisa();
    }, [Pesquisa, TodosMatriculados]);

    if (!TodosMatriculados || !TodosJogos) {
        return <LoadDev />;
    }

    return (
        <div className="container-fluid">
            {/* Filtro e Pesquisa */}
            <div className="row justify-content-start align-items-center">
                <div className="d-flex flex-wrap justify-content-start gap-2 mb-3">
                    {/* Filtro por Jogo */}
                    <form className="d-flex flex-column flex-sm-row mb-2 mb-sm-0" role="search">
                        <select
                            value={SelectJogo}
                            onChange={(e) => setSelectJogo(e.target.value)}
                            className="form-select w-100 w-sm-auto"
                            aria-label="Filtro por Jogo"
                        >
                            <option value="">Todos:</option>
                            <option value="1">Verão</option>
                            <option value="2">Outono</option>
                            <option value="3">Inverno</option>
                            <option value="4">Primavera</option>
                        </select>
                    </form>

                    {/* Barra de Pesquisa */}
                    <form className="d-flex col-lg-4 col-12 w-sm-auto" role="search">
                        <input
                            value={Pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                            className="form-control"
                            type="search"
                            placeholder="Buscar por usuário"
                            aria-label="Search"
                        />
                    </form>
                </div>
            </div>

            {/* Tabela de Matriculados */}
            <div className="table-responsive">
                {MatriculadoFiltrado.length > 0 ? (
                    <table className="table table-striped table-hover text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th>Jogo</th>
                                <th>Usuário</th>
                                <th>Pontos Usuário</th>
                                <th>Rank</th>
                                <th>Escola</th>
                                <th>Funções</th>
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
                                    setSelectJogo={setSelectJogo}
                                />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center mt-4 alert alert-warning">
                        <strong>Não há resultados para a pesquisa...</strong>
                    </div>
                )}
            </div>

            {/* Botão Adicionar - Alinhado à direita */}
            <div className="text-center mb-3">
                <BiAddToQueue
                    onClick={() => ModalCriarMatricula(NaoMatriculados, BuscarNaoMatriculados, navigate, token, TodosJogos, TodasTurmas, BuscarTodosMatriculados)}
                    title="Adicionar Nova Matrícula"
                    style={{ cursor: 'pointer', fontSize: '40px', color: 'green' }}
                />
            </div>
        </div>
    );
}

export default TableMatriculadosComponent;

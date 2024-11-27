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
    const { TodosMatriculados, BuscarTodosMatriculados, NaoMatriculados, BuscarNaoMatriculados } = useImportarDadosMatriculados(token, navigate); // Busca todos os matriculados


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

    // Função para filtrar os matriculados
    useEffect(() => {
        SelectSwitchJogo(SelectJogo)
        console.log("tema:", SelectJogo)
        console.log("todos:", TodosMatriculados)
        setPesquisa('')
    }, [SelectJogo, TodosMatriculados]);



    // // Configurações do Fuse.js
    const fuseOptions = {
        keys: ['user_nome'], // Campos que serão pesquisados
        threshold: 0.4, // Sensibilidade da pesquisa
    };

    const fuse = new Fuse(MatriculadoFiltrado, fuseOptions);

    const FiltrarBarraPesquisa = () =>{
        if (Pesquisa.trim() === '') {
            setMatriculadoFiltrado(TodosMatriculados);
            SelectSwitchJogo(SelectJogo)
        } else {
            const resultados = fuse.search(Pesquisa).map((result) => result.item);
            setMatriculadoFiltrado(resultados);
        }
    }


    useEffect(() => {
        FiltrarBarraPesquisa()
    }, [Pesquisa, TodosMatriculados]);

    // Função para carregar os jogos no select
    // const CarregarJogosSelect = (TodosJogos) => {
    //     return TodosJogos.map(jogos => (
    //         <option key={jogos.ID_jogos} value={jogos.jo_tema}>
    //             {jogos.jo_nome}
    //         </option>
    //     ));
    // };
    // {CarregarJogosSelect(TodosJogos)}

    if (!TodosMatriculados || !TodosJogos) {
        return <LoadDev />;
    }
    return (
        <>
            <div className='col-12 d-flex justify-content-end'>
                <div className='align-items-center text-center d-flex flex-row gap-3 position-absolute' style={{ top: '200px', zIndex:20 }}>
                    <form className="d-flex" role="search">
                        <select
                            value={SelectJogo}
                            onChange={(e) => setSelectJogo(e.target.value)}
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="">Todos:</option>
                            <option value="1">Verão</option>
                            <option value="2">Outono</option>
                            <option value="3">Inverno</option>
                            <option value="4">Primavera</option>
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

            {MatriculadoFiltrado && MatriculadoFiltrado.length > 0 ? (
                <>
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
                                    setSelectJogo={setSelectJogo}
                                />
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p className='text-center mt-4'>Não há resultados para busca...</p>
            )}
            <div className='text-center d-flex flex-fill justify-content-center align-items-end' style={{ fontSize: '40px' }}>
                <BiAddToQueue onClick={() => ModalCriarMatricula(NaoMatriculados, BuscarNaoMatriculados, navigate, token, TodosJogos, TodasTurmas, BuscarTodosMatriculados)} />
            </div>
        </>
    );
}


export default TableMatriculadosComponent;

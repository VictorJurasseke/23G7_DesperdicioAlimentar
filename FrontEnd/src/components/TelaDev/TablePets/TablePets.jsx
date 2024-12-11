import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { Button } from 'react-bootstrap';
import { BiAddToQueue } from "react-icons/bi";
import { ModalCriarPet, ModalDeleteTodosPets, useImportarDadosPets } from './FunctionPets';
import PetsTR from './PetsTR';
import Fuse from 'fuse.js';

const TablePets = ({ token, navigate }) => {

    const { TodosPets, BuscarTodosPets } = useImportarDadosPets(token, navigate)

    // Guarda o filtro selecionado
    const [SelectRaridade, setSelectRaridade] = useState('');
    // Guarda a barra de pesquisa
    const [Pesquisa, setPesquisa] = useState('');
    // Guarda os Pets filtrados
    const [PetsFiltrado, setPetsFiltrado] = useState(TodosPets);

    useEffect(() => {
        BuscarTodosPets()
        console.log(TodosPets)
    }, [])

    const selectRaridadeSwitch = (SelectRaridade) => {
        switch (SelectRaridade) {
            case '1':
                setPetsFiltrado(TodosPets.filter((pets) => pets.raridade_pet === "Comum"));
                break;
            case '2':
                setPetsFiltrado(TodosPets.filter((pets) => pets.raridade_pet === "Raro"));
                break;
            case '3':
                setPetsFiltrado(TodosPets.filter((pets) => pets.raridade_pet === "Épico"));
                break;
            case '4':
                setPetsFiltrado(TodosPets.filter((pets) => pets.raridade_pet === "Lendário"));
                break;
            default:
                setPetsFiltrado(TodosPets);
        }
    }

    useEffect(() => {
        selectRaridadeSwitch(SelectRaridade)
        setPesquisa('')
    }, [SelectRaridade, TodosPets]);

    // Configurações do Fuse.js
    const fuseOptions = {
        keys: ['nome_pet'], // Campos que serão pesquisados
        threshold: 0.4, // Sensibilidade da pesquisa
    };

    const fuse = new Fuse(PetsFiltrado, fuseOptions);

    useEffect(() => {
        if (Pesquisa.trim() === '') {
            setPetsFiltrado(TodosPets);
            selectRaridadeSwitch(SelectRaridade)
        } else {
            const resultados = fuse.search(Pesquisa).map((result) => result.item);
            setPetsFiltrado(resultados);
        }
    }, [Pesquisa, TodosPets]);

    return (
        <div className="container-fluid">
            <div className="row justify-content-start align-items-center">
                {/* Filtro por Raridade */}
                <div className="d-flex flex-wrap justify-content-start gap-2 mb-3">
                    <form className="d-flex flex-column flex-sm-row mb-2 mb-sm-0" role="search">
                        <select
                            value={SelectRaridade}
                            onChange={(e) => setSelectRaridade(e.target.value)}
                            className="form-select w-100 w-sm-auto"
                            aria-label="Default select example"
                        >
                            <option value="">Todos:</option>
                            <option value="1">Comum</option>
                            <option value="2">Raro</option>
                            <option value="3">Épico</option>
                            <option value="4">Lendário</option>
                        </select>
                    </form>
                    <form className="d-flex col-lg-4 col-12 w-sm-auto" role="search">
                        <input
                            value={Pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                            className="form-control"
                            type="search"
                            placeholder="Buscar pet"
                            aria-label="Search"
                        />
                    </form>
                    <button
                        onClick={() => ModalDeleteTodosPets(BuscarTodosPets, token, navigate)}
                        className="btn btn-danger col-12 col-sm-auto mt-2 mt-sm-0"
                    >
                        Deletar Todos
                    </button>
                </div>
            </div>

            {/* Tabela */}
            <div className="table-responsive">
                {TodosPets.length > 0 ? (
                    <table className="table table-striped table-hover text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID Pet</th>
                                <th>Nome</th>
                                <th>Caminho</th>
                                <th>Descrição</th>
                                <th>Min.Ponto</th>
                                <th>Raridade</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {PetsFiltrado.map((item) => (
                                <PetsTR
                                    key={item.ID_pet}
                                    ID_pet={item.ID_pet}
                                    nome_pet={item.nome_pet}
                                    caminho_pet={item.caminho_pet}
                                    desc_pet={item.desc_pet}
                                    ponto_pet={item.ponto_pet}
                                    raridade_pet={item.raridade_pet}
                                    atualizar={BuscarTodosPets}
                                    navigate={navigate}
                                    token={token}
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
                    className="text-success fs-1"
                    onClick={() => ModalCriarPet(token, navigate, TodosPets, BuscarTodosPets)}
                    title="Adicionar Novo Pet"
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </div>
    );
};

export default TablePets;

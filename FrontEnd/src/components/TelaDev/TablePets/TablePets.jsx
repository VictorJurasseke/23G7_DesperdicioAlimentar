import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { Button } from 'react-bootstrap';
import { BiAddToQueue } from "react-icons/bi";
import { ModalCriarPet, useImportarDadosPets } from './FunctionPets';
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
    // Função para filtrar os mascotes
    useEffect(() => {
        selectRaridadeSwitch(SelectRaridade)
        console.log("tema:", SelectRaridade)
        console.log("todos:", TodosPets)
        setPesquisa('')
    }, [SelectRaridade, TodosPets]);


    // // Configurações do Fuse.js
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
        <>

            <div className='col-12 d-flex justify-content-end border-bottom'>
                <div className='align-items-center text-center d-flex flex-row gap-3 position-absolute' style={{ top: '27px' }}>
                    <form className="d-flex" role="search">
                        <select
                            value={SelectRaridade}
                            onChange={(e) => setSelectRaridade(e.target.value)}
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="">Todos:</option>
                            <option value="1">Comum</option>
                            <option value="2">Raro</option>
                            <option value="3">Épico</option>
                            <option value="4">Lendário</option>
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

            <table className="table table-striped  table-hover  text-center">
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

            <div className="d-flex justify-content-center mt-4">
                <div className='d-flex align-items-center'>
                    <BiAddToQueue
                        className='text-success'
                        onClick={() => { ModalCriarPet(token, navigate, TodosPets, BuscarTodosPets) }}
                        style={{ fontSize: '40px', marginRight: '15px', cursor: 'pointer' }}
                    />
                </div>
            </div>
        </>
    );
};

export default TablePets;

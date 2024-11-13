import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { Button } from 'react-bootstrap';
import { BiAddToQueue } from "react-icons/bi";
import { ModalCriarPet, useImportarDadosPets } from './FunctionPets';
import PetsTR from './PetsTR';


const TablePets = ({ token, navigate }) => {

    const { TodosPets, BuscarTodosPets } = useImportarDadosPets(token, navigate)

    useEffect(() => {
        BuscarTodosPets()
        console.log(TodosPets)
    }, [])

    return (
        <>
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
                    {TodosPets.map((item) => (
                        <PetsTR
                            key={item.ID_pet}
                            nome_pet={item.nome_pet}
                            caminho_pet={item.caminho_pet}
                            desc_pet={item.desc_pet}
                            ponto_pet={item.ponto_pet}
                            raridade_pet={item.raridade_pet}
                            atualizar={BuscarPets}
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
                        onClick={() => { ModalCriarPet(token, navigate, BuscarTodosPets) }}
                        style={{ fontSize: '40px', marginRight: '15px', cursor: 'pointer' }}
                    />
                </div>
            </div>
        </>
    );
};

export default TablePets;

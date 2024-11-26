import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card_pet from '../TelaPerfil/Card_pet';
import { usePetsDados } from './FunctionPets';
import './div_pets.css';


const NavBarPets = ({ token, navigate }) => {
    const { TodosPetsTemporada, ProcurarPets, jo_nome, QuantidadeMascote } = usePetsDados(token, navigate);

    useEffect(() => {
        ProcurarPets();
    }, []);

    return (
        <>
            <nav className="navbar bg-body-dark p-2">
                <div className="container-fluid">
                    <a className="navbar-brand text-dark fs-2 fw-bold">
                        Mascotes da {jo_nome}: {QuantidadeMascote}
                    </a>
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </nav>
            <div className="pets-container">
                {
                    TodosPetsTemporada &&
                    TodosPetsTemporada.map((item) => (
                        <Card_pet
                            key={item.ID_inv_pets} // Use um identificador único
                            raridade={item.raridade_pet}
                            nome={item.nome_pet}
                            caminho={item.caminho_pet}
                            evolucao={item.evolucao}
                            ID_inventario={item.ID_inv_pets}
                            ponto_evo={item.ponto_pet}
                            nivel_pet={item.pontuacao_pet}
                            token={token}
                            navigate={navigate}
                            ProcurarPets={ProcurarPets}
                        />
                    ))}
            </div>
        </>
    );
};

export default NavBarPets;

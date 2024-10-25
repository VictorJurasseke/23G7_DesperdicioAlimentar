import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap

const CardPerfil = () => {
    return (
        <nav className="navbar bg-body-dark p-2">
            <div className="container-fluid ">
                <a className="navbar-brand text-dark fs-2">Mascotes:</a>
                <form className="d-flex " role="search" >
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
};

export default CardPerfil;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import Egg from '../../../public/img/Egg.gif'
import NeyMar from '../../../public/img/CoelhoNeymar.gif'
import Card_pet from '../TelaPerfil/Card_pet'

const NavBarPets = () => {
    return (
        <>
            
            <nav className="navbar bg-body-dark p-2">
                <div className="container-fluid ">
                    <a className="navbar-brand text-dark fs-2 fw-bold">Mascotes da Temporada Atual:</a>
                    <form className="d-flex " role="search" >
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <div className='col-12 d-flex gap-3'>
                <Card_pet nome={"Ovo"} caminho={Egg}></Card_pet>
                <Card_pet nome={"Neylho"} caminho={NeyMar}></Card_pet>
            </div>
        </>
    );
};

export default NavBarPets;

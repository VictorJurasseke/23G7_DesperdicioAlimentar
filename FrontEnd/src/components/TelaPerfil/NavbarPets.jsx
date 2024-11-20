import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import Egg from '../../../public/img/Egg.gif'
import NeyMar from '../../../public/img/CoelhoNeymar.gif'
import Card_pet from '../TelaPerfil/Card_pet'
import { usePetsDados } from './FunctionPets';



const NavBarPets = ({token, navigate}) => {

    const {TodosPetsTemporada, ProcurarPets, jo_nome, evolucao} = usePetsDados(token, navigate) 

    console.log("Evolução",evolucao)
    console.log(TodosPetsTemporada)
    useEffect(()=>{
        ProcurarPets()
    },[])


    return (
        <>
            
            <nav className="navbar bg-body-dark p-2">
                <div className="container-fluid ">
                    <a className="navbar-brand text-dark fs-2 fw-bold">Mascotes da {jo_nome}</a>
                    <form className="d-flex " role="search" >
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <div className='col-12 d-flex gap-3'>
                {TodosPetsTemporada && TodosPetsTemporada.map((item)=>{
                    return(
                        <Card_pet
                         key={item}
                         raridade={item.raridade_pet}
                         nome={item.nome_pet} 
                         caminho={item.caminho_pet}
                         evolucao={evolucao}
                         ID_inventario={item.ID_inv_pets}
                         ponto_evo={item.ponto_pet}
                         nivel_pet={item.pontuacao_pet}
                         token={token}
                         navigate={navigate}
                         ProcurarPets={ProcurarPets}
                         />
                         
                    )
                })}
            </div>
        </>
    );
};

export default NavBarPets;

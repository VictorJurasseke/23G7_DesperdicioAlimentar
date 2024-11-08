import React, { useEffect } from 'react';
import { formatarData } from '../TelaDev/TableJogo/FunctionJogos';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarPets from './NavbarPets'


const Menu_Jogador = ({Dados_usuario, token, navigate}) => {


   


    
    return (
        <>
            
                <div className="text-center p-3 position-relative" style={{ zIndex: 2 }}>
                    <h1>Tela Inventario do jogo atual</h1>
                    <NavBarPets/>
                    
                    
                </div>
        </>


    );
};

export default Menu_Jogador;

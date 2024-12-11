

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";

import TablePets from './TablePets';

const TelaPets = ({token,navigate}) => {
    

    // table da tabela jogo e o botoa de rota de adicionar
    
    
    return (
        <>
            
            <div className='d-flex flex-fill flex-column'>
        
                <TablePets token={token} navigate={navigate}/>
          
        </div>
         

        </>
    );
};

export default TelaPets;

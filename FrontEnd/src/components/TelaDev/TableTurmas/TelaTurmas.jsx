

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import TableTurmas from './TableTurmas';




const TelaTurmas = ({token,navigate}) => {
    
    // table da tabela jogo e o botoa de rota de adicionar
    
    
    return (
        <>
        
        <div className='d-flex flex-fill flex-column'>
            <div className=''>
                <TableTurmas token={token} navigate={navigate}/>
            </div>
        </div>

        </>
    );
};

export default TelaTurmas;

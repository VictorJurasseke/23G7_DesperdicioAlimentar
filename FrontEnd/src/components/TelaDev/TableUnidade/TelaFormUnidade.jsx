

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import TableJogos from './TableJogos';



const TelaFormUnidade = ({ token, navigate}) => {
    
 
    
  
    return (
        <>
            <form id="form-jogo">
                
                <div class="mb-3 text-start">
                    <label for="jo_nome" class="form-label">Nome da sua Unidade</label>
                    <input type="text" id="u_nome" className="form-control" placeholder="Ex: Digite sua unidade"/>
                </div>
               
            </form>
        </>
    );
};

export default TelaFormUnidade;

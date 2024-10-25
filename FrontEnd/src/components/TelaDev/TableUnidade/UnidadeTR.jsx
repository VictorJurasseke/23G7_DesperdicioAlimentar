import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import { ModalDeleteUnidade, ModalEditUnidade } from './FunctionUnidade';

const UnidadeTR = ({id, nome, BuscarUnidades, token, navigate}) => {

   
    // Rota de apagar e editar ligada a esta tela e aos icones resignados utilizando o id


    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{nome}</td>
                <td className='d-flex justify-content-evenly fs-5'>
                    <a onClick={()=>{ModalEditUnidade(id, BuscarUnidades, token, navigate)}}><HiPencil /></a>
                    <a onClick={()=>{ModalDeleteUnidade(id, BuscarUnidades, token, navigate)}}><HiOutlineTrash /></a>
                </td>
            </tr>
        </>
    );
};

export default UnidadeTR;


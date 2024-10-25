import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";


// Funções de Apagar e Editar
import {ModalEditUsuario, ModalDeleteUsuario} from './FunctionUsuario'

const UsuarioTR = ({
    ID_usuarios,
    tur_nome,
    es_nome,
    user_nome,
    user_email,
    user_tipo_acesso,
    user_periodo,
    token,
    navigate,
  
    atualizar
}) => {
    return (


        <>
            <tr>
                <td>{ID_usuarios}</td>
                <td>{es_nome}</td>
                <td>{tur_nome}</td>
                <td>{user_nome}</td>
                <td>{user_email}</td>
         
                <td>{user_tipo_acesso}</td>
                <td>{user_periodo}</td>
                
                <td className='fs-5'>
                    <div className='col-12 d-flex justify-content-evenly'>
                    <a onClick={()=>{ModalEditUsuario(ID_usuarios, atualizar, token, navigate)}}><HiPencil /></a>
                    <a onClick={()=>{ModalDeleteUsuario(ID_usuarios, atualizar, token, navigate)}}><HiOutlineTrash /></a>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default UsuarioTR;

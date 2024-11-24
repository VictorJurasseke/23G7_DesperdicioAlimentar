import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import { ModalEditMatriculados, ModalDeleteMatriculados } from './FunctionMatriculados';


const MatriculadosTR = ({ID_jogos,ID_usuarios, jo_nome, user_nome, pontos_usuario, rank_usuario, es_nome, BuscarTodosMatriculados, token, navigate, BuscarNaoMatriculados,setMatriculadoFiltrado  }) => {
    // Rota de apagar e editar ligada a esta tela e aos icones resignados utilizando o id
    console.log("ID_jogos:",ID_jogos)
    console.log("ID_usuarios:",ID_usuarios)
    return (
        <>
            <tr>
                <td>{jo_nome}</td>
                <td>{user_nome}</td>
                <td>{pontos_usuario}</td>
                <td>{rank_usuario}</td>
                <td>{es_nome}</td>
               
                <td className='fs-5'>
                    <div className='col-12 d-flex justify-content-evenly'>
                    <a onClick={() => { ModalEditMatriculados(ID_usuarios,BuscarTodosMatriculados,navigate,token,setMatriculadoFiltrado) }}><HiPencil /></a>
                    <a onClick={() => { ModalDeleteMatriculados(ID_usuarios,BuscarTodosMatriculados, BuscarNaoMatriculados, navigate,token,setMatriculadoFiltrado) }}><HiOutlineTrash /></a>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default MatriculadosTR;

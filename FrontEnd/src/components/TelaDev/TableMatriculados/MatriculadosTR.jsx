import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import { ModalEditMatriculados, ModalDeleteMatriculados } from './FunctionMatriculados';
const MatriculadosTR = ({ idusermat, idjogos, idusuarios, pontos_usuario, rank_usuario, es_nome, atualizar, token, navigate }) => {
    // Rota de apagar e editar ligada a esta tela e aos icones resignados utilizando o id

    return (
        <>
            <tr>
                <td>{idusermat}</td>
                <td>{idjogos}</td>
                <td>{idusuarios}</td>
                <td>{pontos_usuario}</td>
                <td>{rank_usuario}</td>
                <td>{es_nome}</td>
                <td className='fs-5'>
                    <div className='col-12 d-flex justify-content-evenly'>
                    <a onClick={() => { ModalEditMatriculados(idusermat, atualizar,navigate,token) }}><HiPencil /></a>
                    <a onClick={() => { ModalDeleteMatriculados(idusermat, atualizar, navigate,token) }}><HiOutlineTrash /></a>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default MatriculadosTR;

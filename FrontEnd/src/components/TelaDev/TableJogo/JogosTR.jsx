import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash, HiMenuAlt1 } from "react-icons/hi";
import { ModalDeleteJogos, ModalEditarJogo, formatarData, ModalConfigJogos,MudarStatus } from './FunctionJogos';



const TableJogosTR = ({ id, nome, dataInicio, dataFim, escola, atualizar, token, navigate, status }) => {


    // Rota de apagar e editar ligada a esta tela e aos icones resignados utilizando o id

    


return (
    <>
        <tr >
            <td>{id}</td>
            <td>{nome}</td>
            <td>{formatarData(dataInicio)}</td>
            <td>{formatarData(dataFim)}</td>
            <td>{escola}</td>
            <td className='d-flex justify-content-evenly fs-5'>
                <a onClick={() => { ModalEditarJogo(id, atualizar, navigate, token) }}><HiPencil /></a>
                <a onClick={() => { ModalDeleteJogos(id, atualizar, navigate, token) }}><HiOutlineTrash /></a>
                <a onClick={() => { ModalConfigJogos(id, atualizar, navigate, token) }}><HiMenuAlt1 /></a>
            </td>
            <td className={status} onClick={()=>{MudarStatus(id, atualizar, navigate, token, status)}}></td>    

        </tr>
    </>
);
};

export default TableJogosTR;

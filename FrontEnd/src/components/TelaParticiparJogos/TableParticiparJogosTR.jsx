import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import { LuGamepad2 } from "react-icons/lu";
import {ModalParticiparJogos, formatarData } from './FunctionParticiparJogo';
import { GrGamepad } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

const TableParticiparJogosTR = ({ID_jogos, jo_nome, dataInicio, dataFim, es_nome, navigate, token}) => {

    // Rota de apagar e editar ligada a esta tela e aos icones resignados utilizando o id
    return (
        <>
            <tr>
                <td>{ID_jogos}</td>
                <td>{jo_nome}</td>
                <td>{es_nome}</td>
                <td>{formatarData(dataInicio)}</td>
                <td>{formatarData(dataFim)}</td>
                <td className='d-flex justify-content-evenly fs-5 text-center '>
                    <a className='text-success fs-3 d-flex' onClick={()=>{ModalParticiparJogos(ID_jogos,jo_nome,es_nome,token, navigate)}}><GrGamepad /></a>
                </td>
            </tr>
        </>
    );
};

export default TableParticiparJogosTR;

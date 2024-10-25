import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import { LuGamepad2 } from "react-icons/lu";
import { FaPaperPlane } from "react-icons/fa";

const TableRankTR = ({ usernome, user_periodo, pontos_usuario, rank_usuario,turma, token,  }) => {
 
    // Rota de apagar e editar ligada a esta tela e aos icones resignados utilizando o id
    return (
        <>
            <tr>
                <td>{usernome}</td>
                <td>{turma}</td>
                <td>{user_periodo}</td>
                <td>{pontos_usuario}</td>
                <td>{rank_usuario}</td>
            </tr>
        </>
    );
};

export default TableRankTR;

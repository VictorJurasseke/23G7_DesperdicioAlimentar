
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";

import TableParticiparJogosTR from './TableParticiparJogosTR';
import { LuGamepad2 } from "react-icons/lu";
import LoadDev from '../TelaDev/LoadingDev';


const TableParticipar = ({info, navigate, token}) => {    

console.log(info)
    return (
        <>
            {info.length === 0 && <LoadDev/>}
            {info.length > 0 &&
                <table className="table table-striped  table-hover text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome do Jogo</th>
                            <th>Escola Resignada</th>
                            <th>Data Inicio</th>
                            <th>Data Fim</th>
                            <th>Solicitar Entrada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info.map((item) => (
                            <TableParticiparJogosTR
                                key={item.ID_jogos}
                                ID_jogos={item.ID_jogos}
                                jo_nome={item.jo_nome}
                                es_nome={item.es_nome}
                                dataInicio={item.jo_datai}
                                dataFim={item.jo_dataf}
                                navigate={navigate}
                                token={token}
                                />
                        ))}
                    </tbody>
                </table>}
        </>
    );
};

export default TableParticipar;
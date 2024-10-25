import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import RankTR from './TableRankTR';
import { useImportarDadosRank } from './FunctionRank';


// Atualizando o array com os novos campos

const TableRank = ({info, atualizar, token, navigate}) => {

    

    return (
        <>
        {info.length === 0 && <p className='mt-5 vw-100 text-center'>Não há registros</p>}
            {info.length > 0 &&
            <table className="table table-striped  table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Nome</th>
                        <th>Turmas</th>
                        <th>Período</th>
                        <th>Pontos</th>
                        <th>Rank</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map((item) => (
                        <RankTR
                            key={item}
                            usernome={item.user_nome}
                            user_periodo={item.user_periodo}
                            turma={item.tur_nome}
                            pontos_usuario={item.pontos_usuario}
                            rank_usuario={item.rank_usuario}
                            atualizar={atualizar}
                            token={token}
                            navigate={navigate}

                        />
                    ))}
                </tbody>
            </table>}
        </>
    );
};

export default TableRank;

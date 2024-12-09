import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import RankTR from "./TableRankTR";

const TableRank = ({ info, atualizar, token, navigate }) => {
    // Preenche o array `info` com valores padrão até o tamanho 10
    const filledInfo = [...info];
    while (filledInfo.length < 10) {
        filledInfo.push({
            user_nome: "-",
            tur_nome: "-",
            user_periodo: "-",
            pontos_usuario: "-",
            rank_usuario: filledInfo.length + 1,
            ID_usuarios: `placeholder-${filledInfo.length + 1}`,
        });
    }

    return (
        <div className="table-container col-4">
            <h2 className="table-title">RANKING DE PRIMAVERA!</h2>
            {filledInfo.length === 0 && <p className="mt-5 vw-100">Não há registros</p>}
            {filledInfo.length > 0 && (
                <table className="custom-table">
                    
                    <thead>
                        <tr className="">
                            <th className="competitors-header">Competidores</th>
                            <th className="points-header">Pontos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filledInfo.map((item) => (
                            <RankTR
                                key={item.ID_usuarios}
                                usernome={item.user_nome}
                                turma={item.tur_nome}
                                user_periodo={item.user_periodo}
                                pontos_usuario={item.pontos_usuario}
                                rank_usuario={item.rank_usuario}
                                atualizar={atualizar}
                                token={token}
                                navigate={navigate}
                            />
                        ))}
                    </tbody>
                </table>
            )}
            <div className="flower-icon ">🌸</div>
        </div>
    );
};

export default TableRank;

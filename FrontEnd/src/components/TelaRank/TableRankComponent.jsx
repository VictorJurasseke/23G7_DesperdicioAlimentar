import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RankTR from "./TableRankTR";

import CardRankTR from "./CardRankTR";


const TableRankComponente = ({ info, atualizar, token, navigate }) => {

    const uniqueInfo = [...new Map(info.map(item => [item.ID_usuarios, item])).values()];

    return (
        <div className="col-12 rounded" style={{ backgroundColor: "#243447" }} >
            <div className="text-light">
                <h1 className="col-12 text-center" >Rank: {info[0].jo_nome}</h1>
            </div>
            <div className="d-flex flex-column rounded-bottom " style={{ backgroundColor: "#F3E8D1" }}>

                {uniqueInfo.map((item) => (

                    <CardRankTR
                        key={item.ID_usuarios}
                        user_nome={item.user_nome}
                        user_img_caminho={item.user_img_caminho}
                        ID_usuarios={item.ID_usuarios}
                        pontos_usuario={item.pontos_usuario}
                        peso_acumulativo={item.peso_acumulativo}
                        rank_usuario={item.rank_usuario}
                        jo_nome={item.jo_nome}
                        jo_tema={item.jo_tema}
                        tur_nome={item.tur_nome}
                        nome_pet={item.nome_pet}
                        caminho_pet={item.caminho_pet}
                        raridade_pet={item.raridade_pet}
                        ID_inv_pets={item.ID_inv_pets}
                        evolucao={item.evolucao}
                        token={token}
                        ID_jogos={item.ID_jogos}
                        navigate={navigate}

                    />
                ))}

            </div>
        </div>
    );
};

export default TableRankComponente;

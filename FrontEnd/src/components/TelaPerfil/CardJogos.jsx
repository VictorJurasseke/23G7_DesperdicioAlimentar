import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap

import { ModalParticiparJogos } from './FunctionParticiparJogo';

const CardJogos = ({ jo_nome, jo_datai, jo_dataf, ID_jogos, ID_usuarios, es_nome, token, navigate, jo_status }) => {

  console.log("Id do jogo", ID_jogos)
  console.log("Id do usuario", ID_usuarios)
  console.log("Status:",jo_status)

  return (
    <div className="card" style={{ width: "18rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div className="card-body">
        <h5 className="card-title">{jo_nome}</h5>
        <p className="card-text">
          Data Inicio: {jo_datai} <br />
          Data Final: {jo_dataf}
        </p>
      </div>
      <div className="card-footer p-0">
        <a
          onClick={() => { ModalParticiparJogos(ID_jogos, jo_nome, es_nome, token, navigate) }}
          href="#"
          className={`btn btn-success w-100`}  // Adiciona a classe w-100 para ocupar toda a largura
          style={{
            pointerEvents: 'auto',
            borderTopLeftRadius: 0, // Remove o arredondamento do canto inferior esquerdo
            borderTopRightRadius: 0
          }}
        >
          Participar
        </a>
      </div>
    </div>
  );
};

export default CardJogos;

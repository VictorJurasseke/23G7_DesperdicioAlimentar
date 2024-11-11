import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap

import { ModalParticiparJogos } from './FunctionParticiparJogo';
import { StatusJogo } from '../NivelAcesso';
import './CardJogos.css'

const CardJogos = ({ jo_nome, jo_datai, jo_dataf, ID_jogos, ID_usuarios, es_nome, token, navigate, jo_status }) => {


  // <div className="card" style={{ width: "18rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
  //   <div className="card-body">
  //     <h5 className="card-title">{jo_nome}</h5>
  //     <p className="card-text">
  //       Data Inicio: {jo_datai} <br />
  //       Data Final: {jo_dataf} <br />
  //       Escola: {es_nome}
  //     </p>
  //   </div>
  //   <div className="card-footer p-0">
  //     <a
  //       onClick={() => { ModalParticiparJogos(ID_jogos, jo_nome, es_nome, token, navigate) }}
  //       href="#"
  //       className={`btn btn-success ${StatusJogo(jo_status)} w-100`}  // Adiciona a classe w-100 para ocupar toda a largura
  //       style={{
  //         pointerEvents: 'auto',
  //         borderTopLeftRadius: 0, // Remove o arredondamento do canto inferior esquerdo
  //         borderTopRightRadius: 0
  //       }}
  //     >
  //       Participar
  //     </a>
  //   </div>
  // </div>


  return (
    <>
      <div className="summer-card p-4 rounded-3 ">
        <div className='text-start flex-column col-5 d-flex'>
          <h2 className="title ">TEMPORADA DE VERÃO</h2>
          <p className="lyrics">
            'Cause the players gonna play, play, play, play, play<br />
            And the haters gonna hate, hate, hate, hate, hate<br />
            Baby, I'm just gonna shake, shake, shake, shake, shake
          </p>
        <p className="dates text-light  fw-bold fs-6">Data Início: 01/01/2024<br />Data Fim: 20/03/2024</p>
        </div>
        <button className="participate-btn">
          <span role="img" aria-label="sun">☀️</span> Participar
        </button>
      </div>
    </>
  );
};

export default CardJogos;

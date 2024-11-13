import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { useImportarDadosTurmas } from '../TelaDev/TableTurmas/FunctionTurmas';

import { ModalParticiparJogos } from './FunctionParticiparJogo';
import { StatusJogo } from '../NivelAcesso';

import CardVerao from './CardVerao';
import CardOutono from './CardOutono';
import CardInverno from './CardInverno';
import CardPrimavera from './CardPrimavera';


const CardJogos = ({ jo_nome, jo_datai, jo_dataf, ID_jogos, ID_usuarios, es_nome, token, navigate, jo_status, jo_tema }) => {

  const { TodasTurmas, BuscarTurmas } = useImportarDadosTurmas(token, navigate)

  useEffect(()=>{
    BuscarTurmas()
  }, [])

  console.log(jo_tema)

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
      {jo_tema === 1 && (
        <CardVerao TodasTurmas={TodasTurmas} jo_nome={jo_nome} jo_datai={jo_datai} jo_dataf={jo_dataf} ID_jogos={ID_jogos} ID_usuarios={ID_usuarios} es_nome={es_nome} token={token} navigate={navigate} Participar={ModalParticiparJogos} />
      )}

      {jo_tema === 2 && (
        <CardOutono TodasTurmas={TodasTurmas} jo_nome={jo_nome} jo_datai={jo_datai} jo_dataf={jo_dataf} ID_jogos={ID_jogos} ID_usuarios={ID_usuarios} es_nome={es_nome} token={token} navigate={navigate} Participar={ModalParticiparJogos} />
      )}
      {jo_tema === 3 && (
        <CardInverno TodasTurmas={TodasTurmas} jo_nome={jo_nome} jo_datai={jo_datai} jo_dataf={jo_dataf} ID_jogos={ID_jogos} ID_usuarios={ID_usuarios} es_nome={es_nome} token={token} navigate={navigate} Participar={ModalParticiparJogos} />
      )}
      {jo_tema === 4 && (
        <CardPrimavera TodasTurmas={TodasTurmas} jo_nome={jo_nome} jo_datai={jo_datai} jo_dataf={jo_dataf} ID_jogos={ID_jogos} ID_usuarios={ID_usuarios} es_nome={es_nome} token={token} navigate={navigate} Participar={ModalParticiparJogos} />
      )}
    </>
  );
};

export default CardJogos;

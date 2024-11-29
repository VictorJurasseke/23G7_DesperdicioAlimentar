import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { FaBookOpen } from 'react-icons/fa'; // Importando ícone
import { RiCopperCoinFill } from 'react-icons/ri'; // Importando ícone
import { motion } from 'framer-motion';

const HeaderCardJogador = ({ jo_nome, QuantidadeMascote }) => {
  return (
    // Header do   card
    <div className="d-flex jaroFont text-light fs-4  col-12 align-items-center justify-content-between gap-3 rounded-top shadow" style={{ height: '45px', backgroundColor: "#243447" }}>

      {/* Inventário */}
      <div className="d-flex col-lg-3 col-md-6 align-items-center justify-content-evenly rounded h-100">
        <FaBookOpen />
        <p className="m-0 text-end jaroFont" style={{whiteSpace:"nowrap"}}>{jo_nome}</p>
      </div>

      {/* Pontos - Se for necessário futuramente, descomente a seção abaixo */}
      {/* 
      <div className="d-flex col-3 align-items-center justify-content-center rounded h-100">
        <div className="col-8 rounded text-center text-light h-100 d-flex align-items-center justify-content-center">
          <p className="m-0">Pontos</p>
        </div>
        <div className="rounded text-center text-light p-1 d-flex align-items-center justify-content-center">
          <p className="m-0"><RiCopperCoinFill /> 300</p>
        </div>
      </div>
      */}

      {/* Coletados */}
      <div className="d-flex col-3 col-md-6 col-lg-3 align-items-center justify-content-center gap-2 rounded h-100">
        <div style={{ backgroundColor: "#D84B4B" }} className="col-8 rounded text-center text-light h-100 d-flex align-items-center justify-content-center">
          <p className="m-0 jaroFont">Coletados</p>
        </div>
        <div className="col-3 rounded text-center text-light p-1 d-flex align-items-center justify-content-center">
          <p className="m-0 jaroFont">{QuantidadeMascote}</p>
        </div>
      </div>

    </div>
  );
};

export default HeaderCardJogador;

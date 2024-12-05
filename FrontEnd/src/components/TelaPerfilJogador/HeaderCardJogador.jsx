import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import { FaBookOpen } from 'react-icons/fa'; // Importando ícone
import { RiCopperCoinFill } from 'react-icons/ri'; // Importando ícone
import { motion } from 'framer-motion';

const HeaderCardJogador = ({ jo_nome, QuantidadeMascote }) => {
  return (
    // Header do card
    <div className="d-flex jaroFont flex-wrap text-light fs-4 col-12 align-items-center justify-content-between rounded-top shadow" style={{ minHeight: '45px', backgroundColor: "#243447" }}>
      
      {/* Inventário */}
      <div className="d-flex p-2 col-sm-12 col-lg-4 gap-2   align-items-center justify-content-center rounded h-100">
        <FaBookOpen size={20} />
        <p className="m-0 text-end jaroFont" style={{ whiteSpace: "nowrap" }}>{jo_nome}</p>
      </div>


      {/* Coletados */}
      <div className="d-flex col-sm-6 col-lg-4 align-items-center justify-content-end gap-2 rounded h-100">
        <div style={{ backgroundColor: "#D84B4B" }} className="col-4 rounded text-center text-light h-100 d-flex align-items-center justify-content-center">
          <p className="m-0 jaroFont">Coletados</p>
        </div>
        <div className="col-4 rounded text-center text-light p-1 d-flex align-items-center justify-content-center">
          <p className="m-0 jaroFont">{QuantidadeMascote}</p>
        </div>
      </div>
      {/* Data Final */}
      <div className="d-flex col-sm-6 col-lg-4 align-items-center justify-content-start rounded h-100">
        <div style={{ backgroundColor: "#D84B4B" }} className="col-4 rounded text-center text-light h-100 d-flex align-items-center justify-content-center">
          <p className="m-0 jaroFont">Data Final</p>
        </div>
        <div className="col-4 rounded text-center text-light p-2 d-flex align-items-center justify-content-center">
          <p className="m-0 jaroFont">20/08/24</p>
        </div>
      </div>

    </div>
  );
};

export default HeaderCardJogador;
